import { IServiceProvider } from "../../../../../domain/entities/IServiceProvider";
import { GetRegistrationDetailsRequestDTO } from "../../../../dtos/serviceProvider/auth/ServiceProviderAuthDTO";

export interface IGetServiceProviderRegistrationDetailsUseCase {
  execute(data: GetRegistrationDetailsRequestDTO): Promise<IServiceProvider | null>;
}
