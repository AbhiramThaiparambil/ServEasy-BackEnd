import { inject, injectable } from "tsyringe";
import { Types } from "mongoose";
import { INotificationRepository } from "../../../../domain/repositories/INotificationRepository";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { IMarkNotificationAsReadUseCase } from "./IMarkNotificationAsRead.usecase";

@injectable()
export class MarkNotificationAsReadUseCase
  implements IMarkNotificationAsReadUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.NotificationRepository)
    private notificationRepository: INotificationRepository
  ) {}

  async execute(notificationId: string): Promise<void> {
    await this.notificationRepository.markNotificationAsRead(
      new Types.ObjectId(notificationId)
    );
  }
}
