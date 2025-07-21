import { Types } from "mongoose";
import { IProviderWallet } from "../../../../../domain/entities/IproviderWallet";

export interface IWithdrawPaymentUseCase {
  execute(serviceProviderId: Types.ObjectId, amount: number): Promise<IProviderWallet | null>;
}