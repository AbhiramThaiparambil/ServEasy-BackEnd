import { injectable, inject, container } from "tsyringe";
import mongoose from "mongoose";
import {
  IServiceBooking,
} from "../../../../../domain/entities/IServiceBooking";
import { ICreateBookingUseCase } from "./ICreateBooking.usecase";
import { BookingQueueService } from "../../../../../infrastructure/jobs/queue/BookingQueueService";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";
import {
  REPOSITORY_TOKENS,
} from "../../../../../constants/tokens";
import { IServiceRepository } from "../../../../../domain/repositories/IServiceRepository";
import { SocketService } from "../../../../../services/socket/SocketService";
import { ISystemNotification } from "../../../../../domain/entities/INotification";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";

import {
  CreateBookingRequestDTO,
} from "../../../../../application/dtos/user/booking/createBooking/CreateBookingDTO";

@injectable()
export class CreateBookingUseCase implements ICreateBookingUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository)
    private serviceRepository: IServiceRepository,

    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBookingRepository: IServiceBookingRepository,
    @inject(SocketService)
    private socketService: SocketService,
    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProviderRepo: IServiceProviderRepository,
  ) {}

  async execute(data: CreateBookingRequestDTO): Promise<IServiceBooking> {
    const { userId, serviceId, address, preferredServiceTime, liveLocation } = data;
    // NOTE: mongoose.startSession() is used here for transaction support.
    // This is an infrastructure concern that will be abstracted in a future refactor.
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      console.log("im useCase booking");
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

      const result = await this.serviceBookingRepository.createServiceBooking(
        bookingData,
        session,
      );

      if (!result || !result._id) {
        throw new Error("Failed to book service");
      }

      await this.serviceBookingRepository.addBookingHistory(
        result._id,
        "booked",
        "Service has been booked",
        session,
      );

      const notification: ISystemNotification = {
        type: "notification",
        targetRole: "SERVICE_PROVIDER",
        content: `A customer booked your ${service.serviceName} service. View the booking details to proceed.`,
        timestamp: new Date().toISOString(),
      };

      const providerUserId =
        await this.serviceProviderRepo.findUserIdByProviderId(
          service.serviceProviderId,
        );
      await this.socketService.sendNotificationToUser(
        providerUserId,
        service.serviceProviderId.toString(),
        notification,
      );

      await session.commitTransaction();
      session.endSession();

      const bookingQueueService = container.resolve(BookingQueueService);
      await bookingQueueService.addAutoCancelJob(
        result._id.toString(),
      );

      return result;
    } catch (error: unknown) {
      console.log(error);
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
