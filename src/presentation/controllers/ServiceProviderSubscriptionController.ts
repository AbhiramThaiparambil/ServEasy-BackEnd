import { inject, injectable } from "tsyringe";
import { getString } from "../../utils/requestUtils";
import { getErrorMessage } from "../../utils/errorUtils";

import { SERVICE_TOKENS, USE_CASE_TOKENS } from "../../constants/tokens";
import { IGoogleGenAIService } from "../../services/aiAssistant/IGoogleGenAIService";
import { Request, Response } from "express";
import { HttpStatus } from "../../constants/HttpStatus";
import { ConversationWithParticipantsListInstance } from "twilio/lib/rest/conversations/v1/conversationWithParticipants";
import { IGetProviderAIChatsUseCase } from "../../application/use-case/serviceProvider/ai-assistance/getByServiceProvidersId/IGetProviderAIChatsusecase";
import { IGetAIChatByIdUseCase } from "../../application/use-case/serviceProvider/ai-assistance/getById/IGetAIChatByIdUseCase";
import { ICreateAiChatUseCase } from "../../application/use-case/serviceProvider/ai-assistance/create/ICreateAiChat.usecase";
import { CreateAiChatRequestDTO } from "../../application/dtos/serviceProvider/ai-assistance/create/CreateAiChatRequestDTO";
import { GetAIChatByIdRequestDTO } from "../../application/dtos/serviceProvider/ai-assistance/getById/GetAIChatByIdRequestDTO";
import { GetProviderAIChatsRequestDTO } from "../../application/dtos/serviceProvider/ai-assistance/getByServiceProvidersId/GetProviderAIChatsRequestDTO";

@injectable()
export class ServiceProviderSubscriptionController {
  constructor(
    @inject(USE_CASE_TOKENS.CreateAiChatUseCase)
    private createAiChatUseCase: ICreateAiChatUseCase,
    @inject(USE_CASE_TOKENS.GetAIChatByIdUseCase)
    private getAIChatByIdUseCase: IGetAIChatByIdUseCase,
    @inject(USE_CASE_TOKENS.GetProviderAIChatsUseCase)
    private getProviderChats: IGetProviderAIChatsUseCase
  ) {}

  async handleChatRequest(req: Request, res: Response): Promise<any> {
    const { message, activeChatId } = req.body;
    console.log(req.body);
    const serviceProviderId = res.locals.serviceProvider_id;

    if (!serviceProviderId) {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: "Service Provider ID is required",
      });
      return;
    }

    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: "Message is required and must be a non-empty string",
      });
      return;
    }

    const dto: CreateAiChatRequestDTO = {
      serviceProviderId,
      prompt: message,
      activeChatId,
    };

    const response = await this.createAiChatUseCase.execute(dto);
    console.log(response);
    console.log(
      "----------------------------====-------------===----------===--------"
    );
    if (!response) {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: "Message is required and must be a non-empty string",
      });
      return;
    }

    console.warn(response.chatId + "chat is chat id chat id chat id chat id");

    res.status(HttpStatus.OK).json({
      id: response.chatId,
      role: "assistant",
      title: response.title,
      content: response.aiResponse,
      createdAt: new Date(),
    });
  }

  async handleGetChatByChatId(req: Request, res: Response): Promise<void> {
    try {
      const chatId = getString(req.params.chatId);

      if (!chatId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: "chat id is required" });
        return;
      }
      const dto: GetAIChatByIdRequestDTO = { id: chatId };
      const data = await this.getAIChatByIdUseCase.execute(dto);

      if (!data) {
        res.status(HttpStatus.NOT_FOUND).json({ error: "Chat not found" });
        return;
      }
      res.status(HttpStatus.OK).json(data);
    } catch (error: unknown) {
      console.error(getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Something went wrong" });
    }
  }

  async getServiceProviderChatsHandler(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const providerId = getString(req.params.providerId);

      if (!providerId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: "serviceProvider id is required" });
        return;
      }

      const dto: GetProviderAIChatsRequestDTO = { providerId };
      const data = await this.getProviderChats.execute(dto);

      if (!data) {
        res.status(HttpStatus.NOT_FOUND).json({ error: "Chat not found" });
        return;
      }
      res.status(HttpStatus.OK).json(data);
    } catch (e: unknown) {}
  }
}
