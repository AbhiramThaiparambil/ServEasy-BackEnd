import { inject, injectable } from "tsyringe";
import { IGetAIChatByIdUseCase } from "./IGetAIChatByIdUseCase";
import { isValidObjectId, Types } from "mongoose";
import { IAiAssistanceRepository } from "../../../../../domain/repositories/IAiAssistanceRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IAiAssistanceChatSession } from "../../../../../domain/entities/IAiAssistance";

import { GetAIChatByIdRequestDTO } from "../../../../dtos/serviceProvider/ai-assistance/getById/GetAIChatByIdRequestDTO";
import { getErrorMessage } from "../../../../../utils/errorUtils";


@injectable()
export class GetAIChatByIdUseCase implements IGetAIChatByIdUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AiAssistanceRepository)
    private readonly aiAssistance: IAiAssistanceRepository
  ) {}

  async execute(data: GetAIChatByIdRequestDTO): Promise<IAiAssistanceChatSession | null> {
    const { id } = data;
    try {
      if (!isValidObjectId(id)) {
        console.error(` ${id} is not valid objectId`);
        return null;
      }

      const objectId = new Types.ObjectId(id);
      return await this.aiAssistance.findById(objectId);
    } catch (error: unknown) {
      console.error(`[GetAIChatByIdUseCase] Failed to fetch chat:`, getErrorMessage(error));
      throw error;
    }
  }
}
