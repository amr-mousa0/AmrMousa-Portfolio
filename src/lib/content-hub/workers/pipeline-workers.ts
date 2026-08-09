/**
 * Specialized Pipeline Workers (GitHubWorker, TranslationWorker, AssetWorker, PublishWorker)
 * ADR-023-008 Authoritative Protocol
 */
import type { RepositoryManifest, PortfolioProject, ProjectAssetItem } from '../types';
import { getRegistry } from '../provider-registry';
import { resolveCover, resolveTypedGallery, resolveDemoUrl } from '../../sync/fallback-engine';
import { TranslationMemoryEngine } from '../translation/translation-memory';
import { AuditLogger } from '../audit/audit-logger';
import { RepositoriesStore } from '../database/repositories-store';
import { upsertProjectInStore } from '../../sync/project-store';

export class GitHubWorker {
  static async process(
    repo: {
      name: string;
      full_name: string;
      default_branch?: string;
      html_url: string;
      description?: string;
      homepage?: string;
      language?: string;
      topics?: string[];
      archived?: boolean;
      owner?: { login: string; avatar_url: string };
    },
    traceId: string
  ): Promise<{ projectModel: Partial<PortfolioProject>; manifest: RepositoryManifest | null }> {
    AuditLogger.log(repo.name, traceId, 'github_worker', 'started');

    const registry = getRegistry();
    const branch = repo.default_branch || 'main';

    // 1. Record/Update Repository domain entry
    await RepositoriesStore.upsert({
      repoId: repo.name,
      fullName: repo.full_name,
      owner: repo.owner?.login,
      defaultBranch: branch,
      status: repo.archived ? 'archived' : 'active'
    });

    // 2. Fetch Manifest via ContentSourceAdapter
    const { manifest, raw } = await registry.adapter.fetchManifest(repo.full_name, branch);
    
    if (!manifest) {
      AuditLogger.log(repo.name, traceId, 'github_worker', 'failed', 'Repository lacks manifest.json. Processing aborted.');
      throw new Error(`Repository ${repo.name} skipped because it lacks a manifest.json file.`);
    }

    AuditLogger.log(repo.name, traceId, 'manifest_fetched', 'completed', 'Manifest loaded via adapter');

    // 3. Single O(1) Tree API Fetch
    let tree: any[] = [];
    let readmeContent: string | null = null;

    if (!manifest?.project?.cover || !manifest?.project?.gallery) {
      tree = await registry.adapter.fetchTree(repo.full_name, branch);
      readmeContent = await registry.adapter.fetchFileContent(repo.full_name, branch, 'README.md');
    }

    // 4. Stable ProjectId & Base Text Extractions
    const stableProjectId = manifest?.project?.projectId || repo.name;

    let titleEn = repo.name;
    let descEn = repo.description || 'Enterprise project data analytics and engineering solution.';
    let problemEn = `The organization required automated tracking and structured analytics visibility for ${repo.name}. Raw operational data needed processing and transformation.`;
    let solutionEn = descEn;
    let metricsEn = `Engineered data modeling and optimized decision-making workflows.`;
    let featured = false;
    let priority = 99;
    let tags = repo.topics && repo.topics.length > 0 ? repo.topics : [repo.language || 'Data/Tech'];
    let capabilities = { demo: !!repo.homepage, caseStudy: true, cover: true };

    if (manifest?.project) {
      const prj = manifest.project;
      if (prj.title) titleEn = prj.title;
      if (prj.description) descEn = prj.description;
      if (prj.problem) problemEn = prj.problem;
      if (prj.solution || prj.salesDescription) solutionEn = prj.solution || prj.salesDescription!;
      if (prj.businessValue || prj.salesFunnelMetrics) metricsEn = prj.businessValue || prj.salesFunnelMetrics!;
      if (prj.tags) tags = prj.tags;
      if (prj.capabilities) capabilities = { ...capabilities, ...prj.capabilities };
    }

    if (manifest?.publish?.portfolio) {
      const p = manifest.publish.portfolio;
      if (p.customTitle) titleEn = p.customTitle;
      if (p.featured !== undefined) featured = p.featured;
      if (p.priority !== undefined) priority = p.priority;
    }

    // 5. Fallback Engine Discovery
    const coverResult = await resolveCover(manifest || {}, repo.full_name, branch, tree, readmeContent, repo.owner?.avatar_url);
    AuditLogger.log(repo.name, traceId, 'fallback_cover', 'completed', `Cover resolved via ${coverResult.source}`);

    const typedGalleryItems = await resolveTypedGallery(manifest || {}, repo.full_name, branch, tree, coverResult.value);
    AuditLogger.log(repo.name, traceId, 'fallback_gallery', 'completed', `Resolved ${typedGalleryItems.length} typed assets`);

    const demoUrl = await resolveDemoUrl(manifest || {}, repo.homepage, readmeContent, repo.owner?.login, repo.name);

    AuditLogger.log(repo.name, traceId, 'github_worker', 'completed');

    return {
      projectModel: {
        id: stableProjectId,
        repoId: repo.name,
        titleEn,
        descriptionEn: descEn,
        problemEn,
        salesDescriptionEn: solutionEn,
        salesFunnelMetricsEn: metricsEn,
        image: coverResult.value,
        galleryItems: typedGalleryItems,
        demoUrl,
        featured,
        priority,
        tags,
        capabilities,
        githubUrl: repo.html_url
      },
      manifest
    };
  }
}

export class TranslationWorker {
  static async process(
    model: Partial<PortfolioProject>,
    traceId: string
  ): Promise<Partial<PortfolioProject>> {
    AuditLogger.log(model.repoId!, traceId, 'translation_worker', 'started');
    const registry = getRegistry();

    const titleAr = await TranslationMemoryEngine.translateWithMemory(model.titleEn || model.id!, registry.translation, 'auto', 'ar');
    const descAr = await TranslationMemoryEngine.translateWithMemory(model.descriptionEn || '', registry.translation, 'auto', 'ar');
    const problemAr = await TranslationMemoryEngine.translateWithMemory(model.problemEn || '', registry.translation, 'auto', 'ar');
    const solutionAr = await TranslationMemoryEngine.translateWithMemory(model.salesDescriptionEn || '', registry.translation, 'auto', 'ar');
    const metricsAr = await TranslationMemoryEngine.translateWithMemory(model.salesFunnelMetricsEn || '', registry.translation, 'auto', 'ar');

    AuditLogger.log(model.repoId!, traceId, 'translation_worker', 'completed', 'Localizable fields translated via Translation Memory');

    return {
      ...model,
      title: model.titleEn,
      titleAr,
      description: model.descriptionEn,
      descriptionAr: descAr,
      problem: model.problemEn,
      problemAr,
      salesDescription: model.salesDescriptionEn,
      salesDescriptionAr: solutionAr,
      salesFunnelMetrics: model.salesFunnelMetricsEn,
      salesFunnelMetricsAr: metricsAr
    };
  }
}

export class AssetWorker {
  static async process(
    model: Partial<PortfolioProject>,
    traceId: string
  ): Promise<Partial<PortfolioProject>> {
    AuditLogger.log(model.repoId!, traceId, 'asset_worker', 'started');
    const registry = getRegistry();

    // If cover is placeholder or needs generation
    let finalCover = model.image || '/images/default-project.webp';
    if (!model.image || model.image === '/images/default-project.webp') {
      const generated = await registry.asset.generatePlaceholderCover(model.titleEn || model.id!, model.tags || []);
      finalCover = generated.url;
    }

    const processedGalleryItems: ProjectAssetItem[] = [];
    if (model.galleryItems) {
      for (const item of model.galleryItems) {
        processedGalleryItems.push({
          ...item,
          metadata: {
            mimeType: item.type === 'pdf' ? 'application/pdf' : 'image/webp',
            optimized: true
          }
        });
      }
    }

    AuditLogger.log(model.repoId!, traceId, 'asset_worker', 'completed', 'Assets processed and metadata extracted');

    return {
      ...model,
      image: finalCover,
      imagePath: finalCover,
      galleryItems: processedGalleryItems
    };
  }
}

export class PublishWorker {
  static async process(
    model: Partial<PortfolioProject>,
    manifest: RepositoryManifest | null,
    traceId: string
  ): Promise<PortfolioProject> {
    AuditLogger.log(model.repoId!, traceId, 'publish_worker', 'started');

    const galleryImageUrls = (model.galleryItems || []).filter(i => i.type === 'image').map(i => i.url);
    const isPowerBiDemo = model.demoUrl && (model.demoUrl.includes('powerbi.com') || model.demoUrl.includes('app.powerbi'));
    const docItem = (model.galleryItems || []).find(i => i.type === 'pdf');
    const videoItem = (model.galleryItems || []).find(i => i.type === 'video');

    const fullProject: PortfolioProject = {
      id: model.id || model.repoId!,
      repoId: model.repoId!,
      title: model.titleEn || model.repoId!,
      titleEn: model.titleEn || model.repoId!,
      titleAr: model.titleAr || model.titleEn,
      subtitle: model.tags?.[0] || 'Data Analytics & Engineering',
      category: model.tags?.[0] || 'Showcase',
      description: model.descriptionEn || '',
      descriptionEn: model.descriptionEn || '',
      descriptionAr: model.descriptionAr || model.descriptionEn,
      problem: model.problemEn || '',
      problemEn: model.problemEn || '',
      problemAr: model.problemAr || model.problemEn,
      salesDescription: model.salesDescriptionEn || '',
      salesDescriptionEn: model.salesDescriptionEn || '',
      salesDescriptionAr: model.salesDescriptionAr || model.salesDescriptionEn,
      salesFunnelMetrics: model.salesFunnelMetricsEn || '',
      salesFunnelMetricsEn: model.salesFunnelMetricsEn || '',
      salesFunnelMetricsAr: model.salesFunnelMetricsAr || model.salesFunnelMetricsEn,
      image: model.image || '/images/default-project.webp',
      imagePath: model.image || '/images/default-project.webp',
      images: galleryImageUrls,
      galleryItems: model.galleryItems || [],
      demoUrl: model.demoUrl,
      powerBiUrl: isPowerBiDemo ? model.demoUrl : undefined,
      caseStudyUrl: `/projects/${model.id || model.repoId}`,
      githubUrl: model.githubUrl || `https://github.com/amr-mousa0/${model.repoId}`,
      documentationUrl: docItem ? docItem.url : undefined,
      videoUrl: videoItem ? videoItem.url : undefined,
      featured: model.featured || false,
      priority: model.priority || 99,
      tags: model.tags || ['Data/Tech'],
      tech: model.tags || ['Data/Tech'],
      capabilities: model.capabilities || { demo: !!model.demoUrl, caseStudy: true, cover: true },
      hasManifest: true,
      updatedAt: new Date().toISOString()
    };

    // Store in destination
    await upsertProjectInStore(fullProject, 'portfolio');

    AuditLogger.log(model.repoId!, traceId, 'publish_worker', 'completed', 'Published project model to destination portfolio');
    AuditLogger.log(model.repoId!, traceId, 'pipeline_completed', 'completed', 'Full Content Hub processing journey completed successfully');

    return fullProject;
  }
}
