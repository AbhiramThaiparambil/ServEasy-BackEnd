import { injectable, inject, container } from "tsyringe";
import mongoose, { ClientSession, Types } from "mongoose";
import {
  IServiceBooking,
  IPreferredServiceDateTime,
  IliveLocation,
} from "../../../../domain/entities/IServiceBooking";
import { IAddress } from "../../../../domain/entities/IAddress";
import { ServiceRepository } from "../../../../infrastructure/repositories/ServiceRepositorie";
import { ServiceBookingRepository } from "../../../../infrastructure/repositories/ServiceBookingRepository";
import { ICreateBookingUseCase } from "./ICreateBooking.usecase";
import { BookingQueueService } from "../../../../infrastructure/jobs/queue/BookingQueueService";
import { IServiceBookingRepository } from "../../../../domain/repositories/IserviceBookingRepository";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { IServiceRepository } from "../../../../domain/repositories/IServiceRepository";

@injectable()
export class CreateBookingUseCase implements ICreateBookingUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository)
    private serviceRepository: IServiceRepository,

    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBookingRepository: IServiceBookingRepository,
  ) {}

  async execute(
    userId: mongoose.Types.ObjectId,
    serviceId: mongoose.Types.ObjectId,
    address: IAddress,
    preferredServiceTime: IPreferredServiceDateTime,
    liveLocation?: IliveLocation,
  ): Promise<IServiceBooking> {
    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();
    try {
      const service = await this.serviceRepository.findById(serviceId);
      if (!service) {
        throw new Error("Service not found");
      }

      const hasActiveBooking =
        await this.serviceBookingRepository.hasActiveBooking(userId, serviceId);

      if (hasActiveBooking) {
        throw new Error("User already has an active booking");
      }

      const activeServices =
        await this.serviceBookingRepository.countActiveServices(
          service.serviceProviderId,
        );
      console.log(activeServices);
      if (activeServices >= 2) {
        throw new Error("Service provider is busy");
      }

      const bookingData: IServiceBooking = {
        serviceProviderId: service.serviceProviderId,
        serviceId,
        userId,
        address,
        serviceStatus: "pending",
        paymentType: "pending",
        paymentStatus: "pending",
        bookedTime: new Date(),
        preferredSlot: preferredServiceTime,
        ...(liveLocation && { liveLocation }),
      };

      const result =
        await this.serviceBookingRepository.createServiceBooking(bookingData);

      if (!result || !result._id) {
        throw new Error("Failed to book service");
      }

      await this.serviceBookingRepository.addBookingHistory(
        result._id,
        "booked",
        "Service has been booked",
      );
      await session.commitTransaction();
      session.endSession();

      const bookingQueueService = container.resolve(BookingQueueService);
      await bookingQueueService.addAutoCancelJob(
        new Types.ObjectId(result._id.toString()),
      );

      return result;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
