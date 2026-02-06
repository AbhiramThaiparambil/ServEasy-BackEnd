import { IAiAssistanceChatSession } from "../../../../../domain/entities/IAiAssistance";
import { GetAIChatByIdRequestDTO } from "../../../../dtos/serviceProvider/ai-assistance/getById/GetAIChatByIdRequestDTO";

export interface IGetAIChatByIdUseCase {
  execute(data: GetAIChatByIdRequestDTO): Promise<IAiAssistanceChatSession | null>;
}
