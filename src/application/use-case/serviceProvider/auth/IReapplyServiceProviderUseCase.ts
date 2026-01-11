import {
  IServiceProvider,
  IServiceProviderRegistration,
} from "../../../../domain/entities/IServiceProvider";

export interface IReapplyServiceProviderUseCase {
  execute(
    serviceProviderData: IServiceProviderRegistration,
    profileImageRow: string | null,
    documentRow: string | null,
    document2Row: string | null
  ): Promise<IServiceProvider>;
}
