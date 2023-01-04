import type { IconPropsType, IconType } from "brainly-style-guide";

interface BrainlyUser {
  nick: string;
  id: number;
  avatar?: string;
  ranks: string[];
  is_deleted?: boolean;
  gender?: 1 | 2;
}

type GeneralNodeInGetQuestionResponse = {
  attachments: string[];
  created: string;
  filtered_content: string;
  full_content: string;
  short_content: string;
  author: BrainlyUser;
  has_attachments: boolean;
  id: number;
  is_reported: boolean;
  is_deleted: boolean;
};

export type BrainlyAnswer = GeneralNodeInGetQuestionResponse & {
  is_approved: boolean;
  is_best: boolean;
  is_to_correct: boolean;
}

export type BrainlyQuestion = GeneralNodeInGetQuestionResponse & {
  can_answer: boolean;
  link: string;
  points: number;
  subject: string;
  subject_id: number;
  answers_count: number;
  answers: BrainlyAnswer[];
}

export interface QuestionLogEntry {
  descriptions: {
    text: string;
    title: string;
  }[];
  type: 
    | "accepted"
    | "added"
    | "best"
    | "deleted"
    | "edited"
    | "info"
    | "reported";
  time: string;
  text: string;
  warn?: boolean;
  owner?: BrainlyUser;
  user?: BrainlyUser;
}

export type QuestionLogEntriesByDate = Record<string, QuestionLogEntry[]>;

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