export interface Mentor {
  id: number;
  isAdmin: boolean;
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
  id: number;
  rank: string;
  subjects: string[];
  answersCount: number;
  registeredAt: string;
  nick: string;
  avatar: string;
}