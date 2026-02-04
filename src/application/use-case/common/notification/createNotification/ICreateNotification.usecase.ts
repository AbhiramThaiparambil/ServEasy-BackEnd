export interface ICreateNotificationUseCase {
  execute(content: string, userId: string): Promise<void>;
}
