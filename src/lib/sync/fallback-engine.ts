/**
 * Intelligent Fallback Engine
 * ADR-023-007 Authoritative Protocol
 * 
 * Invariant: manifest.json ALWAYS wins. Fallbacks activate ONLY when fields are missing/undefined.
 */
import type { RepositoryManifest, RepoTreeEntry, ProjectAssetItem, FallbackResult } from './types';
import { translateWithCache } from './translation-engine';

const IMAGE_EXTENSIONS = ['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg'];
const PDF_EXTENSIONS = ['.pdf'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov'];

function rawAssetUrl(fullName: string, branch: string, relativePath: string): string {
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }
  const cleanPath = relativePath.replace(/^\.\//, '').split('/').map(segment => encodeURIComponent(segment)).join('/');
  return `https://raw.githubusercontent.com/${fullName}/${branch}/${cleanPath}`;
}

/**
 * 1. Cover Fallback Strategy
 */
export async function resolveCover(
  manifest: RepositoryManifest,
  fullName: string,
  branch: string,
  tree: RepoTreeEntry[],
  readmeContent: string | null,
  avatarUrl?: string
): Promise<FallbackResult<string>> {
  // Manifest Authority Check
  if (manifest.project?.cover) {
    return {
      value: rawAssetUrl(fullName, branch, manifest.project.cover),
      source: 'manifest',
      confidence: 'exact'
    };
  }

  // Fallback 1: First gallery image
  if (manifest.project?.gallery && Array.isArray(manifest.project.gallery)) {
    const firstImg = manifest.project.gallery.find(item => {
      if (typeof item === 'string') return IMAGE_EXTENSIONS.some(ext => item.endsWith(ext));
      if (typeof item === 'object' && item !== null) {
        return item.type === 'image' || (item.file && IMAGE_EXTENSIONS.some(ext => item.file!.endsWith(ext)));
      }
      return false;
    });

    if (firstImg) {
      const url = typeof firstImg === 'string' 
        ? rawAssetUrl(fullName, branch, firstImg) 
        : (firstImg.url ? firstImg.url : rawAssetUrl(fullName, branch, firstImg.file || ''));
      
      if (url) return { value: url, source: 'gallery', confidence: 'high' };
    }
  }

  // Fallback 2: Search tree for well-known cover filenames
  const wellKnownNames = ['cover.webp', 'cover.png', 'cover.jpg', 'showcase.webp', 'thumbnail.webp', 'preview.webp', 'preview.png'];
  const treeMatch = tree.find(entry => {
    const filename = entry.path.split('/').pop()?.toLowerCase();
    return filename && wellKnownNames.includes(filename);
  });

  if (treeMatch) {
    return {
      value: rawAssetUrl(fullName, branch, treeMatch.path),
      source: 'repo-tree',
      confidence: 'high'
    };
  }

  // Fallback 3: Search README for first image
  if (readmeContent) {
    const imgRegex = /!\[.*?\]\((.*?)\)|<img.*?src=["'](.*?)["']/i;
    const match = readmeContent.match(imgRegex);
    const imgPath = match ? (match[1] || match[2]) : null;

    if (imgPath && !imgPath.startsWith('http')) {
      return {
        value: rawAssetUrl(fullName, branch, imgPath),
        source: 'readme',
        confidence: 'medium'
      };
    } else if (imgPath && imgPath.startsWith('http')) {
      return {
        value: imgPath,
        source: 'readme',
        confidence: 'medium'
      };
    }
  }

  // Fallback 4: GitHub Owner Avatar or Default
  const fallbackUrl = avatarUrl || '/images/default-project.webp';
  return {
    value: fallbackUrl,
    source: 'generated',
    confidence: 'low'
  };
}

/**
 * 2. Gallery & Typed Asset Fallback Strategy (with additive PDF and Video discovery)
 */
export async function resolveTypedGallery(
  manifest: RepositoryManifest,
  fullName: string,
  branch: string,
  tree: RepoTreeEntry[],
  coverUrl: string
): Promise<ProjectAssetItem[]> {
  const items: ProjectAssetItem[] = [];

  // 1. Consume Manifest Gallery if declared
  if (manifest.project?.gallery && Array.isArray(manifest.project.gallery)) {
    for (const item of manifest.project.gallery) {
      if (typeof item === 'string') {
        items.push({
          type: 'image',
          title: 'Project Preview',
          titleEn: 'Project Preview',
          titleAr: 'معاينة المشروع',
          url: rawAssetUrl(fullName, branch, item)
        });
      } else if (typeof item === 'object' && item !== null) {
        const assetUrl = item.url ? item.url : (item.file ? rawAssetUrl(fullName, branch, item.file) : coverUrl);
        const titleEn = item.title || 'Project Asset';
        const titleAr = await translateWithCache(titleEn, 'ar');

        items.push({
          type: item.type || 'image',
          title: titleEn,
          titleEn: titleEn,
          titleAr: titleAr,
          url: assetUrl,
          thumbnail: item.thumbnail ? rawAssetUrl(fullName, branch, item.thumbnail) : undefined
        });
      }
    }
  } else {
    // Gallery missing -> Discover images in asset folders
    const imageFolders = ['assets/', 'images/', 'screenshots/', 'docs/images/', 'gallery/'];
    const discoveredImages = tree.filter(entry => {
      const isImg = IMAGE_EXTENSIONS.some(ext => entry.path.toLowerCase().endsWith(ext));
      const inFolder = imageFolders.some(folder => entry.path.startsWith(folder));
      return isImg && inFolder;
    });

    for (const imgEntry of discoveredImages) {
      const fileName = imgEntry.path.split('/').pop() || 'Preview';
      const cleanTitle = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      const titleAr = await translateWithCache(cleanTitle, 'ar');

      items.push({
        type: 'image',
        title: cleanTitle,
        titleEn: cleanTitle,
        titleAr: titleAr,
        url: rawAssetUrl(fullName, branch, imgEntry.path)
      });
    }
  }

  // 3. Additive PDF Discovery (If gallery has no PDFs)
  if (!items.some(i => i.type === 'pdf')) {
    const pdfFolders = ['docs/', 'documentation/', 'pdf/', 'assets/'];
    const discoveredPdfs = tree.filter(entry => {
      const isPdf = PDF_EXTENSIONS.some(ext => entry.path.toLowerCase().endsWith(ext));
      const inFolder = pdfFolders.some(folder => entry.path.startsWith(folder)) || entry.path.split('/').length === 1;
      return isPdf && inFolder;
    });

    for (const pdfEntry of discoveredPdfs) {
      const fileName = pdfEntry.path.split('/').pop() || 'Documentation';
      const cleanTitle = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      const titleAr = await translateWithCache(cleanTitle, 'ar');

      items.push({
        type: 'pdf',
        title: cleanTitle,
        titleEn: cleanTitle,
        titleAr: titleAr,
        url: rawAssetUrl(fullName, branch, pdfEntry.path)
      });
    }
  }

  // 4. Additive Video Discovery (If gallery has no Videos)
  if (!items.some(i => i.type === 'video')) {
    const videoFolders = ['assets/', 'videos/', 'demo/'];
    const discoveredVideos = tree.filter(entry => {
      const isVid = VIDEO_EXTENSIONS.some(ext => entry.path.toLowerCase().endsWith(ext));
      const inFolder = videoFolders.some(folder => entry.path.startsWith(folder)) || entry.path.split('/').length === 1;
      return isVid && inFolder;
    });

    for (const vidEntry of discoveredVideos) {
      const fileName = vidEntry.path.split('/').pop() || 'Video Walkthrough';
      const cleanTitle = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      const titleAr = await translateWithCache(cleanTitle, 'ar');

      items.push({
        type: 'video',
        title: cleanTitle,
        titleEn: cleanTitle,
        titleAr: titleAr,
        url: rawAssetUrl(fullName, branch, vidEntry.path)
      });
    }
  }

  return items;
}

/**
 * 5. Demo Discovery Strategy
 */
export async function resolveDemoUrl(
  manifest: RepositoryManifest,
  repoHomepage?: string,
  readmeContent?: string | null,
  ownerLogin?: string,
  repoName?: string
): Promise<string | undefined> {
  if (manifest.project?.demo) return manifest.project.demo;
  if (repoHomepage && repoHomepage.trim() !== '') return repoHomepage;

  // Search README for Power BI links
  if (readmeContent) {
    const pbiMatch = readmeContent.match(/https:\/\/(?:app\.)?powerbi\.com\/[^\s"')]+/i);
    if (pbiMatch) return pbiMatch[0];
  }

  // Fallback to GitHub Pages if owner and repo are known
  if (ownerLogin && repoName) {
    return `https://${ownerLogin}.github.io/${repoName}`;
  }

  return undefined;
}
