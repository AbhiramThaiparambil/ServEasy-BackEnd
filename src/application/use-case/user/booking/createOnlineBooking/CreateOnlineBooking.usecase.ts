import { injectable, inject } from "tsyringe";
import mongoose from "mongoose";
import {
  IServiceBooking,
  IServiceSlot,
} from "../../../../../domain/entities/IServiceBooking";
import { ServiceRepository } from "../../../../../infrastructure/repositories/ServiceRepositorie";
import { ServiceBookingRepository } from "../../../../../infrastructure/repositories/ServiceBookingRepository";
import { ISlotRepository } from "../../../../../domain/repositories/ISlotRepository";
import { ICreateOnlineBookingUseCase } from "./ICreateOnlineBooking.usecase";

import {
  CreateOnlineBookingRequestDTO,
} from "../../../../../application/dtos/user/booking/createOnlineBooking/CreateOnlineBookingDTO";

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

  async execute(data: CreateOnlineBookingRequestDTO): Promise<IServiceBooking> {
    const { userId: userIdStr, serviceId: serviceIdStr, slotId } = data;
    const userId = new mongoose.Types.ObjectId(userIdStr);
    const serviceId = new mongoose.Types.ObjectId(serviceIdStr);
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

      serviceSlot,
      payment: {
        serviceCost: 0,
        materialCost: 0,
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
