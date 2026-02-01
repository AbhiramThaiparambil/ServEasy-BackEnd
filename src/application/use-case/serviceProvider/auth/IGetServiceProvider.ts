import { IServiceProvider } from "../../../../domain/entities/IServiceProvider";

export interface IGetServiceProvider {
  execute(userId: string): Promise<IServiceProvider>;
}
