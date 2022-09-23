export interface UserBasicData {
  nick: string;
  id: number;
  avatar?: string;
  ranks: string[];
  is_deleted?: boolean;
}

export type GeneralNodeInGetQuestionResponse = {
  attachments: string[];
  created: string;
  content: {
    filtered: string;
    full: string;
    short: string;
  };
  author: UserBasicData;
  has_attachments: boolean;
  id: number;
  is_reported: boolean;
  is_deleted: boolean;
};

export type AnswerInGetQuestionResponse = GeneralNodeInGetQuestionResponse & {
  is_approved: boolean;
  is_best: boolean;
};

export type QuestionInGetQuestionResponse = GeneralNodeInGetQuestionResponse & {
  link: string;
  points: number;
  subject: string;
}

export type GetQuestionResponseDataType = {
  responses: AnswerInGetQuestionResponse[];
  responses_count: number;
  task: QuestionInGetQuestionResponse;
};

export interface QuestionLogEntryDataType {
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
  owner?: UserBasicData;
  user?: UserBasicData;
}

export type QuestionLogEntriesByDateDataType = Record<string, QuestionLogEntryDataType[]>;