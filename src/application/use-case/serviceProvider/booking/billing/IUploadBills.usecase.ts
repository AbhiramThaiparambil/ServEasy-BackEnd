import { UploadBillsRequestDTO } from "../../../../dtos/serviceProvider/booking/billing/UploadBillsRequestDTO";

export interface IUploadBillsUseCase {
  execute(data: UploadBillsRequestDTO): Promise<void>;
}