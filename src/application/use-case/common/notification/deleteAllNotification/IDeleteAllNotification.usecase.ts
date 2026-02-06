import { DeleteAllNotificationsRequestDTO } from "../../../../../application/dtos/common/notification/deleteAllNotification/DeleteAllNotificationDTO";

export interface IDeleteAllNotificationUseCase {
  execute(data: DeleteAllNotificationsRequestDTO): Promise<void>;
}
