export interface IUploadBillsUseCase {
  execute(id: string, images: string[]): Promise<void>;
}