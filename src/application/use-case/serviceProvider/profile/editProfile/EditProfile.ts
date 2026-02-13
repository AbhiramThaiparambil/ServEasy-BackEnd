import { inject, injectable } from "tsyringe";
import { IEditServiceProviderProfileUseCase } from "./IEditProfile";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";
import { IUpdateProfile } from "../../../../../domain/entities/IServiceProvider";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { EditProfileRequestDTO } from "../../../../dtos/serviceProvider/profile/editProfile/EditProfileRequestDTO";

@injectable()
export class EditServiceProviderProfileUseCase implements IEditServiceProviderProfileUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProvider: IServiceProviderRepository,
  ) {}
  
  async execute(data: EditProfileRequestDTO): Promise<boolean> {
    const updateData: IUpdateProfile = {
      _id: data.serviceProviderId,
      serviceProviderName: data.serviceProviderName || "",
      serviceProviderEmail: data.serviceProviderEmail || "",
      serviceProviderPhone: data.serviceProviderPhone || "",
      socialMedia: "",
      bankDetails: { accountHolderName: "", accountNumber: "", ifscCode: "" }
    };
    
    const result = await this.serviceProvider.editProvider(updateData);
    return !!result;
  }
}
