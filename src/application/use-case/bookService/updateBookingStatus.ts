import { inject, injectable } from "tsyringe";
import { ServiceBookingRepository } from "../../../infrastructure/repositories/ServiceBookingRepository";
import mongoose from "mongoose";



@injectable()
export class UpdateServiceStatus {
  constructor(
    @inject(ServiceBookingRepository) private serviceBookingRepository: ServiceBookingRepository,
  
) {}

  async updateBookingStatus(serviceBookedId: string,status:string) {
    const bookedServiceId = new mongoose.Types.ObjectId(serviceBookedId);
 const data =  await this.serviceBookingRepository.updateServiceStatus(bookedServiceId,status)
 return data
  } 

  async ConformBookingStatus(serviceBookedId: string,status:string,estimatedServiceTime:string) {
    const bookedServiceId = new mongoose.Types.ObjectId(serviceBookedId);
    const data =  await  this.serviceBookingRepository.confirmBooking(bookedServiceId,status,estimatedServiceTime)
    return data
  } 

  async bookingCancel(id:string,status:string,cancellationReason:string){
    const bookedServiceId = new mongoose.Types.ObjectId(id);
    const data =  await  this.serviceBookingRepository.cancelBooking(bookedServiceId,status,cancellationReason)
    return data
  }

 
  }