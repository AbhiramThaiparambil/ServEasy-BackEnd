import { inject, injectable } from "tsyringe";
import { Types } from "mongoose";
import { INotificationRepository } from "../../../../../domain/repositories/INotificationRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IDeleteAllNotificationUseCase } from "./IDeleteAllNotification.usecase";

@injectable()
export class DeleteAllNotificationUseCase
  implements IDeleteAllNotificationUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.NotificationRepository)
    private notificationRepository: INotificationRepository
  ) {}

  async execute(userId: string): Promise<void> {
    await this.notificationRepository.deleteUserAllNotification(
      new Types.ObjectId(userId)
    );
  }
}
