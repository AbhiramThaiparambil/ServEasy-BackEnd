export interface IMessage {
  messageType: string;
  content: string;
  sender: 'user' | 'serviceProvider';
}

export interface IChat {
  _id?: string;
  participants: [user1: string, user2: string];
  messages: IMessage[];
  lastMessageAt: Date;
  presence:
    | []
    | [
        {
          userId: string;
          online: boolean;
          lastSeen: Date | null;
        },
      ];
  createdAt: Date;
  updatedAt: Date;
}

export interface IServiceProviderChat {
  _id: string;
  lastMessageAt: Date;
  createdAt: Date;
  updatedAt: Date;
  lastMessage: IMessage;
  userName: string;
  userAvatar: string;
  userId: string;
  presence: Array<{
    userId: string;
    online: boolean;
    lastSeen: Date | null;
  }>;
}

export interface IUserChat {
  _id: string;
  lastMessageAt: Date;
  createdAt: Date;
  updatedAt: Date;
  lastMessage: IMessage;
  userName: string;
  userID: string;
  userAvatar: string;
  presence: Array<{
    userId: string;
    online: boolean;
    lastSeen: Date | null;
  }>;
}
