export interface IUploadChatImageUseCase {
  uploadImage(img: string): Promise<string>;
}
