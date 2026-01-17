import { inject, injectable } from "tsyringe";
import { ServiceProviderRepository } from "../../../infrastructure/repositories/ServiceProviderRepository";
import { IUpdateProfile } from "../../../domain/entities/IServiceProvider";
@injectable()
export class EditServiceProviderProfileUseCase {
  constructor(
    @inject(ServiceProviderRepository)
    private serviceProvider: ServiceProviderRepository
  ) {}
  async execute(data: IUpdateProfile) {
    return await this.serviceProvider.editProvider(data);
  }
}
