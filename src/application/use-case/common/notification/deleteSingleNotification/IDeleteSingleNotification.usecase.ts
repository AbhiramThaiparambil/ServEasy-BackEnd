import { DeleteSingleNotificationRequestDTO } from "../../../../../application/dtos/common/notification/deleteSingleNotification/DeleteSingleNotificationDTO";

export interface IDeleteSingleNotificationUseCase {
  execute(data: DeleteSingleNotificationRequestDTO): Promise<void>;
}
