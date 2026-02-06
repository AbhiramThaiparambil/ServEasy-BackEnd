import { inject, injectable } from "tsyringe";
import { CloudinaryService } from "../../../../../services/cloudinary/CloudinaryService";
import { SERVICE_TOKENS } from "../../../../../constants/tokens";
import { IUploadChatImageUseCase } from "./IUploadChatImage.usecase";
import { UploadChatImageRequestDTO } from "../../../../../application/dtos/common/chat/uploadChatMedia/UploadChatImageDTO";

@injectable()
export class UploadChatImageUseCase implements IUploadChatImageUseCase {
  constructor(
    @inject(SERVICE_TOKENS.CloudinaryService)
    private cloudinaryService: CloudinaryService
  ) {}
  async uploadImage(data: UploadChatImageRequestDTO): Promise<string> {
    const { image } = data;
    try {
      const result = await this.cloudinaryService.uploadChatImage(image);
      return result;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  }
}
