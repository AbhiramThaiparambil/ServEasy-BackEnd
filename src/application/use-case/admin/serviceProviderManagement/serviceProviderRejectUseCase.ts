

import { inject, injectable } from "tsyringe";
import { ServiceProviderRepository } from "../../../../infrastructure/repositories/ServiceProviderRepository"; 
import { IServiceProviderRepository } from "../../../../domain/repositories/IserviceProviderRepository"; 
import { EmailOtpService } from "../../../../services/OTP/mailOtp";

@injectable()
export class ServiceProviderRejectVerify {
  constructor(
        @inject("EmailOtpService") private email: EmailOtpService,
    
    @inject(ServiceProviderRepository) private serviceProviderRepository: IServiceProviderRepository
  ) {}
  async rejectServiceProvider(userid:string,reason:string){
   const serviceProvider= await this.serviceProviderRepository.update(userid,{isVerified:'rejected'})
   if(serviceProvider){
    this.email.sendEmail(serviceProvider?.serviceProviderEmail,reason)

   }
   return serviceProvider
}

  async verifyServiceProvider(userid:string){
    return await this.serviceProviderRepository.update(userid,{isVerified:'verified'})
   }

}