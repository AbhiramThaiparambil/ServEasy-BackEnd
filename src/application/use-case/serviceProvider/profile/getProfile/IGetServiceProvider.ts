import { GetProfileRequestDTO } from "../../../../dtos/serviceProvider/profile/getProfile/GetProfileRequestDTO";
import { GetProfileResponseDTO } from "../../../../dtos/serviceProvider/profile/getProfile/GetProfileResponseDTO";

export interface IGetServiceProvider {
  execute(data: GetProfileRequestDTO): Promise<GetProfileResponseDTO>;
}
