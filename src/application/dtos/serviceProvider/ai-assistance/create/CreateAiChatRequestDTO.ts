export interface CreateAiChatRequestDTO {
  serviceProviderId: string;
  prompt: string;
  activeChatId?: string;
}
