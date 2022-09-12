import type { IconPropsType, IconType } from "brainly-style-guide";

export type GetActionsDataType = {
  actions: Action[];
  hasMore: boolean;
  pageId: number;
}

export interface Action {
  task: {
    id: number;
    link: string;
  };
  content: string;
  user: {
    nick: string;
    id: number;
    link: string;
    isModerator?: boolean;
    avatar?: string;
    rank?: string;
  };
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