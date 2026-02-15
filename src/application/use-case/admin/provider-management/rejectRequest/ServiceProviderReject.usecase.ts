import { inject, injectable } from "tsyringe";
import { IEmailService } from "../../../../../services/mailService/IEmailService";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";
import { ProviderResponseDTO } from "../../../../dtos/admin/provider/ProviderResponseDTO";
import { RejectProviderDTO } from "../../../../dtos/admin/provider/RejectProviderDTO";
import { VerifyProviderDTO } from "../../../../dtos/admin/provider/VerifyProviderDTO";
import {
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
} from "../../../../../constants/tokens";

import { IServiceProviderRejectVerify } from "./IServiceProviderReject.usecase";

@injectable()
export class ServiceProviderRejectVerify implements IServiceProviderRejectVerify {
  constructor(
    @inject(SERVICE_TOKENS.EmailService) private email: IEmailService,

    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProviderRepository: IServiceProviderRepository
  ) {}
  async rejectServiceProvider(
    data: RejectProviderDTO
  ): Promise<ProviderResponseDTO | null> {
    const serviceProvider = await this.serviceProviderRepository.update(
      data.providerId,
      { isVerified: "rejected" }
    );
    if (serviceProvider) {
      this.email.sendProviderRejectedEmail(
        serviceProvider?.serviceProviderEmail,
        "",
        data.reason
      );
    }
    return serviceProvider as ProviderResponseDTO | null;
  }

  async verifyServiceProvider(
    data: VerifyProviderDTO
  ): Promise<ProviderResponseDTO | null> {
    const result = await this.serviceProviderRepository.update(data.providerId, {
      isVerified: "verified",
    });
    return result as ProviderResponseDTO | null;
  }
}
