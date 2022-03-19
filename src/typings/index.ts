import type { IconPropsType, IconType } from "brainly-style-guide";

export type BasicSuccessResponse = {
  success: true;
}

export type Market = "us";

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
  };
  date: string;
  reason: {
    id: number;
    fullText: string;
    shortReason: string;
  };
  reviewStatus: "APPROVED" | "DISAPPROVED" | "NONE";
  contentType: "answer" | "question" | "comment" | "attachment" | "unknown";
  type: "DELETED" | "ACCEPTED" | "REPORTED_FOR_CORRECTION";
  icon: IconType;
  iconColor: IconPropsType["color"];
  localizedType: string;
  hash: string;
}

type MenteeCharts = {
  count: number;
  dataset: number[];
}

export interface Mentee {
  id: number;
  market: Market;
  mentorId: number;
  nick: string;
  note: string;
  avatar: string;
  rank: string;
  charts: {
    [T in keyof {"daily", "weekly", "monthly"}]: MenteeCharts;
  };
}

export interface Mentor {
  id: number;
  nick: string;
  senior: boolean;
  market: Market;
}