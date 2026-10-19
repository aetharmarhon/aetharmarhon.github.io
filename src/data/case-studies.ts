export type FeaturedProject = {
  slug: string;
  hoverLabel?: string;
  hideHoverArrow?: boolean;
  comingSoon?: boolean;
  title: string;
  summary: string;
  image: { src: string; alt: string; width: number; height: number };
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "personalized-dashboards",
    title: "Personalized Dashboards",
    summary: "Designed an AI-powered analytics experience for WSIB that turns natural-language questions into transparent data insights and customizable dashboards.",
    image: {
      src: "/images/personalized-dashboards-card.png",
      alt: "WSIB analytics dashboard showing claims, account registration data, and a trend chart.",
      width: 953,
      height: 689,
    },
  },
  {
    slug: "quest-reimagined",
    comingSoon: true,
    hoverLabel: "Coming soon!",
    hideHoverArrow: true,
    title: "Quest Reimagined",
    summary: "Redesigned Quest, the University of Waterloo student portal experience to be more intuitive and less overwhelming.",
    image: {
      src: "/images/quest-reimagined-card.png",
      alt: "Quest student portal redesign showing a home dashboard and personal documents on two laptops.",
      width: 2019,
      height: 1458,
    },
  },
];

export const caseStudies = [
  ...featuredProjects,
  // Keep the original setup route available until the real case studies are ready.
  { slug: "sample-project", title: "Sample project", summary: "A starting point for a future UX case study." },
];
