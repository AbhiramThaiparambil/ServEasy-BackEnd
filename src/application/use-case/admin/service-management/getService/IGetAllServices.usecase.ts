import { GetServiceListRequestDTO, GetServiceListResponseDTO } from "../../../../dtos/admin/service/GetServiceListDTO";

export interface IGetAllServices {
  execute(data: GetServiceListRequestDTO): Promise<GetServiceListResponseDTO>;
}
