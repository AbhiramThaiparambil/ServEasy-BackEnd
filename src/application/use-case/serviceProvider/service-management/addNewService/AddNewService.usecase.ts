
import { inject, injectable } from "tsyringe";
import { IAddNewServiceUseCase } from "./IAddNewService.usecase";
import { REPOSITORY_TOKENS, SERVICE_TOKENS } from "../../../../../constants/tokens";
import { ICloudinaryService } from "../../../../../services/cloudinary/ICloudinaryService";
import { IServiceRepository } from "../../../../../domain/repositories/IServiceRepository";

import { AddNewServiceRequestDTO } from "../../../../dtos/serviceProvider/service-management/addNewService/AddNewServiceRequestDTO";
import { getErrorMessage } from "../../../../../utils/errorUtils";


@injectable()
export class AddNewServiceUseCase implements IAddNewServiceUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository) private serviceRepository: IServiceRepository,
    @inject(SERVICE_TOKENS.CloudinaryService)
    private cloudinaryService: ICloudinaryService
  ) {}

  async execute(service: AddNewServiceRequestDTO) {
    try {
      const img_url = await this.cloudinaryService.uploadServiceImg(
        service.serviceImage
      );
      service.serviceImage = img_url;

      const createdService = await this.serviceRepository.create(service);

      const allServices = await this.serviceRepository.findAllServiceProviderId(
        createdService.serviceProviderId
      );
      console.log(allServices);
      return allServices;
    } catch (error: unknown) {
      console.error("Error adding new service:", getErrorMessage(error));
      throw new Error("Failed to add new service");
    }
  }
}
