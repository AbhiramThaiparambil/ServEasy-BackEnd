
import { inject, injectable } from "tsyringe";
import { IService } from "../../domain/entities/IService";
import { ServiceRepository } from "../../infrastructure/repositories/ServiceRepositorie";
import { CloudinaryService } from "../../services/cloudinary/cloudinary";
@injectable()
export class EditService {
  constructor(
    @inject("ServiceRepository") private serviceRepository: ServiceRepository,
       @inject("CloudinaryService") private cloudinaryService: CloudinaryService
   
  ) {}

  async execute(serviceId: string, serviceData: IService,serviceNewImg?:string): Promise<IService | null> {
    try {
      let imgeUrl=""
      if( serviceNewImg && !serviceNewImg?.includes('https://res.cloudinary.com/')){
        console.log('imge called');
        
        imgeUrl=  await this.cloudinaryService.uploadServiceImg(serviceNewImg)
        serviceData.serviceImage=imgeUrl

      }else if(serviceNewImg){
        serviceData.serviceImage=serviceNewImg

      }
      const updatedService = await this.serviceRepository.updateService(serviceId, serviceData);
      return updatedService;
    } catch (error:any) {
      throw new Error(`Error updating service: ${error.message}`);
    }
  }
}
