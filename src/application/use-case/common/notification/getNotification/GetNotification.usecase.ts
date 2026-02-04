import { inject, injectable } from "tsyringe";
import { Types } from "mongoose";
import { INotificationRepository } from "../../../../../domain/repositories/INotificationRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IGetNotificationUseCase } from "./IGetNotification.usecase";

@injectable()
export class GetNotificationUseCase implements IGetNotificationUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.NotificationRepository)
    private notificationRepository: INotificationRepository
  ) {}

  async execute(userId: string) {
    const objectId = new Types.ObjectId(userId);

    const notifications =
      await this.notificationRepository.findNotificationsByUserId(objectId);

    const unreadCount =
      await this.notificationRepository.findNotificationsUnreaded(objectId);

    return { notifications, unreadCount };
  }
}
