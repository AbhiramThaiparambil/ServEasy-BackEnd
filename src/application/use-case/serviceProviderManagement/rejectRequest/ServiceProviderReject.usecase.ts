import { inject, injectable } from "tsyringe";
import { IEmailService } from "../../../../services/mailService/IEmailService";
import { IServiceProviderRepository } from "../../../../domain/repositories/IserviceProviderRepository";
import { IServiceProvider } from "../../../../domain/entities/IServiceProvider";
import {
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
  USE_CASE_TOKENS,
} from "../../../../constants/tokens";

@injectable()
export class ServiceProviderRejectVerify {
  constructor(
    @inject(SERVICE_TOKENS.EmailService) private email: IEmailService,

    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProviderRepository: IServiceProviderRepository
  ) {}
  async rejectServiceProvider(
    userid: string,
    reason: string
  ): Promise<IServiceProvider | null> {
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

  async verifyServiceProvider(
    userid: string
  ): Promise<IServiceProvider | null> {
    return await this.serviceProviderRepository.update(userid, {
      isVerified: "verified",
    });
  }
}
