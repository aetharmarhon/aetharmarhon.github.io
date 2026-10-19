export const dashboardSections = [
  { id: "overview", label: "Overview" },
  { id: "the-challenge", label: "The Challenge" },
  { id: "understanding-our-users", label: "Understanding Our Users" },
  { id: "early-explorations", label: "Early Explorations" },
  { id: "iterating", label: "Iterations and Iterations..." },
  { id: "the-details", label: "The Details" },
  { id: "final-experience", label: "The Final Experience" },
  { id: "reflections", label: "Reflections" },
];

const imageRoot = "/images/case-studies/personalized-dashboards";
export const dashboardImages = {
  overview: { src: `${imageRoot}/overview.webp`, control: { right: 3.6, bottom: 4.8, size: 4.5 }, width: 1772, height: 1278, alt: "Personalized dashboard alongside a pinned insight and an expanded registration trend chart." },
  research: { src: `${imageRoot}/research-synthesis.webp`, control: { right: 3.8, bottom: 7.1, size: 4.8 }, width: 1623, height: 869, alt: "Interview findings grouped into use cases, suggestions, pain points, and priorities on an affinity map." },
  brainstorming: { src: `${imageRoot}/brainstorming.webp`, control: { right: 6.5, bottom: 10, size: 9 }, width: 524, height: 314, alt: "Three early dashboard concepts generated with Figma Make." },
  lowFidelity: { src: `${imageRoot}/low-fidelity.webp`, control: { right: 6.5, bottom: 10, size: 9 }, width: 524, height: 314, alt: "Low-fidelity dashboard wireframes exploring different widget sizes and layouts." },
  refinement: { src: `${imageRoot}/refinement.webp`, control: { right: 6.5, bottom: 10, size: 9 }, width: 524, height: 314, alt: "Refined screens showing a pin confirmation, a dashboard, and an expanded chart." },
  highFidelityV1: { src: `${imageRoot}/high-fidelity-v1.webp`, control: { right: 6.1, bottom: 8.9, size: 9 }, width: 766, height: 539, alt: "First high-fidelity dashboard with metric cards, a table, and a registration chart." },
  highFidelityV2: { src: `${imageRoot}/high-fidelity-v2.webp`, control: { right: 6.1, bottom: 8.9, size: 9 }, width: 766, height: 539, alt: "Second high-fidelity dashboard with refined widget layouts, refresh controls, and chart styling." },
  pinning: { src: `${imageRoot}/pinning-flow.webp`, control: { right: 4, bottom: 6.1, size: 5.2 }, width: 1552, height: 1024, alt: "Meredith Data interface with a natural-language query ready to submit and navigation for saved insights." },
  final: { src: `${imageRoot}/final-experience.webp`, control: { right: 3.6, bottom: 5.4, size: 5 }, width: 1623, height: 1073, alt: "Final Meredith Data experience bringing natural-language queries, saved insights, and dashboards together." },
};

export const dashboardDetails = [
  {
    title: "Saving insights for later",
    paragraphs: [
      "Instead of having to repeat a query to find the same information, users can pin useful results directly to their dashboard.",
      "We designed the flow for saving an insight, including the actions and confirmation states needed to communicate that the information had been added.",
    ],
  },
  {
    title: "Making it their own",
    paragraphs: [
      "Not everyone needs to track the same information, so we explored how users could arrange their dashboards around their own priorities.",
      "We designed different widget sizes and editing interactions, allowing users to rearrange and organize their information within the dashboard layout.",
    ],
  },
  {
    title: "Looking beyond the numbers",
    paragraphs: [
      "Sometimes a chart alone isn’t enough to understand what’s happening.",
      "We designed expanded views that give users access to additional information, including AI-generated explanations, calculations, and underlying queries.",
      "This allows users to explore their results in more detail while keeping their main dashboard focused on the bigger picture.",
    ],
  },
  {
    title: "Making every interaction clear",
    paragraphs: [
      "We also worked through the states that users might encounter while interacting with their dashboard.",
      "From empty and loading screens to refresh indicators, confirmation messages, and editing feedback, these details help communicate what’s happening and what users can do next.",
    ],
  },
];
