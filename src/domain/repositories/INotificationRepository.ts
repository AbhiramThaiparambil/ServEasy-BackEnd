import { INotification } from "../entities/INotification";

export interface INotificationRepository {
  findNotificationsByUserId(
    userId: string
  ): Promise<INotification[] | null>;
  markNotificationAsRead(id: string): Promise<void>;
  createNotification(notification: {
    content: string;
    userId: string;
  }): Promise<void>;

  deleteUserAllNotification(id: string): Promise<void>;
  findNotificationsUnreaded(userId: string): Promise<number | null>;
  delteSingleNotification(id: string): Promise<void>;
}
