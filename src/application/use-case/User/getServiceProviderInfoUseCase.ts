import { inject, injectable } from "tsyringe";
import { ServiceProviderRepository } from "../../../infrastructure/repositories/ServiceProviderRepository";

@injectable()
export class GetServiceProviderInfoUseCase {
  constructor(
    @inject(ServiceProviderRepository) private serviceProviderRepository: ServiceProviderRepository
  ) {}
  async execute(userId:string){
    const data =  await this.serviceProviderRepository.findByUserID(userId)
console.log(data)
    return data
  }
}





