type UserInCommonResponse = {
  id: number;
  nick: string;
  gender: 1 | 2;
  is_deleted: boolean;
  stats: {
    questions: number;
    answers: number;
    comments: number;
  };
  avatars: {
    [x in keyof {64, 100}]?: string;
  };
  ranks: {
    color: string;
    names: string[];
    count: number;
  };
  ranks_ids: number[];
}

export type CommonResponse<T = unknown> = {
  success: true;
  users_data?: UserInCommonResponse[];
  data: T;
  impl?: string;
  protocol?: "28";
  schema?: string;
};

export type GetConversationResponse = CommonResponse<{
  conversation_id: number;
}>

export type GetMessagesResponse = CommonResponse<{
  last_id: number;
  conversation: {
    id: number;
    user_id: number;
    created: string;
    recipient_id: number;
    allow_link_from: unknown[];
  };
  messages: {
    id: number;
    conversation_id: number;
    user_id: number;
    created: string;
    content: string;
    is_harmful: boolean;
    new: boolean;
  }[];
}>;