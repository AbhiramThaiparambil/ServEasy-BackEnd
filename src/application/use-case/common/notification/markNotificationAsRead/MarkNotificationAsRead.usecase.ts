import { inject, injectable } from "tsyringe";
import { INotificationRepository } from "../../../../../domain/repositories/INotificationRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IMarkNotificationAsReadUseCase } from "./IMarkNotificationAsRead.usecase";

import { MarkNotificationAsReadRequestDTO } from "../../../../../application/dtos/common/notification/markNotificationAsRead/MarkNotificationAsReadDTO";

@injectable()
export class MarkNotificationAsReadUseCase
  implements IMarkNotificationAsReadUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.NotificationRepository)
    private notificationRepository: INotificationRepository
  ) {}

  async execute(data: MarkNotificationAsReadRequestDTO): Promise<void> {
    const { notificationId } = data;
    await this.notificationRepository.markNotificationAsRead(notificationId);
  }
}
