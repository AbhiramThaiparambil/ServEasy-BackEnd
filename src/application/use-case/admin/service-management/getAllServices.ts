// import { IService } from "../../domain/entities/IService";
import { ServiceRepository } from "../../../../infrastructure/repositories/ServiceRepositorie"; 
import { inject, injectable } from "tsyringe";
@injectable()
export class GetAllServics {
  constructor(
    @inject("ServiceRepository") private serviceRepository: ServiceRepository
  ) {}

  async execute(skip:number,limit:number) {
    try {
      const allServices:any = await this.serviceRepository.getServicesWithProviderDetails(skip,limit)
      const count = await this.serviceRepository.getServicesWithProviderDetailsCount()
          
        console.log(count);
        
       
      return {allServices,count}
    } catch (error) {
      console.error("Error adding new service:", error);
      throw new Error("Failed to Fetch services");
    }
  }
}
