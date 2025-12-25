import { injectable, inject } from "tsyringe";
import { CloudinaryService } from "../../../../services/cloudinary/cloudinary";
import { ServiceBookingRepository } from "../../../../infrastructure/repositories/ServiceBookingRepository";
import mongoose from "mongoose";

@injectable()
export class UploadBills {
  constructor(
    @inject("CloudinaryService") private cloudinaryService: CloudinaryService,
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
