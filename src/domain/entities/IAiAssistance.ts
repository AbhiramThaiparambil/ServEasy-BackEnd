export interface IAiAssistanceMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}



export interface IAiAssistanceChatSession {
  _id?: string;
    id?: string;

  serviceProviderId: string;
  userId: string;
  title: string;
  messages: IAiAssistanceMessage[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IAiAssistanceChatInfo = Pick<IAiAssistanceChatSession,"id"|"title">
