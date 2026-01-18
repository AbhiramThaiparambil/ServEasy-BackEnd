import { inject, injectable } from "tsyringe";
import { Types } from "mongoose";
import { INotificationRepository } from "../../../../domain/repositories/INotificationRepository";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { ICreateNotificationUseCase } from "./ICreateNotification.usecase";

@injectable()
export class CreateNotificationUseCase implements ICreateNotificationUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.NotificationRepository)
    private notificationRepository: INotificationRepository
  ) {}

  async execute(content: string, userId: string): Promise<void> {
    await this.notificationRepository.createNotification({
      content,
      userId: new Types.ObjectId(userId),
    });
  }
}
