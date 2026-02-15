import { Schema, model } from "mongoose";
import { IAiAssistanceMessage, IAiAssistanceChatSession } from "../../domain/entities/IAiAssistance";


export const AiAssistanceMessageSchema = new Schema<IAiAssistanceMessage>(
  {
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const AiAssistanceSessionSchema = new Schema(
  {
    serviceProviderId: { type: Schema.Types.ObjectId, ref: "ServiceProvider", required: true },
    title: { type: String, default:"new Chat" },
    messages: [AiAssistanceMessageSchema],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const AiAssistanceChatSessionModel = model<IAiAssistanceChatSession>(
  "AiAssistanceChatSession",
  AiAssistanceSessionSchema
);
