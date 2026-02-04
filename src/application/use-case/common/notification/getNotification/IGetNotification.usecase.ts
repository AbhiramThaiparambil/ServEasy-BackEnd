import { INotification } from "../../../../../domain/entities/INotification";

export interface IGetNotificationUseCase {
  execute(userId: string): Promise<{
    notifications: INotification[] | null;
    unreadCount: number | null;
  }>;
}
