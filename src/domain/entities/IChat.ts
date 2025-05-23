import { Types } from "mongoose";
export interface IMessage {
  messageType: string;
  content: string;
  sender: "user" | "serviceProvider";
}

export interface IChat extends Document {
    _id?:string|Types.ObjectId
  participants: [
    user1: Types.ObjectId | string,
    user2: Types.ObjectId | string,
  ];
  messages: IMessage[];
  lastMessageAt: Date;
  presence: []|[ { 
    userId: Types.ObjectId;
    online: boolean;
    lastSeen: Date | null;
  }];
  createdAt: Date;
  updatedAt: Date;
}

export interface IServiceProviderChat {
  _id: Types.ObjectId;
  lastMessageAt: Date;
  createdAt: Date;
  updatedAt: Date;
  lastMessage: IMessage;
  userName: string;
  userAvatar: string;
  userId: Types.ObjectId | string;
  presence: Array<{
    userId: Types.ObjectId;
    online: boolean;
    lastSeen: Date | null;
  }>;
}


export interface IUserChat {
  _id: Types.ObjectId;
  lastMessageAt: Date;
  createdAt: Date;
  updatedAt: Date;
  lastMessage: IMessage;
  userName: string;
  userID: Types.ObjectId;
  userAvatar: string;
  presence: Array<{
    userId: Types.ObjectId;
    online: boolean;
    lastSeen: Date | null;
  }>;
}