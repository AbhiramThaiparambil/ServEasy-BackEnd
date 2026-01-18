import { IServiceProvider } from "../../../../../domain/entities/IServiceProvider";

export  interface IGetServiceProviderInfoUseCase{
execute(userId: string):Promise<(IServiceProvider & { isProServiceProvider: boolean }) | null>;

}