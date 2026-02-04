export interface IDeleteSingleNotificationUseCase {
  execute(notificationId: string): Promise<void>;
}
