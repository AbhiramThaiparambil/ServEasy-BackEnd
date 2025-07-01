import { injectable, inject, container } from "tsyringe";
import { ServiceBookingRepository } from "../../../infrastructure/repositories/ServiceBookingRepository";
import { IliveLocation, IPreferredServiceDateTime, IServiceBooking, IServiceSlot, } from "../../../domain/entities/IServiceBooking";
import { IAddress } from "../../../domain/entities/IAddress";
import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie";
import mongoose, { Types } from "mongoose";
import { ISlotRepository } from "../../../domain/repositories/ISlotRepository";
import { BookingQueueService } from "../../../services/jobs/BookingQueueService";

@injectable()
export class BookService {
  constructor(
    @inject(ServiceRepository) private serviceRepository: ServiceRepository,
    @inject(ServiceBookingRepository) private serviceBookingRepository: ServiceBookingRepository,
    @inject("ISlotRepository") private slotRepository: ISlotRepository
  ) {}

  async execute(userId: mongoose.Types.ObjectId,
    serviceId: mongoose.Types.ObjectId,
    address: IAddress,
    preferredServiceTime:IPreferredServiceDateTime,liveLocation:IliveLocation
  ): Promise<IServiceBooking|void> {
   try {
     
    const service = await this.serviceRepository.findById(serviceId);
    
    if (!service) {
      throw new Error("Service not found");
    }
  
    
   const data: IServiceBooking = {
  serviceProviderId: service.serviceProviderId,
  serviceId,
  address,
  userId,
  serviceStatus: "pending", 
  paymentType: "pending", 
  paymentStatus: "pending",
  bookedTime: new Date(),
  preferredSlot: preferredServiceTime,

};


if (
  liveLocation) {
  data.liveLocation = liveLocation;
}
    const result = await this.serviceBookingRepository.createServiceBooking(data);

if(result&&result._id){
  await this.serviceBookingRepository.addBookingHistory
  (result._id, "booked", "Service has been booked");

}




    if (!result|| !result._id) {
      throw new Error("Failed to book service");
    }

    const bookingQueueService = container.resolve(BookingQueueService);
await bookingQueueService.addAutoCancelJob(new Types.ObjectId(result._id.toString()));



    return result;
   } catch (error) {
    console.error("Error in bookService:", error);
    throw new Error("Failed to book service: " + (error as Error).message);
   }
  }


  
  async bookOnlineService(
    userId: mongoose.Types.ObjectId,
    serviceId: mongoose.Types.ObjectId,
    preferredServiceTime:IPreferredServiceDateTime,
    slotId:string
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
      date:new Date(),
      startTime: slot.startTime,
      endTime: slot.endTime,
    };
 
    this.slotRepository.markSlotAsBooked(slotId);
  
    const result = await this.serviceBookingRepository.createServiceBooking({
      serviceProviderId: service.serviceProviderId,
      serviceId,
      userId,
      payment: {
        serviceCost: 0,
        metaialCost: 0,
        travelCost: 0,
        inspectionCost: 0,
        total: service.estimatedPrice,
        convenienceFee: +(service.estimatedPrice * 0.10).toFixed(2),
      },
      serviceStatus: "confirmed",
      paymentType: "pending",
      paymentStatus: "pending",

      bookedTime: new Date(),
      isOnlineService: true,
      preferredSlot:preferredServiceTime,
      serviceSlot: serviceSlot,
    });
  
    if (!result) {
      throw new Error("Failed to book service");
    }
  
    return result;
  }
}
