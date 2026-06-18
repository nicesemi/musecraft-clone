export interface Artifact {
  id: number;
  name: string;
  dynasty: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface MarketSignal {
  id: number;
  title: string;
  source: string;
  url: string;
  tags: string[];
  summary: string;
  createdAt: string;
}

export interface Opportunity {
  id: number;
  artifactName: string;
  artifactId: number;
  score: number;
  signals: string[];
  category: string;
  targetAudience: string;
  scenario: string;
  channel: string;
  priceRange: string;
  culturalTranslation: string;
  differentiation: string;
  culturalValue: string;
  status: "ready" | "pending";
}

export interface ProposalSection {
  title: string;
  content: string;
  subSections?: { title: string; content: string }[];
}

export interface Proposal {
  id: number;
  title: string;
  type: "system" | "custom" | "other";
  status: "draft" | "completed" | "in_progress";
  coverImage: string;
  version: string;
  updatedAt: string;
  createdAt: string;
  sections: ProposalSection[];
  experts: ExpertStatus[];
  score: number;
}

export interface ExpertStatus {
  name: string;
  role: string;
  status: "standby" | "working";
}

export interface DashboardData {
  top3: Proposal[];
  systemMetrics: {
    top3Count: number;
    collaborating: number;
    connected: number;
    observing: number;
  };
}

export interface TrendItem {
  id: number;
  title: string;
  summary: string;
  score: number;
  proposalId: number;
}

export interface RefineForm {
  requirement: string;
  artifactSearch: string;
  targetAudience: string;
  category: string;
  priceRange: string;
  style: string;
  copyFocus: string;
}
