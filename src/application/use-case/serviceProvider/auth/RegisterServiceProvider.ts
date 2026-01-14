import { injectable, inject } from "tsyringe";
import {
  IServiceProvider,
  IServiceProviderRegistration,
} from "../../../../domain/entities/IServiceProvider";
import { IServiceProviderRepository } from "../../../../domain/repositories/IserviceProviderRepository";
import { CloudinaryService } from "../../../../services/cloudinary/CloudinaryService";
import { SERVICE_TOKENS } from "../../../../constants/tokens";

@injectable()
export class RegisterServiceProviderUseCase {
  constructor(
    @inject("IServiceProviderRepository")
    private serviceProviderRepository: IServiceProviderRepository,
    @inject(SERVICE_TOKENS.CloudinaryService)
    private cloudinaryService: CloudinaryService // Ensure this matches the registration
  ) {}

  async execute(
    serviceProviderData: IServiceProviderRegistration,
    profileImageRow: string,
    documentRow: string,
    document2Row: string | null
  ): Promise<IServiceProvider> {
    console.log("-----------------");

    console.log(serviceProviderData.bankDetails);
    console.log("-----------------");

    const document = await this.cloudinaryService.uploadDocuments(documentRow);
    const profileImage =
      await this.cloudinaryService.uploadServiceProviderProfile(
        profileImageRow
      );
    console.log(document);

    serviceProviderData.profileImage = profileImage;
    serviceProviderData.document?.push(document);

    if (document2Row) {
      const document = await this.cloudinaryService.uploadDocuments(
        document2Row
      );
      serviceProviderData.document.push(document);
    }
    const result = await this.serviceProviderRepository.create(
      serviceProviderData
    );
    console.log(result);
    return result;
  }
}
