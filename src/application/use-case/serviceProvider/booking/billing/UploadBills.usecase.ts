import { injectable, inject } from "tsyringe";
import { CloudinaryService } from "../../../../../services/cloudinary/CloudinaryService";
import { ServiceBookingRepository } from "../../../../../infrastructure/repositories/ServiceBookingRepository";
import mongoose from "mongoose";
import { SERVICE_TOKENS } from "../../../../../constants/tokens";
import { IUploadBillsUseCase } from "./IUploadBills.usecase";
import { UploadBillsRequestDTO } from "../../../../dtos/serviceProvider/booking/billing/UploadBillsRequestDTO";

@injectable()
export class UploadBillsUseCase implements IUploadBillsUseCase {
  constructor(
    @inject(SERVICE_TOKENS.CloudinaryService)
    private cloudinaryService: CloudinaryService,
    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository
  ) {}

  async execute(data: UploadBillsRequestDTO): Promise<void> {
    const objId = new mongoose.Types.ObjectId(data.bookingId);

    const uploadedBills: string[] = [];

    for (const image of data.images) {
      const uploadedUrl = await this.cloudinaryService.uploadBillsImg(image);
      uploadedBills.push(uploadedUrl);
    }

    await this.serviceBookingRepository.uploadBills(objId, uploadedBills);
  }
}
