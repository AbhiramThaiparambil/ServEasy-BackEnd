import { AiChatResponse } from "../../../../../utils/types/dto/IAiChatResponse";
import { CreateAiChatRequestDTO } from "../../../../dtos/serviceProvider/ai-assistance/create/CreateAiChatRequestDTO";

export interface ICreateAiChatUseCase {
  execute(data: CreateAiChatRequestDTO): Promise<AiChatResponse>;
}
