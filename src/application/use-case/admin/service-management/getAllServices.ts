// import { IService } from "../../domain/entities/IService";
import { ServiceRepository } from "../../../../infrastructure/repositories/ServiceRepositorie"; 
import { inject, injectable } from "tsyringe";
@injectable()
export class GetAllServics {
  constructor(
    @inject("ServiceRepository") private serviceRepository: ServiceRepository
  ) {}

  async execute() {
    try {
      const allServices:any = await this.serviceRepository.getServicesWithProviderDetails()
          console.log(allServices);
          
       
       
      return allServices;
    } catch (error) {
      console.error("Error adding new service:", error);
      throw new Error("Failed to Fetch services");
    }
  }
}
