import { IServiceProvider } from "../../../../domain/entities/IServiceProvider";
import { ReapplyServiceProviderRequestDTO } from "../../../dtos/serviceProvider/auth/ServiceProviderAuthDTO";

export interface IReapplyServiceProviderUseCase {
  execute(data: ReapplyServiceProviderRequestDTO): Promise<IServiceProvider>;
}
