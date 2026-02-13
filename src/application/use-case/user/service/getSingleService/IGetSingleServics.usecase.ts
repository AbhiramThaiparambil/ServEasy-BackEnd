import {
  GetSingleServiceRequestDTO,
  GetSingleServiceResponseDTO,
} from "../../../../../application/dtos/user/service/getSingleService/GetSingleServiceDTO";

export interface IGetSingleServiceUseCase {
  execute(data: GetSingleServiceRequestDTO): Promise<GetSingleServiceResponseDTO>;
}
