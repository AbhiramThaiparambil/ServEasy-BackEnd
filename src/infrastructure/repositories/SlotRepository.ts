import { Types } from 'mongoose';
import { ISlot } from '../../domain/entities/ISlot';
import { ISlotRepository } from '../../domain/repositories/ISlotRepository';
import { SlotModel } from '../models/SlotModel';
import { injectable } from 'tsyringe';

@injectable()
export class SlotRepository implements ISlotRepository {
 async createSlot(slot: ISlot): Promise<ISlot> {
  const slotToSave = {
    ...slot,
    serviceId: new Types.ObjectId(slot.serviceId),
  };

  const created = new SlotModel(slotToSave);
  const saved = await created.save();

  return {
    _id: saved._id.toString(),
    serviceId: saved.serviceId,
    startTime: saved.startTime,
    endTime: saved.endTime,
    booked: saved.booked,
    createdAt: saved.createdAt,
  };
}

  async deleteSlotById(id: string): Promise<boolean> {
    const result = await SlotModel.findByIdAndDelete(id);
    return !!result;
  }

  async markSlotAsBooked(id: string): Promise<ISlot | null> {
    const doc = await SlotModel.findByIdAndUpdate(
      id,
      { booked: true },
      { new: true }
    ).lean();

    return doc
      ? {
          _id: doc._id?.toString(),
          serviceId: doc.serviceId,
          startTime: doc.startTime,
          endTime: doc.endTime,
          booked: doc.booked,
          createdAt: doc.createdAt,
        }
      : null;
  }

  async getSlotById(id: string): Promise<ISlot | null> {
    const doc = await SlotModel.findById(id).lean();

    return doc
      ? {
          _id: doc._id?.toString(),
          serviceId: doc.serviceId,
          startTime: doc.startTime,
          endTime: doc.endTime,
          booked: doc.booked,
          createdAt: doc.createdAt,
        }
      : null;
  }

  getSlotByServiceId(serviceId: string): Promise<ISlot[] | []> {
      return SlotModel.find({serviceId})
      
  }
}
