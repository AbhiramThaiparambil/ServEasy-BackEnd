import { GetNotificationsRequestDTO } from "../../../../../application/dtos/common/notification/getNotification/GetNotificationDTO";
import { INotification } from "../../../../../domain/entities/INotification";

export interface IGetNotificationUseCase {
  execute(data: GetNotificationsRequestDTO): Promise<{
    notifications: INotification[] | null;
    unreadCount: number | null;
  }>;
}
