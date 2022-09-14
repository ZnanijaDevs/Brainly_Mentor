type AuthorDataInGetQuestionResponse = {
  avatar?: string;
  nick: string;
  id: number;
  ranks: string[];
};

export type QuestionDataInGetQuestionResponse = {
  attachments: string[];
  author: AuthorDataInGetQuestionResponse;
  content: string;
  created: string;
  hasAttachments: boolean;
  id: number;
  isDeleted: boolean;
  isReported: boolean;
  link: string;
  points: number;
  subjectId: number;
};

export type ResponseDataInGetQuestionResponse = {
  attachments: string[];
  author: AuthorDataInGetQuestionResponse;
  content: string;
  created: string;
  hasAttachments: boolean;
  id: number;
  isReported: boolean;
  isDeleted: boolean;
  isBest: boolean;
  isApproved: boolean;
};

export type GetQuestionResponseDataType = {
  isLegacy: boolean;
  responsesCount: number;
  responses: ResponseDataInGetQuestionResponse[];
  question: QuestionDataInGetQuestionResponse;
};

export interface QuestionLogEntryDataType {
  extraData?: {
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
}

export type QuestionLogEntriesByDateDataType = Record<string, QuestionLogEntryDataType[]>;