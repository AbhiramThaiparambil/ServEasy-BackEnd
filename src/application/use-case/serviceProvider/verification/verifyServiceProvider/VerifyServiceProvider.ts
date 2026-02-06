import { inject, injectable } from "tsyringe";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";
import { IUserRepository } from "../../../../../domain/repositories/IuserRepository";
import { REPOSITORY_TOKENS, SERVICE_TOKENS } from "../../../../../constants/tokens";
import { ITokenService } from "../../../../../services/token/ITokenService";
import { VerifyServiceProviderRequestDTO, VerifyServiceProviderResponseDTO } from "../../../../dtos/serviceProvider/verification/verifyServiceProvider/VerifyServiceProviderDTO";

import { IVerifyServiceProvider } from "./IVerifyServiceProvider";

@injectable()
export class VerifyServiceProvider implements IVerifyServiceProvider {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProviderRepository: IServiceProviderRepository,
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
    @inject(SERVICE_TOKENS.TokenService) private tokenService: ITokenService,
  ) {}

  async execute(data: VerifyServiceProviderRequestDTO): Promise<VerifyServiceProviderResponseDTO> {
    try {
      const userData = await this.userRepository.findById(data.userId);

      if (!userData) {
        return {
          success: false,
          message: "User not found"
        };
      }

      if (userData.serviceProvider) {
        const serviceProvider = await this.serviceProviderRepository.findById(
          userData.serviceProvider.toString(),
        );

        if (
          serviceProvider?.isVerified == "pending" ||
          serviceProvider?.isVerified == "rejected"
        ) {
          return {
            success: false,
            message: "Service provider verification is pending or rejected"
          };
        }

        if (serviceProvider && serviceProvider._id) {
          const refreshToken = this.tokenService.generateRefreshToken(
            serviceProvider._id.toString(),
            "serviceProvider",
          );

          return {
            success: true,
            refreshToken,
            message: "Service provider verified successfully"
          };
        }
      }

      return {
        success: false,
        message: "Service provider not found for this user"
      };
    } catch (error) {
      console.error("Error verifying service provider:", error);
      return {
        success: false,
        message: "Internal server error while verifying service provider"
      };
    }
  }
}
