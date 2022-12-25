import type { IconPropsType, IconType } from "brainly-style-guide";

export type GetActionsDataType = {
  actions: Action[];
  hasMore: boolean;
  pageId: number;
}

export enum SuspensionType {
  ONE_DAY = "24_hours",
  THREE_DAYS = "72_hours",
  PERMANENT = "permanent"
}

export type UserDataInAction = {
  nick: string;
  id: number;
  link: string;
} & Partial<{
  isModerator: boolean;
  avatar: string;
  rank: string;
  suspensionsCount: number;
  warningsCount: number;
  activeSuspension: {
    issuer: string;
    type: SuspensionType;
  }
}>;

export interface Action {
  task: {
    id: number;
    link: string;
  };
  content: string;
  user: UserDataInAction;
  date: string;
  reason: {
    id: number;
    fullText: string;
    shortReason: string;
  };
  contentType: "answer" | "question" | "comment" | "attachment" | "unknown";
  type: "DELETED" | "ACCEPTED" | "REPORTED_FOR_CORRECTION";
  icon: IconType;
  iconColor: IconPropsType["color"];
  localizedType: string;
}

export type Warn = {
  time: string;
  reason: string;
  content: string;
  taskId: number;
  warner: string;
  active: boolean;
}

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