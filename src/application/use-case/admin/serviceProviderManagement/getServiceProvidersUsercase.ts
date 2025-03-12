import { inject, injectable } from "tsyringe";
import { ServiceProviderRepository } from "../../../../infrastructure/repositories/ServiceProviderRepository"; 
import { IServiceProviderRepository } from "../../../../domain/repositories/IserviceProviderRepository"; 
@injectable()
export class getServiceProvidersUseCase {
  constructor(
    @inject(ServiceProviderRepository) private serviceProviderRepository: IServiceProviderRepository
  ) {}
  async execute(){
   return await this.serviceProviderRepository.find()
  }
}