import { injectable, inject } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";
import { IGetServiceProvider } from "./IGetServiceProvider";
import { GetProfileRequestDTO } from "../../../../dtos/serviceProvider/profile/getProfile/GetProfileRequestDTO";
import { GetProfileResponseDTO } from "../../../../dtos/serviceProvider/profile/getProfile/GetProfileResponseDTO";

@injectable()
export class GetServiceProvider implements IGetServiceProvider {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProviderRepository: IServiceProviderRepository
  ) {}

  async execute(data: GetProfileRequestDTO): Promise<GetProfileResponseDTO> {
    const result = await this.serviceProviderRepository.findByUserID(data.userId);
    
    if (!result) {
      throw new Error("Service provider not found");
    }
    
    return {
      _id: result._id?.toString() || "",
      serviceProviderName: result.serviceProviderName,
      serviceProviderEmail: result.serviceProviderEmail,
      serviceProviderPhone: result.serviceProviderPhone,
       userId:result.userId.toString(),
       description:result.description||"",
      profileImage: result.profileImage||"",
      isBlocked:result.isBlocked,
  
    
    };
  }
}
