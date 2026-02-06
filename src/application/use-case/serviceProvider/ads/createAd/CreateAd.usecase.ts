import { injectable, inject } from "tsyringe";

import { ICreateAdUseCase } from "./ICreateAd.usecase";
import { Types } from "mongoose";
import {
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
} from "../../../../../constants/tokens";
import { IAdRepository } from "../../../../../domain/repositories/IAdRepository";
import { ICloudinaryService } from "../../../../../services/cloudinary/ICloudinaryService";
import { IAd } from "../../../../../domain/entities/IAd";

import { CreateAdRequestDTO } from "../../../../dtos/serviceProvider/ads/createAd/CreateAdRequestDTO";

@injectable()
export class CreateAdUseCase implements ICreateAdUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AdRepository) private adRepository: IAdRepository,
    @inject(SERVICE_TOKENS.CloudinaryService)
    private cloudinaryService: ICloudinaryService
  ) {}

  async execute(data: CreateAdRequestDTO): Promise<IAd | null> {
    try {
      // Map DTO to IAd structure partial where necessary or pass directly if compatible.
      // DTO has same structure minus _id, created_at etc which are generated.
      // The repository expects IAd, so we construct it.
      
      const adData: Partial<IAd> = {
          ...data,
          serviceId: new Types.ObjectId(data.serviceId),
          providerId: new Types.ObjectId(data.providerId),
          status: data.status as any,
      };

      if (data.image) {
        const imageUrl = await this.cloudinaryService.uploadAdImage(data.image);
        return await this.adRepository.createAd({
          ...adData,
          image: imageUrl,
        } as IAd);
      } else {
        return await this.adRepository.createAd(adData as IAd);
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
