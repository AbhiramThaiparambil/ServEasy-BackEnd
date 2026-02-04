import { inject, injectable } from "tsyringe";

import { IEditServiceUseCase } from "./IEditService.usecase";
import { REPOSITORY_TOKENS, SERVICE_TOKENS } from "../../../../../constants/tokens";
import { IServiceRepository } from "../../../../../domain/repositories/IServiceRepository";
import { ICloudinaryService } from "../../../../../services/cloudinary/ICloudinaryService";
import { IService } from "../../../../../domain/entities/IService";

@injectable()
export class EditServiceUseCase implements IEditServiceUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository) private serviceRepository: IServiceRepository,
    @inject(SERVICE_TOKENS.CloudinaryService)
    private cloudinaryService: ICloudinaryService
  ) {}

  async execute(
    serviceId: string,
    serviceData: IService,
    serviceNewImg?: string
  ): Promise<IService | null> {
    try {
      let imgeUrl = "";
      if (
        serviceNewImg &&
        !serviceNewImg?.includes("https://res.cloudinary.com/")
      ) {
        console.log("imge called");

        imgeUrl = await this.cloudinaryService.uploadServiceImg(serviceNewImg);
        serviceData.serviceImage = imgeUrl;
      } else if (serviceNewImg) {
        serviceData.serviceImage = serviceNewImg;
      }
      const updatedService = await this.serviceRepository.updateService(
        serviceId,
        serviceData
      );
      return updatedService;
    } catch (error: any) {
      throw new Error(`Error updating service: ${error.message}`);
    }
  }
}
