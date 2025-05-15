// import { IService } from "../../domain/entities/IService";
import { Types } from "mongoose";
import { ReviewRepository } from "../../../infrastructure/repositories/ReviewRepository";
import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie"; 
import { inject, injectable } from "tsyringe";
@injectable()
export class GetServics {
  constructor(
    @inject("ServiceRepository") private serviceRepository: ServiceRepository,
    @inject("ReviewRepository") private reviewRepository: ReviewRepository
  ) {}

  async execute(id:String) {
    try {
      const services = await this.serviceRepository.getSingleServiceWithProviderDetails(id+"")
        const review = await this.reviewRepository.findByServiceId(new Types.ObjectId(id+""))
       
       
      return {services,review};
    } catch (error) {
      console.error("Error adding new service:", error);
      throw new Error("Failed to Fetch services");
    }
  }
}
