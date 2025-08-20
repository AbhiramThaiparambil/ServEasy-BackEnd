import { injectable, inject } from "tsyringe";
import { ServiceProviderRepository} from "../../../../infrastructure/repositories/ServiceProviderRepository";
import { IServiceProvider } from "../../../../domain/entities/IServiceProvider";
import { IServiceProviderRepository } from "../../../../domain/repositories/IserviceProviderRepository";


@injectable()
export class GetServiceProvider {
  constructor(
    @inject(ServiceProviderRepository) private serviceProviderRepository: IServiceProviderRepository,
  ) {}

  async execute(userId:string,):Promise<IServiceProvider>{
     const result = await this.serviceProviderRepository.findByUserID(userId)
      console.log(result);
     if(!result){
        throw new Error('service providr not exist')
     }
      return result
  }
}
