import { IService } from "../../../domain/entities/IService";
import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie";
import { CloudinaryService } from "../../../services/cloudinary/Cloudinary";
import { inject, injectable } from "tsyringe";
@injectable()
export class GetService {
  constructor(
    @inject("ServiceRepository") private serviceRepository: ServiceRepository
  ) {}

  async execute(id: string) {
    try {
      const allServices = await this.serviceRepository.findAllServiceProviderId(
        id
      );

      return allServices;
    } catch (error) {
      console.error("Error adding new service:", error);
      throw new Error("Failed to add new service");
    }
  }
}
