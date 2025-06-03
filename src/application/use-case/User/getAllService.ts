import { UserRepository } from "../../../domain/repositories/IuserRepository";
import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie"; 
import { inject, injectable } from "tsyringe";
@injectable()
export class GetAllActiveService {
  constructor(
    @inject("ServiceRepository") private serviceRepository: ServiceRepository,    @inject("UserRepository") private userRepository: UserRepository
  ) {}


async getNearByservices(userLongitude:number,userLatitude:number,userId?:string|null){
  try {

  


  if(userId){
    const user = await this.userRepository.findById(userId);
     if(user?.serviceProvider){
  const allServices = await this.serviceRepository.findNearestServices(userLongitude,userLatitude,user.serviceProvider+"");
   console.log(allServices[0])
   const categories=await this.serviceRepository.findNearestActiveServiceCategories(userLongitude,userLatitude)

    return {allServices,categories};
     }else{
        const allServices = await this.serviceRepository.findNearestServices(userLongitude,userLatitude);
   const categories=await this.serviceRepository.findNearestActiveServiceCategories(userLongitude,userLatitude)


        return {allServices,categories};
     }

     
  }

  
  } catch (error) {
    console.error("Error adding new service:", error);
    throw new Error("Failed to add new service");
  }
}



  async execute(userId?:string|null) {
    try {
      if(userId){

      }


      const categories=await this.serviceRepository.findActiveServiceCategories()
      const allServices = await this.serviceRepository.findAllActiveServicesUser();
      return {allServices,categories};
    } catch (error) {
      console.error("Error adding new service:", error);
      throw new Error("Failed to add new service");
    }
  }

}
