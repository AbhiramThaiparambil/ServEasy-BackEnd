import { injectable, inject } from "tsyringe";
import { CloudinaryService } from "../../../../services/cloudinary/CloudinaryService";
import { ServiceBookingRepository } from "../../../../infrastructure/repositories/ServiceBookingRepository";
import mongoose from "mongoose";
import { SERVICE_TOKENS } from "../../../../constants/tokens";

@injectable()
export class UploadBills {
  constructor(
    @inject(SERVICE_TOKENS.CloudinaryService)
    private cloudinaryService: CloudinaryService,
    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository
  ) {}

  async execute(id: string, images: string[]): Promise<void> {
    const objId = new mongoose.Types.ObjectId(id);

    const uploadedBills: string[] = [];

    for (const image of images) {
      const uploadedUrl = await this.cloudinaryService.uploadBillsImg(image);
      uploadedBills.push(uploadedUrl);
    }

    await this.serviceBookingRepository.uploadBills(objId, uploadedBills);
  }
}
