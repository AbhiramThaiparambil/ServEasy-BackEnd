import { IUpdateProfile } from "../../../domain/entities/IServiceProvider";

export interface IEditServiceProviderProfileUseCase {
  execute(data: IUpdateProfile): Promise<any>;
}
