import { inject, injectable } from "tsyringe";
import { Types } from "mongoose";
import { INotificationRepository } from "../../../../../domain/repositories/INotificationRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IDeleteAllNotificationUseCase } from "./IDeleteAllNotification.usecase";

import { DeleteAllNotificationsRequestDTO } from "../../../../../application/dtos/common/notification/deleteAllNotification/DeleteAllNotificationDTO";

@injectable()
export class DeleteAllNotificationUseCase
  implements IDeleteAllNotificationUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.NotificationRepository)
    private notificationRepository: INotificationRepository
  ) {}

  async execute(data: DeleteAllNotificationsRequestDTO): Promise<void> {
    const { userId } = data;
    await this.notificationRepository.deleteUserAllNotification(
      new Types.ObjectId(userId)
    );
  }
}
