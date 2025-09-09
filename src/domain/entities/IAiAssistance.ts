import { Types } from "mongoose";

export interface IAiAssistanceMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}



export interface IAiAssistanceChatSession {
  id?: string;
  serviceProviderId: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  messages: IAiAssistanceMessage[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
