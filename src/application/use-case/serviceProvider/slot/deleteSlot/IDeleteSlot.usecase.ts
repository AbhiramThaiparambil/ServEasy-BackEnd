import { DeleteSlotRequestDTO } from "../../../../dtos/serviceProvider/slot/deleteSlot/DeleteSlotRequestDTO";

export interface IDeleteSlotUseCase {
  execute(data: DeleteSlotRequestDTO): Promise<boolean>;
}
