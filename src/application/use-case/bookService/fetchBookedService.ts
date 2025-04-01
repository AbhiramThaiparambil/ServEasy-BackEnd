import { injectable, inject } from "tsyringe";
import { ServiceBookingRepository } from "../../../infrastructure/repositories/ServiceBookingRepository";
import { IServiceBooking } from "../../../domain/entities/IserviceBooking";
import { IAddress } from "../../../domain/entities/IAddress";
import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie";
import mongoose from "mongoose";
import { ServiceProviderRepository } from "../../../infrastructure/repositories/ServiceProviderRepository";
import { UserRepository } from "../../../domain/repositories/IuserRepository";
@injectable()
export class GetBookService {
  constructor(
    @inject(ServiceRepository) private serviceRepository: ServiceRepository,
    @inject(ServiceBookingRepository) private serviceBookingRepository: ServiceBookingRepository
) {}
 
  async UserBookedServices (uId:mongoose.Types.ObjectId){
   const userId= new mongoose.Types.ObjectId(uId);

     
    const data=await this.serviceBookingRepository.findBookedServicesAndServiceByUserId(userId)
    
     return data
}
async ServiceProviderBookedServices (sId:mongoose.Types.ObjectId){
  const serviceProviderId= new mongoose.Types.ObjectId(sId);

   const data=await this.serviceBookingRepository.findBookedServicesAndServiceByServiceProviderId(serviceProviderId)

  return data
}    


}