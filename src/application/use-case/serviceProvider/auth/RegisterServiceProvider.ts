import { injectable, inject } from "tsyringe";
import {
  IServiceProvider,
  IServiceProviderRegistration,
} from "../../../../domain/entities/IServiceProvider";
import { IServiceProviderRepository } from "../../../../domain/repositories/IserviceProviderRepository";
import { CloudinaryService } from "../../../../services/cloudinary/CloudinaryService";
import { SERVICE_TOKENS } from "../../../../constants/tokens";
import { RegisterServiceProviderRequestDTO } from "../../../dtos/serviceProvider/auth/ServiceProviderAuthDTO";

@injectable()
export class RegisterServiceProviderUseCase {
  constructor(
    @inject("IServiceProviderRepository")
    private serviceProviderRepository: IServiceProviderRepository,
    @inject(SERVICE_TOKENS.CloudinaryService)
    private cloudinaryService: CloudinaryService, 
  ) {}

  async execute(
    data: RegisterServiceProviderRequestDTO
  ): Promise<IServiceProvider> {
    const { serviceProviderData, profileImageRow, documentRow, document2Row } = data;
    console.log(serviceProviderData.bankDetails);

    const document = await this.cloudinaryService.uploadDocuments(documentRow);
    const profileImage =
      await this.cloudinaryService.uploadServiceProviderProfile(
        profileImageRow,
      );
    console.log(document);

    serviceProviderData.profileImage = profileImage;
    serviceProviderData.document?.push(document);

    if (document2Row) {
      const document =
        await this.cloudinaryService.uploadDocuments(document2Row);
      serviceProviderData.document.push(document);
    }
    const result =
      await this.serviceProviderRepository.create(serviceProviderData);
    console.log(result);
    return result;
  }
}
