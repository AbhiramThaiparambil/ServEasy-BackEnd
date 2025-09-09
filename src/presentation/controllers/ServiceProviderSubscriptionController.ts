import { inject, injectable } from 'tsyringe';
import { SERVICE_TOKENS, USE_CASE_TOKENS } from '../../utils/constants/tokens';
import { IGoogleGenAIService } from '../../services/aiAssistant/IgoogleGenAIService';
import { Request, Response } from 'express';
import { HttpStatus } from '../../constants/HttpStatus';
import { ICreateAiChatUseCase } from '../../application/use-case/premiumFeatures/aiAssistance/ICreateAiChatUseCase';
import { title } from 'process';
import { ConversationWithParticipantsListInstance } from 'twilio/lib/rest/conversations/v1/conversationWithParticipants';
@injectable()
export class ServiceProviderSubscriptionController {
  constructor(
    @inject(USE_CASE_TOKENS.CreateAiChatUseCase) private createAiChatUseCase: ICreateAiChatUseCase
  ) {}

  async handleChatRequest(req: Request, res: Response): Promise<any> {
    const { message, activeChatId } = req.body;
    const serviceProviderId = res.locals.serviceProvider_id;
      
    if (!serviceProviderId) {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Service Provider ID is required',
      });
      return;
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Message is required and must be a non-empty string',
      });
      return;
    }

    const response = await this.createAiChatUseCase.execute(
      serviceProviderId,
      message,
      activeChatId
    );
    if(!response){
  res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Message is required and must be a non-empty string',
      });    
    return
}


console.log("-0--=--=--=-=-=-=-=-=-=-=-")

console.log(response)
console.log("-0--=--=--=-=-=-=-=-=-=-=-")


    res
      .status(HttpStatus.OK)
      .json({ id: response.chatId, role: 'assistant',title:response.title,  content: response.aiResponse, createdAt: new Date() });
  }
}
