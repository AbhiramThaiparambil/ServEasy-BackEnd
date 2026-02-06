import { UploadChatImageRequestDTO } from "../../../../../application/dtos/common/chat/uploadChatMedia/UploadChatImageDTO";

export interface IUploadChatImageUseCase {
  uploadImage(data: UploadChatImageRequestDTO): Promise<string>;
}
