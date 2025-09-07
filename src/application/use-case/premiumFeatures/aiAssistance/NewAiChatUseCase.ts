import { inject } from "tsyringe";
import { INewAiChatUseCase } from "./INewAiChatUseCase";
import { SERVICE_TOKENS, USE_CASE_TOKENS } from "../../../../utils/constants/tokens";
import { IGoogleGenAIService } from "../../../../services/aiAssistant/IgoogleGenAIService";



export class NewAiChatUseCase implements INewAiChatUseCase {
  constructor(@inject(SERVICE_TOKENS.GoogleGenAIService) private googleGenAIService: IGoogleGenAIService) {}

  async execute(serviceProviderId: string, message: string): Promise<any> {
    const response = await this.googleGenAIService.generateResponse(message);

    
    return response;
  }
}