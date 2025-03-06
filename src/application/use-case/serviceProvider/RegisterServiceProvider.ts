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

  async execute(serviceProviderData: IServiceProvider, profileImageRow: string, documentRow: string):Promise<IServiceProvider>{
    const document = await this.cloudinaryService.uploadDocuments(documentRow);
    const profileImage = await this.cloudinaryService.uploadServiceProviderProfile(profileImageRow);
   console.log(document);
   
    serviceProviderData.profileImage=profileImage
    serviceProviderData.document=document

   const result= await this.serviceProviderRepository.create(serviceProviderData)
    console.log(result);
     return result
  }
}
