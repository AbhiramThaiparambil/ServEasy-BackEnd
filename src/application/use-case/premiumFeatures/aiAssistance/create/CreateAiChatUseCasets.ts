import { inject, injectable } from 'tsyringe';
import { ICreateAiChatUseCase } from './ICreateAiChatUseCase';
import { REPOSITORY_TOKENS, SERVICE_TOKENS } from '../../../../../utils/constants/tokens';
import { IGoogleGenAIService } from '../../../../../services/aiAssistant/IgoogleGenAIService';
import { IAiAssistanceRepository } from '../../../../../domain/repositories/IAiAssistanceRepository';
import { Types } from 'mongoose';
import { IAiAssistanceMessage } from '../../../../../domain/entities/IAiAssistance';
import { AiChatResponse } from '../../../../../utils/types/dto/IAiChatResponse';
@injectable()
export class CreateAiChatUseCase implements ICreateAiChatUseCase {
  constructor(
    @inject(SERVICE_TOKENS.GoogleGenAIService) private googleGenAIService: IGoogleGenAIService,
    @inject(REPOSITORY_TOKENS.AiAssistanceRepository) private aiAssistance: IAiAssistanceRepository
  ) {}

  async execute(
    serviceProviderId: string,
    prompt: string,
    activeChatId?: string
  ): Promise<AiChatResponse | void> {
    try {
     console.log(activeChatId +"   _________________________")


      const newMessage: IAiAssistanceMessage = {
        content: prompt,
        createdAt: new Date(),
        role: 'user',
      };

      // if (!activeChatId) {
      //   return
      // }

      const savedUserMessage = await this.aiAssistance.addMessage(
        new Types.ObjectId(serviceProviderId),
        newMessage,
        activeChatId
      );
      console.log(savedUserMessage);

      const response = await this.googleGenAIService.generateResponse(prompt);
      const responseMessage: IAiAssistanceMessage = {
        content: response.text,
        createdAt: new Date(),
        role: 'assistant',
      };

      const savedChat = await this.aiAssistance.addMessage(
        new Types.ObjectId(serviceProviderId),
        responseMessage,
        activeChatId ? activeChatId : savedUserMessage?.id
      );

      console.log(savedChat);

      return { aiResponse: response.text, chatId: savedUserMessage?.id, title: savedChat?.title };
    } catch (error) {
      console.error('Error in AiChatUseCase.execute:', error);
      throw new Error('Failed to process AI chat request');
    }
  }
}
