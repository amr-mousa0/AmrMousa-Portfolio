/**
 * Intelligent Project Model Builder & Pipeline Orchestrator
 * ADR-023-007 Authoritative Protocol
 */
import type { RepositoryManifest, PortfolioProject, RepoTreeEntry } from './types';
import { resolveCover, resolveTypedGallery, resolveDemoUrl } from './fallback-engine';
import { translateWithCache } from './translation-engine';
import { fetchRepoTree, fetchReadmeContent } from './repo-tree-fetcher';

export async function buildProjectModel(
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
    owner?: {
      login: string;
      avatar_url: string;
    };
  },
  manifest: RepositoryManifest | null
): Promise<PortfolioProject> {
  const branch = repo.default_branch || 'main';
  const repoName = repo.name;
  const ownerLogin = repo.owner ? repo.owner.login : 'amr-mousa0';

  // 1. Fetch Repository Tree and README if fallbacks might be required
  let tree: RepoTreeEntry[] = [];
  let readmeContent: string | null = null;

  const needsCoverFallback = !manifest?.project?.cover;
  const needsGalleryFallback = !manifest?.project?.gallery;

  if (needsCoverFallback || needsGalleryFallback) {
    tree = await fetchRepoTree(repo.full_name, branch);
    readmeContent = await fetchReadmeContent(repo.full_name, branch);
  }

  // 2. Extract Base Text Fields (Manifest Authority Enforcement)
  let titleEn = repo.name;
  let descEn = repo.description || 'Enterprise project data analytics and engineering solution.';
  let problemEn = `The organization required automated tracking and structured analytics visibility for ${repo.name}. Raw operational data needed processing and transformation.`;
  let solutionEn = descEn;
  let metricsEn = `Engineered data modeling and optimized decision-making workflows.`;
  let featured = false;
  let priority = 99;
  let tags = repo.topics && repo.topics.length > 0 ? repo.topics : [repo.language || 'Data/Tech'];
  let capabilities = { demo: !!repo.homepage, caseStudy: true, cover: true };

  if (manifest && manifest.project) {
    const prj = manifest.project;
    if (prj.title) titleEn = prj.title;
    if (prj.description) descEn = prj.description;
    if (prj.problem) problemEn = prj.problem;
    if (prj.solution || prj.salesDescription) solutionEn = prj.solution || prj.salesDescription!;
    if (prj.businessValue || prj.salesFunnelMetrics) metricsEn = prj.businessValue || prj.salesFunnelMetrics!;
    if (prj.tags) tags = prj.tags;
    if (prj.capabilities) capabilities = { ...capabilities, ...prj.capabilities };
  }

  if (manifest && manifest.publish && manifest.publish.portfolio) {
    const p = manifest.publish.portfolio;
    if (p.customTitle) titleEn = p.customTitle;
    if (p.featured !== undefined) featured = p.featured;
    if (p.priority !== undefined) priority = p.priority;
  }

  // 3. Fallback Engine Executions
  const coverResult = await resolveCover(
    manifest || {},
    repo.full_name,
    branch,
    tree,
    readmeContent,
    repo.owner?.avatar_url
  );
  const coverUrl = coverResult.value;

  const typedGalleryItems = await resolveTypedGallery(
    manifest || {},
    repo.full_name,
    branch,
    tree,
    coverUrl
  );

  const demoUrl = await resolveDemoUrl(
    manifest || {},
    repo.homepage,
    readmeContent,
    ownerLogin,
    repoName
  );

  // 4. Dynamic Centralized Build-Time & Webhook Translation
  const titleAr = await translateWithCache(titleEn, 'ar');
  const descAr = await translateWithCache(descEn, 'ar');
  const problemAr = await translateWithCache(problemEn, 'ar');
  const solutionAr = await translateWithCache(solutionEn, 'ar');
  const metricsAr = await translateWithCache(metricsEn, 'ar');

  const galleryImageUrls = typedGalleryItems.filter(i => i.type === 'image').map(i => i.url);

  const isPowerBiDemo = demoUrl && (demoUrl.includes('powerbi.com') || demoUrl.includes('app.powerbi') || typedGalleryItems.some(i => i.type === 'powerbi'));
  const docItem = typedGalleryItems.find(i => i.type === 'pdf');
  const videoItem = typedGalleryItems.find(i => i.type === 'video');

  const projectModel: PortfolioProject = {
    id: repoName,
    title: titleEn,
    titleEn: titleEn,
    titleAr: titleAr,
    subtitle: repo.language || 'Data Analytics & Engineering',
    category: repo.language || 'Showcase',
    description: descEn,
    descriptionEn: descEn,
    descriptionAr: descAr,
    problem: problemEn,
    problemEn: problemEn,
    problemAr: problemAr,
    salesDescription: solutionEn,
    salesDescriptionEn: solutionEn,
    salesDescriptionAr: solutionAr,
    salesFunnelMetrics: metricsEn,
    salesFunnelMetricsEn: metricsEn,
    salesFunnelMetricsAr: metricsAr,
    image: coverUrl,
    imagePath: coverUrl,
    images: galleryImageUrls,
    galleryItems: typedGalleryItems,
    demoUrl: demoUrl,
    powerBiUrl: isPowerBiDemo ? demoUrl : undefined,
    caseStudyUrl: `/projects/${repoName}`,
    githubUrl: repo.html_url,
    documentationUrl: docItem ? docItem.url : undefined,
    videoUrl: videoItem ? videoItem.url : undefined,
    featured: featured,
    priority: priority,
    tags: tags,
    tech: tags,
    capabilities: capabilities,
    archived: repo.archived === true,
    updatedAt: new Date().toISOString()
  };

  return projectModel;
}
