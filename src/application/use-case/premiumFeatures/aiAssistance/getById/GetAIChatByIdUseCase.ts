import { inject, injectable } from "tsyringe";
import { IAiAssistanceChatSession } from "../../../../../domain/entities/IAiAssistance";
import { IGetAIChatByIdUseCase } from "./IGetAIChatByIdUseCase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IAiAssistanceRepository } from "../../../../../domain/repositories/IAiAssistanceRepository";
import { isValidObjectId, Types } from "mongoose";

@injectable()
export class GetAIChatByIdUseCase implements IGetAIChatByIdUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AiAssistanceRepository)
    private readonly aiAssistance: IAiAssistanceRepository
  ) {}

  async execute(id: string): Promise<IAiAssistanceChatSession | null> {
    try {
      if (!isValidObjectId(id)) {
        console.error(` ${id} is not valid objectId`);
        return null;
      }

      const objectId = new Types.ObjectId(id);
      return await this.aiAssistance.findById(objectId);
    } catch (error) {
      console.error(`[GetAIChatByIdUseCase] Failed to fetch chat:`, error);
      throw error;
    }
  }
}
