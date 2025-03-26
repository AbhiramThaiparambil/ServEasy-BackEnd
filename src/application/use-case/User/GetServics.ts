// import { IService } from "../../domain/entities/IService";
import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie"; 
import { inject, injectable } from "tsyringe";
@injectable()
export class GetServics {
  constructor(
    @inject("ServiceRepository") private serviceRepository: ServiceRepository
  ) {}

  async execute(id:String) {
    try {
      const allServices:any = await this.serviceRepository.getSingleServiceWithProviderDetails(id+"")
          console.log(allServices);
          console.log('------------------------');

       
       
      return allServices;
    } catch (error) {
      console.error("Error adding new service:", error);
      throw new Error("Failed to Fetch services");
    }
  }
}
