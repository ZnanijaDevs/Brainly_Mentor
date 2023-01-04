export interface Mentor {
  _id: string;
  isAdmin: boolean;
  id: number;
  nick: string;
  avatar: string;
  senior: boolean;
}

export interface Candidate {
  id: number;
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