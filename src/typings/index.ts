import type { IconPropsType, IconType } from "brainly-style-guide";

export type BasicSuccessResponse = {
  success: true;
}

export type DashboardScreens = "MyMentees" | "Mentors" | "Mentees";

export type Market = "us";

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

type MenteeCharts = {
  count: number;
  dataset: number[];
}

export type Warn = {
  time: string;
  reason: string;
  content: string;
  taskId: number;
  warner: string;
  active: boolean;
}

export interface MenteeCommonData {
  id: number;
  nick: string;
  avatar: string;
}

export interface Mentee extends MenteeCommonData {
  market: Market;
  mentorId: number;
  note: string;
  rank: string;
  charts: {
    [T in keyof {"daily", "weekly", "monthly"}]: MenteeCharts;
  };
}

export interface Mentor {
  id: number;
  nick: string;
  avatar: string;
  senior: boolean;
  market: Market;
  mentees: Mentee[];
}

export interface Candidate {
  id: number;
  nick: string;
  status: string;
  is_inactive: boolean;
  updated_at: string;
}