import { inject, injectable } from "tsyringe";
import { INotificationRepository } from "../../../../../domain/repositories/INotificationRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IDeleteSingleNotificationUseCase } from "./IDeleteSingleNotification.usecase";

import { DeleteSingleNotificationRequestDTO } from "../../../../../application/dtos/common/notification/deleteSingleNotification/DeleteSingleNotificationDTO";

@injectable()
export class DeleteSingleNotificationUseCase
  implements IDeleteSingleNotificationUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.NotificationRepository)
    private notificationRepository: INotificationRepository
  ) {}

  async execute(data: DeleteSingleNotificationRequestDTO): Promise<void> {
    const { notificationId } = data;
    await this.notificationRepository.delteSingleNotification(notificationId);
  }
}
