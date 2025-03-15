
import { IService } from "../../domain/entities/IService";
import { ServiceRepository } from "../../infrastructure/repositories/ServiceRepositorie";
import { CloudinaryService } from "../../services/cloudinary/cloudinary";
import { inject,injectable } from "tsyringe";
@injectable()
export class AddNewService {
  constructor(
    @inject("ServiceRepository") private serviceRepository: ServiceRepository,
    @inject("CloudinaryService") private cloudinaryService: CloudinaryService
  ) {}

  async execute(service: IService) {
    try {
      
      const img_url = await this.cloudinaryService.uploadServiceImg(service.serviceImage);
      service.serviceImage = img_url;

     
      const createdService = await this.serviceRepository.create(service);
     
     const allServices= await this.serviceRepository.findAllServiceProviderId(createdService.serviceProviderId)
      console.log(allServices)
     return allServices; 
    } catch (error) {
      console.error("Error adding new service:", error);
      throw new Error("Failed to add new service"); 
    }
  }
}
