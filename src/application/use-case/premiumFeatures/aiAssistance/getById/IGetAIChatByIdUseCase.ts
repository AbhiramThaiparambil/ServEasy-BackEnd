import { IAiAssistanceChatSession } from "../../../../../domain/entities/IAiAssistance";

export interface IGetAIChatByIdUseCase{
    execute(id:string):Promise<IAiAssistanceChatSession|null>
}