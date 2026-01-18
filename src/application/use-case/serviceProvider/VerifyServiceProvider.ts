import { inject, injectable } from "tsyringe";
import { IServiceProviderRepository } from "../../../domain/repositories/IserviceProviderRepository";
import { IUserRepository } from "../../../domain/repositories/IuserRepository";
import { REPOSITORY_TOKENS, SERVICE_TOKENS } from "../../../constants/tokens";
import { ITokenService } from "../../../services/token/ITokenService";

@injectable()
export class VerifyServiceProvider {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProviderRepository: IServiceProviderRepository,
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
    @inject(SERVICE_TOKENS.TokenService) private tokenService: ITokenService,
  ) {}

  async execute(userId: string): Promise<string | false> {
    try {
      const userData = await this.userRepository.findById(userId);

      if (!userData) {
        throw new Error("User not found");
      }

      if (userData.serviceProvider) {
        const serviceProvider = await this.serviceProviderRepository.findById(
          userData.serviceProvider.toString(),
        );

        if (
          serviceProvider?.isVerified == "pending" ||
          serviceProvider?.isVerified == "rejected"
        ) {
          return false;
        }

        if (serviceProvider && serviceProvider._id) {
          return this.tokenService.generateRefreshToken(
            serviceProvider._id.toString(),
            "serviceProvider",
          );
        }
      }

      return false;
    } catch (error) {
      console.error("Error verifying service provider:", error);
      throw new Error("Internal server error while verifying service provider");
    }
  }
}
