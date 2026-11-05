/**
 * Service content.
 *
 * `licensedActivity` is the registered business activity (verified).
 * `capabilities` are PROPOSED service offerings within that activity — they are
 * labelled as such in the UI until Onimitation Tech confirms its final service menu.
 */
export type ServiceKey = "it-consulting" | "network-services" | "ai-innovation";

export type Service = {
  key: ServiceKey;
  index: string;
  title: string;
  shortTitle: string;
  licensedActivity: string;
  tagline: string;
  summary: string;
  intro: string[];
  highlights: string[];
  capabilities: { title: string; description: string }[];
  applications: string[];
  benefits: { title: string; description: string }[];
};

export const services: Service[] = [
  {
    key: "it-consulting",
    index: "01",
    title: "IT Consulting",
    shortTitle: "IT Consulting",
    licensedActivity: "Information Technology Consultants",
    tagline: "Clarity for every technology decision.",
    summary:
      "Independent technology guidance that aligns your infrastructure, architecture, and digital roadmap with where your business is going.",
    intro: [
      "Technology decisions compound. The platforms you choose, the architecture you commit to, and the order in which you modernise all shape what your organisation can do for years to come.",
      "Our IT consulting practice helps leadership teams make those decisions with confidence — translating business objectives into practical technology strategy, and turning strategy into an actionable plan.",
    ],
    highlights: [
      "Technology strategy",
      "IT infrastructure consulting",
      "Digital transformation guidance",
      "Technology architecture",
    ],
    capabilities: [
      {
        title: "Technology strategy",
        description:
          "Assessing your current technology landscape and defining a roadmap that supports your commercial priorities.",
      },
      {
        title: "IT infrastructure consulting",
        description:
          "Evaluating compute, storage, cloud, and on-premise environments to recommend resilient, cost-aware infrastructure.",
      },
      {
        title: "Digital transformation guidance",
        description:
          "Structuring transformation programmes into clear phases, priorities, and measurable milestones.",
      },
      {
        title: "Technology architecture",
        description:
          "Designing scalable system and integration architectures that reduce complexity and support future growth.",
      },
    ],
    applications: [
      "Planning a cloud or hybrid-infrastructure migration",
      "Preparing a multi-year digital transformation roadmap",
      "Reviewing architecture before a major platform investment",
      "Consolidating fragmented systems after rapid growth",
      "Establishing technology foundations for a new venture",
    ],
    benefits: [
      {
        title: "Confident decisions",
        description: "Recommendations grounded in a structured assessment of your environment and objectives.",
      },
      {
        title: "Reduced complexity",
        description: "Architectures and roadmaps that simplify rather than add layers of technology.",
      },
      {
        title: "Aligned investment",
        description: "Technology spend directed at the capabilities that matter most to the business.",
      },
    ],
  },
  {
    key: "network-services",
    index: "02",
    title: "IT Network Services",
    shortTitle: "Network Services",
    licensedActivity: "Information Technology Network Services",
    tagline: "The connective tissue of modern business.",
    summary:
      "Network infrastructure solutions and architecture consulting designed for reliable, secure, and high-performing connectivity.",
    intro: [
      "Every digital service depends on the network beneath it. When connectivity is well designed, it is invisible; when it is not, it becomes the constraint on everything else.",
      "Our network services focus on planning, designing, and optimising network infrastructure so that your organisation can connect people, locations, and systems with confidence.",
    ],
    highlights: [
      "Network infrastructure solutions",
      "Network architecture consulting",
      "Connectivity and infrastructure planning",
      "Network optimization",
    ],
    capabilities: [
      {
        title: "Network infrastructure solutions",
        description:
          "Defining the infrastructure — switching, routing, wireless, and security layers — needed to support your operations.",
      },
      {
        title: "Network architecture consulting",
        description:
          "Designing segmented, resilient network topologies that balance performance, security, and manageability.",
      },
      {
        title: "Connectivity & infrastructure planning",
        description:
          "Planning connectivity for new offices, sites, and facilities, including capacity and redundancy requirements.",
      },
      {
        title: "Network optimization",
        description:
          "Reviewing existing networks to identify bottlenecks, single points of failure, and opportunities to improve performance.",
      },
    ],
    applications: [
      "Fitting out connectivity for a new office or facility",
      "Connecting multiple sites into a unified network",
      "Improving performance of an existing network",
      "Re-architecting a network for stronger segmentation",
      "Planning capacity ahead of business growth",
    ],
    benefits: [
      {
        title: "Reliable connectivity",
        description: "Network designs that prioritise resilience and remove avoidable points of failure.",
      },
      {
        title: "Security by design",
        description: "Segmentation and access considerations built into the architecture from the start.",
      },
      {
        title: "Room to grow",
        description: "Capacity planning that anticipates new users, sites, and services.",
      },
    ],
  },
  {
    key: "ai-innovation",
    index: "03",
    title: "AI & Innovation Consultancy",
    shortTitle: "AI & Innovation",
    licensedActivity: "Innovation & Artificial Intelligence Research & Consultancies",
    tagline: "Turning intelligence into advantage.",
    summary:
      "Artificial intelligence research and consultancy that helps organisations explore, evaluate, and responsibly adopt intelligent technologies.",
    intro: [
      "Artificial intelligence is reshaping how organisations operate, compete, and create value — but the distance between possibility and practical impact is often wide.",
      "Our AI and innovation consultancy combines research with business pragmatism: identifying where intelligent technologies can genuinely help, evaluating approaches, and shaping an innovation strategy that fits your context.",
    ],
    highlights: [
      "Artificial intelligence research",
      "AI consultancy",
      "Intelligent automation concepts",
      "Innovation strategy",
    ],
    capabilities: [
      {
        title: "Artificial intelligence research",
        description:
          "Investigating AI techniques, models, and emerging research relevant to your industry and objectives.",
      },
      {
        title: "AI consultancy",
        description:
          "Identifying high-value AI use cases, assessing feasibility, and advising on responsible adoption.",
      },
      {
        title: "Intelligent automation concepts",
        description:
          "Exploring how AI-assisted workflows could streamline repetitive processes and support better decisions.",
      },
      {
        title: "Innovation strategy",
        description:
          "Building structured approaches to exploring, testing, and scaling new technology ideas.",
      },
    ],
    applications: [
      "Identifying where AI could create value in your operations",
      "Evaluating AI approaches before committing to a build",
      "Exploring automation opportunities in existing workflows",
      "Designing an innovation programme or technology lab",
      "Understanding the implications of emerging AI research",
    ],
    benefits: [
      {
        title: "Focused adoption",
        description: "AI initiatives prioritised by feasibility and business value, not hype.",
      },
      {
        title: "Research-informed",
        description: "Recommendations shaped by a clear understanding of current AI capabilities and limits.",
      },
      {
        title: "Responsible by default",
        description: "Attention to data, transparency, and governance considerations from the outset.",
      },
    ],
  },
];

export function getService(key: ServiceKey) {
  const service = services.find((s) => s.key === key);
  if (!service) throw new Error(`Unknown service: ${key}`);
  return service;
}
