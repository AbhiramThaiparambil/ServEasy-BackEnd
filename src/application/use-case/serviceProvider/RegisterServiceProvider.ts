import { injectable, inject } from "tsyringe";
import { IServiceProvider } from "../../../domain/entities/ServiceProvider";
import { IServiceProviderRepository } from "../../../domain/repositories/IserviceProviderRepository";
import { CloudinaryService } from "../../../services/cloudinary/cloudinary";

@injectable()
export class RegisterServiceProviderUseCase {
  constructor(
    @inject("IServiceProviderRepository") private serviceProviderRepository: IServiceProviderRepository,
    @inject("CloudinaryService") private cloudinaryService: CloudinaryService // Ensure this matches the registration
  ) {}

  async execute(serviceProviderData: IServiceProvider, profileImageRow: string, documentRow: string) {
    const document = await this.cloudinaryService.uploadDocuments(profileImageRow);
    const profileImage = await this.cloudinaryService.uploadServiceProviderProfile(profileImageRow);
    console.log(document);
    console.log(profileImage);
    serviceProviderData.profileImage=profileImage
    serviceProviderData.document=document
    console.log("_________________________________");
    console.log(serviceProviderData);
    
   const result= await this.serviceProviderRepository.create(serviceProviderData)
    console.log(result);
    
  }
}
