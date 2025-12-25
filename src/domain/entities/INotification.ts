import { Types } from "mongoose";

export interface INotification {
  id?: Types.ObjectId;

  content: string;
  notificationTime: Date;
  userId: Types.ObjectId;
  read: boolean;
}

export interface IVideoCallNotification {
  type: "video_call";
  callerId: string;
  callerName: string;
  callerProfile: string;
  callRoomId: string;
  content: string;
  user: boolean;
  receiverId: string;
}

export interface ISystemNotification {
  type: "notification";
  content: string;
  timestamp: string;
}

export interface IChatNotification {
  type: "chat";
  senderId: string;
  senderName: string;
  senderProfile: string;
  content: string;
  read?: Boolean;
}
