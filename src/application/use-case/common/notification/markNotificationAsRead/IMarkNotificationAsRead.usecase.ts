import { MarkNotificationAsReadRequestDTO } from "../../../../../application/dtos/common/notification/markNotificationAsRead/MarkNotificationAsReadDTO";

export interface IMarkNotificationAsReadUseCase {
  execute(data: MarkNotificationAsReadRequestDTO): Promise<void>;
}
