import { inject, injectable } from "tsyringe";
import { CloudinaryService } from "../../../services/cloudinary/CloudinaryService";
import { SERVICE_TOKENS } from "../../../constants/tokens";
@injectable()
export class UploadImageUseCase {
  constructor(
    @inject(SERVICE_TOKENS.CloudinaryService)
    private cloudinaryService: CloudinaryService
  ) {}
  async uploadImage(img: string): Promise<string> {
    try {
      const result = await this.cloudinaryService.uploadChatImage(img);
      return result;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  }
}
