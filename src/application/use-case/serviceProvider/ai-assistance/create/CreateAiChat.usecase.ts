import { inject, injectable } from "tsyringe";
import { ICreateAiChatUseCase } from "./ICreateAiChat.usecase";
import {
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
} from "../../../../../constants/tokens";
import { IGoogleGenAIService } from "../../../../../services/aiAssistant/IGoogleGenAIService";
import { IAiAssistanceRepository } from "../../../../../domain/repositories/IAiAssistanceRepository";
import { AiChatResponse } from "../../../../../utils/types/dto/IAiChatResponse";
import { isValidObjectId, Types } from "mongoose";
import { IAiAssistanceMessage } from "../../../../../domain/entities/IAiAssistance";

import { CreateAiChatRequestDTO } from "../../../../dtos/serviceProvider/ai-assistance/create/CreateAiChatRequestDTO";

@injectable()
export class CreateAiChatUseCase implements ICreateAiChatUseCase {
  constructor(
    @inject(SERVICE_TOKENS.GoogleGenAIService)
    private googleGenAIService: IGoogleGenAIService,
    @inject(REPOSITORY_TOKENS.AiAssistanceRepository)
    private aiAssistance: IAiAssistanceRepository
  ) {}

  async execute(
    data: CreateAiChatRequestDTO
  ): Promise<AiChatResponse> {
    const { serviceProviderId, prompt, activeChatId } = data;
    try {
      let chatId: string | undefined;

      if (activeChatId && isValidObjectId(activeChatId)) {
        chatId = activeChatId;
      }

      const newMessage: IAiAssistanceMessage = {
        content: prompt,
        createdAt: new Date(),
        role: "user",
      };

      const savedUserMessage = await this.aiAssistance.addMessage(
        new Types.ObjectId(serviceProviderId),
        newMessage,
        chatId
      );

      const response = await this.googleGenAIService.generateResponse(prompt);

      const responseMessage: IAiAssistanceMessage = {
        content: response.text,
        createdAt: new Date(),
        role: "assistant",
      };

      const savedChat = await this.aiAssistance.addMessage(
        new Types.ObjectId(serviceProviderId),
        responseMessage,
        chatId ?? savedUserMessage?.id
      );

      return {
        aiResponse: response.text,
        chatId: chatId ?? savedUserMessage?.id,
        title: savedChat?.title,
      };
    } catch (error) {
      console.error("Error in AiChatUseCase.execute:", error);
      throw new Error("Failed to process AI chat request");
    }
  }
}
