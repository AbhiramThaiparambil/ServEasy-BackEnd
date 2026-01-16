import { injectable, inject } from "tsyringe";

import { ICreateAdUseCase } from "./ICreateAd.usecase";
import { Types } from "mongoose";
import {
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
} from "../../../../constants/tokens";
import { ICloudinaryService } from "../../../../services/cloudinary/ICloudinaryService";
import { IAdRepository } from "../../../../domain/repositories/IAdRepository";
import { IAd } from "../../../../domain/entities/IAd";

@injectable()
export class CreateAdUseCase implements ICreateAdUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AdRepository) private adRepository: IAdRepository,
    @inject(SERVICE_TOKENS.CloudinaryService)
    private cloudinaryService: ICloudinaryService
  ) {}

  async execute(data: IAd): Promise<IAd | null> {
    try {
      if (data.image) {
        const imageUrl = await this.cloudinaryService.uploadAdImage(data.image);
        return await this.adRepository.createAd({
          ...data,
          serviceId: new Types.ObjectId(data.serviceId),
          image: imageUrl,
        });
      } else {
        return await this.adRepository.createAd({
          ...data,
          serviceId: new Types.ObjectId(data.serviceId),
        });
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
