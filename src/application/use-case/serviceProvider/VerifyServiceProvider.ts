


import { inject, injectable } from 'tsyringe';
import { IServiceProviderRepository } from '../../../domain/repositories/IserviceProviderRepository';
import { UserRepository } from '../../../domain/repositories/IuserRepository';
import { TokenService } from '../../../services/auth/TokenService';

@injectable()
export class VerifyServiceProvider {
  constructor(
    @inject("IServiceProviderRepository") private serviceProviderRepository: IServiceProviderRepository,
    @inject("UserRepository") private userRepository: UserRepository,
    @inject("TokenService") private tokenService: TokenService
  ) {}

  async execute(userId: string): Promise<string | false> {
    try {
      const userData = await this.userRepository.findById(userId);

      if (!userData) {
        throw new Error("User not found");
      }
        
 
      if (userData.serviceProvider) {
        const serviceProvider = await this.serviceProviderRepository.findById(userData.serviceProvider.toString());
        
        if (serviceProvider&&serviceProvider._id) {
          return this.tokenService.generateRefreshToken(serviceProvider._id.toString(),"serviceProvider");
        }
      }

      return false;
    } catch (error) {
      console.error("Error verifying service provider:", error);
      throw new Error("Internal server error while verifying service provider");
    }
  }
}
