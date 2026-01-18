import { ISlot } from "../entities/ISlot";

export interface ISlotRepository {
  createSlot(slot: ISlot): Promise<ISlot>;
  deleteSlotById(id: string): Promise<boolean>;
  markSlotAsBooked(id: string): Promise<ISlot | null>;
  getSlotById(id: string): Promise<ISlot | null>;
  getSlotByServiceId(id: string): Promise<ISlot[] | []>;
  getSlotByServiceIdLearn(id: string): Promise<ISlot[] | []>;
  getActiveSlotsByServiceId(serviceId: string): Promise<ISlot[]>;
  cleanupOldSlots(): Promise<number>;
}
