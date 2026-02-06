import { CreateNotificationRequestDTO } from "../../../../../application/dtos/common/notification/createNotification/CreateNotificationDTO";

export interface ICreateNotificationUseCase {
  execute(data: CreateNotificationRequestDTO): Promise<void>;
}
