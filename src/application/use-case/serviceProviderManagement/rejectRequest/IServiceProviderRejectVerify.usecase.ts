import { IServiceProvider } from "../../../../../domain/entities/IServiceProvider";

export interface IServiceProviderRejectVerify {
  rejectServiceProvider(
    userid: string,
    reason: string
  ): Promise<IServiceProvider | null>;

  verifyServiceProvider(userid: string): Promise<IServiceProvider | null>;
}
