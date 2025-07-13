import { injectable, inject } from "tsyringe";
import { ServiceBookingRepository } from "../../../infrastructure/repositories/ServiceBookingRepository";
import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie";
import mongoose from "mongoose";
@injectable()
export class GetBookService {
  constructor(
    @inject(ServiceRepository) private serviceRepository: ServiceRepository,
    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository
  ) {}

  async UserBookedServices(uId: mongoose.Types.ObjectId,skip:number,limit:number) {
    const userId = new mongoose.Types.ObjectId(uId);

    const data =
      await this.serviceBookingRepository.findBookedServicesAndServiceByUserId(
        userId,
        skip,limit
      );

    return data;
  }

async findBookedServiceUserCount(uId: mongoose.Types.ObjectId) {
    const userId = new mongoose.Types.ObjectId(uId);

    return  await this.serviceBookingRepository.findCountBookedServicebyUserId(userId,);
  }

  async ServiceProviderBookedServices(sId: mongoose.Types.ObjectId,skip:number,limit:number) {
    const serviceProviderId = new mongoose.Types.ObjectId(sId);

    const service =
      await this.serviceBookingRepository.findBookedServicesAndServiceByServiceProviderId(
        serviceProviderId,skip,limit
      );

    const count =await  this.serviceBookingRepository.findCountBookedService(serviceProviderId)
    console.log(count+"        jhklhjkhkjhkjhhk");
    
    return        {service,count}

  }
}
