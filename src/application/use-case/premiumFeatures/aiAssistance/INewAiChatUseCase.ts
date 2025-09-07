export interface INewAiChatUseCase {
  execute(serviceProviderId: string, message: string): Promise<any>;
}