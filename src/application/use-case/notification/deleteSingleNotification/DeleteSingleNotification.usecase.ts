import { inject, injectable } from "tsyringe";
import { Types } from "mongoose";
import { INotificationRepository } from "../../../../domain/repositories/INotificationRepository";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { IDeleteSingleNotificationUseCase } from "./IDeleteSingleNotification.usecase";

@injectable()
export class DeleteSingleNotificationUseCase
  implements IDeleteSingleNotificationUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.NotificationRepository)
    private notificationRepository: INotificationRepository
  ) {}

  async execute(notificationId: string): Promise<void> {
    await this.notificationRepository.delteSingleNotification(
      new Types.ObjectId(notificationId)
    );
  }
}
