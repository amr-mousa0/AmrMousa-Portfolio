/**
 * Schema.org JSON-LD Factory (Spec 023)
 * Provides type-safe, validated generators for rich Google Search Snippets
 */

export interface PersonSchemaProps {
  name?: string;
  alternateName?: string;
  jobTitle?: string[];
  url?: string;
  image?: string;
  addressLocality?: string;
  addressCountry?: string;
  knowsAbout?: string[];
  sameAs?: string[];
  description?: string;
}

export interface WebSiteSchemaProps {
  name?: string;
  url?: string;
  description?: string;
}

export interface ProjectSchemaProps {
  name: string;
  description: string;
  url?: string;
  image?: string;
  tags?: string[];
  authorName?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildPersonSchema(props: PersonSchemaProps = {}) {
  const {
    name = "Amr Mousa",
    alternateName = "عمرو موسى",
    jobTitle = ["Data Analyst", "Marketing Strategist", "Business Intelligence Specialist"],
    url = "https://amrmousa.com",
    image = "https://amrmousa.com/images/Amr-Mousa.JPG",
    addressLocality = "Cairo",
    addressCountry = "EG",
    knowsAbout = [
      "Data Analytics", "Power BI", "SQL", "Marketing Strategy", 
      "Media Buying", "Meta Ads", "Data Cleaning", "Business Intelligence"
    ],
    sameAs = [
      "https://github.com/amr-mousa0",
      "https://www.linkedin.com/in/amr-mousa0"
    ],
    description = "Expert Data Analyst and Marketing Strategist based in Cairo, Egypt. Specializing in Power BI dashboards, SQL data modeling, and high-ROI marketing campaign optimization."
  } = props;

  return {
    "@type": "Person",
    "@id": `${url}/#person`,
    name,
    alternateName,
    jobTitle,
    url,
    image,
    sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality,
      addressCountry
    },
    knowsAbout,
    description
  };
}

export function buildWebSiteSchema(props: WebSiteSchemaProps = {}) {
  const {
    name = "Amr Mousa — Portfolio",
    url = "https://amrmousa.com",
    description = "Official Portfolio of Amr Mousa — Data Analyst & Marketing Strategist."
  } = props;

  return {
    "@type": "WebSite",
    "@id": `${url}/#website`,
    url,
    name,
    description,
    publisher: {
      "@id": `${url}/#person`
    }
  };
}

export function buildProjectSchema(props: ProjectSchemaProps) {
  const {
    name,
    description,
    url = "https://amrmousa.com/projects",
    image,
    tags = [],
    authorName = "Amr Mousa"
  } = props;

  return {
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    image,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: authorName
    },
    keywords: tags.join(", ")
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function buildGraphSchema(props: {
  personProps?: PersonSchemaProps;
  siteProps?: WebSiteSchemaProps;
  projectProps?: ProjectSchemaProps;
  breadcrumbs?: BreadcrumbItem[];
} = {}) {
  const graph: any[] = [
    buildPersonSchema(props.personProps),
    buildWebSiteSchema(props.siteProps)
  ];

  if (props.projectProps) {
    graph.push(buildProjectSchema(props.projectProps));
  }

  if (props.breadcrumbs && props.breadcrumbs.length > 0) {
    graph.push(buildBreadcrumbSchema(props.breadcrumbs));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}
