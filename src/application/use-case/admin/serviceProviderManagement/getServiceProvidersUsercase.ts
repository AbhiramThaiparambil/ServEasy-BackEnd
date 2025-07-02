import { inject, injectable } from "tsyringe";
import { ServiceProviderRepository } from "../../../../infrastructure/repositories/ServiceProviderRepository"; 
import { IServiceProviderRepository } from "../../../../domain/repositories/IserviceProviderRepository"; 
@injectable()
export class getServiceProvidersUseCase {
  constructor(
    @inject(ServiceProviderRepository) private serviceProviderRepository: IServiceProviderRepository
  ) {}
  async execute(skip:number,limit:number,search:string) {
   const data= await this.serviceProviderRepository.findServiceProviderSkipLimit(skip,limit,search)
  const count = await this.serviceProviderRepository.findServiceProvidersCount()
  return {data,count}
  }
}