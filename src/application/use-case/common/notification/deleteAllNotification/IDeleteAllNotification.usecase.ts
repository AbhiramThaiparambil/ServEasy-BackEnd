export interface IDeleteAllNotificationUseCase {
  execute(userId: string): Promise<void>;
}
