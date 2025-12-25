import { injectable, inject } from "tsyringe";
import mongoose from "mongoose";
import {
  IServiceBooking,
  IServiceSlot,
  IPreferredServiceDateTime,
} from "../../../../domain/entities/IServiceBooking";
import { ServiceRepository } from "../../../../infrastructure/repositories/ServiceRepositorie";
import { ServiceBookingRepository } from "../../../../infrastructure/repositories/ServiceBookingRepository";
import { ISlotRepository } from "../../../../domain/repositories/ISlotRepository";
import { ICreateOnlineBookingUseCase } from "./ICreateOnlineBookingUseCase";

@injectable()
export class CreateOnlineBookingUseCase implements ICreateOnlineBookingUseCase {
  constructor(
    @inject(ServiceRepository)
    private serviceRepository: ServiceRepository,

    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository,

    @inject("ISlotRepository")
    private slotRepository: ISlotRepository
  ) {}

  async execute(
    userId: mongoose.Types.ObjectId,
    serviceId: mongoose.Types.ObjectId,
    preferredServiceTime: IPreferredServiceDateTime,
    slotId: string
  ): Promise<IServiceBooking> {
    const service = await this.serviceRepository.findById(serviceId);
    if (!service || !slotId) {
      throw new Error("Service not found or slot ID is missing");
    }

    const slot = await this.slotRepository.getSlotById(slotId);
    if (!slot) {
      throw new Error("Slot not found");
    }

    if (slot.booked) {
      throw new Error("Slot is already booked");
    }

    const serviceSlot: IServiceSlot = {
      date: new Date(),
      startTime: slot.startTime,
      endTime: slot.endTime,
    };

    await this.slotRepository.markSlotAsBooked(slotId);

    const result = await this.serviceBookingRepository.createServiceBooking({
      serviceProviderId: service.serviceProviderId,
      serviceId,
      userId,
      serviceStatus: "confirmed",
      paymentType: "pending",
      paymentStatus: "pending",
      bookedTime: new Date(),
      isOnlineService: true,
      preferredSlot: preferredServiceTime,
      serviceSlot,
      payment: {
        serviceCost: 0,
        metaialCost: 0,
        travelCost: 0,
        inspectionCost: 0,
        total: service.estimatedPrice,
        convenienceFee: +(service.estimatedPrice * 0.1).toFixed(2),
        discountAmount: 0,
        finalTotal: service.estimatedPrice,
      },
    });

    if (!result) {
      throw new Error("Failed to book online service");
    }

    return result;
  }
}
