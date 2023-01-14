export interface Mentor {
  znanijaId: number;
  createdAt: string;
  nick: string;
  avatar: string;
  senior: boolean;
}

export interface Candidate {
  znanijaId: number;
  nick: string;
  status: string;
  isInactive: boolean;
  link: string;
}

export interface RecommendedCandidate {
  znanijaId: number;
  rank: string;
  subjects: string[];
  answersCount: number;
  registeredAt: string;
  nick: string;
  avatar: string;
}