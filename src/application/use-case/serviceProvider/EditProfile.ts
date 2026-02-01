import { inject, injectable } from "tsyringe";
import { IServiceProviderRepository } from "../../../domain/repositories/IserviceProviderRepository";
import { IUpdateProfile } from "../../../domain/entities/IServiceProvider";
import { IEditServiceProviderProfileUseCase } from "./IEditProfile";
import { REPOSITORY_TOKENS } from "../../../constants/tokens";
@injectable()
export class EditServiceProviderProfileUseCase implements IEditServiceProviderProfileUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProvider: IServiceProviderRepository,
  ) {}
  async execute(data: IUpdateProfile) {
    return await this.serviceProvider.editProvider(data);
  }
}
