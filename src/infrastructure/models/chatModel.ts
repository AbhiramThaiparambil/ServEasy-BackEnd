import mongoose, { Schema, Types } from 'mongoose';
import { IChat } from '../../domain/entities/IChat';
interface IPresence {
    userId: Types.ObjectId;
    online: boolean;
    lastSeen: Date | null;
  }

  const PresenceSchema = new Schema<IPresence>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      online: {
        type: Boolean,
        default: false,
      },
      lastSeen: {
        type: Date,
        default: null,
      },
    },
    { _id: false }
  );



const ChatSchema = new Schema(
    {
      participants: [
        { type: Schema.Types.ObjectId, ref: 'User', }
      ],
      messages: [
        {
          messageType: { type: String,  },
          content: { type: String,  },
          sender: {
            type: String,
            enum: ["user", "serviceProvider"],
            required: true,
          },          timestamp: { type: Date, default: Date.now }
        }
      ],
      presence: {
        type: [PresenceSchema],
        default: [],
      },
      lastMessageAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
  );

export const ChatModel = mongoose.model<IChat>('Chat', ChatSchema);

//{ type: [MessageSchema], }