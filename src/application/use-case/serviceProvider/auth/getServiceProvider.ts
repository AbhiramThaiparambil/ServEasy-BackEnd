import { injectable, inject } from "tsyringe";
import { ServiceProviderRepository} from "../../../../infrastructure/repositories/ServiceProviderRepository";
import { IServiceProvider } from "../../../../domain/entities/IServiceProvider";


@injectable()
export class GetServiceProvider {
  constructor(
    @inject(ServiceProviderRepository) private serviceProviderRepository: ServiceProviderRepository,
  ) {}

  async execute(userId:string,):Promise<IServiceProvider>{
     const result = await this.serviceProviderRepository.findByUserID(userId)
     if(!result){
        throw new Error('service providr not exist')
     }
      return result
  }
}
