import { injectable, inject } from "tsyringe";

import { IAd } from "../../../domain/entities/IAd";
import { IAdRepository } from "../../../domain/repositories/IAdRepository";
import { ICreateAdUseCase } from "./ICreateAdUseCase";
import {
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
} from "../../../utils/constants/tokens";
import { Types } from "mongoose";
import { CloudinaryService } from "../../../services/cloudinary/cloudinary";

@injectable()
export class CreateAdUseCase implements ICreateAdUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AdRepository) private adRepository: IAdRepository,
    @inject(SERVICE_TOKENS.CloudinaryService)
    private cloudinaryService: CloudinaryService
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
