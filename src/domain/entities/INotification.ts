export interface INotification {
  id?: string;

  content: string;
  notificationTime: Date;
  userId: string;
  isRead: boolean;
}

export interface IVideoCallNotification {
  type: "video_call";
  callerId: string;
  callerName: string;
  callerProfile: string;
  targetRole: "SERVICE_PROVIDER" | "USER";
  callRoomId: string;
  content: string;
  user: boolean;
  receiverId: string;
}

export interface ISystemNotification {
  type: "notification";
    targetRole: "SERVICE_PROVIDER" | "USER";

  content: string;
  timestamp: string;
}

export interface IChatNotification {
  type: "chat";
  senderId: string;
  senderName: string;
  targetRole?: "SERVICE_PROVIDER" | "USER";

  senderProfile: string;
  content: string;
  isRead?: boolean;
}
