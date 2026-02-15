import { injectable, inject } from "tsyringe";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";
import { IUploadBillsUseCase } from "./IUploadBills.usecase";
import { REPOSITORY_TOKENS, SERVICE_TOKENS } from "../../../../../constants/tokens";
import { UploadBillsRequestDTO } from "../../../../dtos/serviceProvider/booking/billing/UploadBillsRequestDTO";
import { ICloudinaryService } from "../../../../../services/cloudinary/ICloudinaryService";

@injectable()
export class UploadBillsUseCase implements IUploadBillsUseCase {
  constructor(
    @inject(SERVICE_TOKENS.CloudinaryService)
    private cloudinaryService: ICloudinaryService,
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBookingRepository: IServiceBookingRepository
  ) {}

  async execute(data: UploadBillsRequestDTO): Promise<void> {
    const uploadedBills: string[] = [];

    for (const image of data.images) {
      const uploadedUrl = await this.cloudinaryService.uploadBillsImg(image);
      uploadedBills.push(uploadedUrl);
    }

    await this.serviceBookingRepository.uploadBills(data.bookingId, uploadedBills);
  }
}
