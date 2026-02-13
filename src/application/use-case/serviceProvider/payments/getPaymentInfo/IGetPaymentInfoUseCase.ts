import { GetPaymentInfoRequestDTO, GetPaymentInfoResponseDTO } from "../../../../dtos/serviceProvider/payment/getPaymentInfo/GetPaymentInfoDTO";

export interface IGetPaymentInfoUseCase {
  execute(data: GetPaymentInfoRequestDTO): Promise<GetPaymentInfoResponseDTO>;
}
