import { inject, injectable } from "tsyringe";
import { SERVICE_TOKENS } from "../../../../../constants/tokens";
import { ServiceProviderRepository } from "../../../../../infrastructure/repositories/ServiceProviderRepository";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";
import { IEmailService } from "../../../../../services/mailService/IEmailService";

@injectable()
export class ServiceProviderRejectVerify {
  constructor(
    @inject(SERVICE_TOKENS.EmailService) private email: IEmailService,

    @inject(ServiceProviderRepository)
    private serviceProviderRepository: IServiceProviderRepository
  ) {}
  async rejectServiceProvider(userid: string, reason: string) {
    const serviceProvider = await this.serviceProviderRepository.update(
      userid,
      { isVerified: "rejected" }
    );
    if (serviceProvider) {
      this.email.sendProviderRejectedEmail(
        serviceProvider?.serviceProviderEmail,
        "",
        reason
      );
    }
    return serviceProvider;
  }

  async verifyServiceProvider(userid: string) {
    return await this.serviceProviderRepository.update(userid, {
      isVerified: "verified",
    });
  }
}
