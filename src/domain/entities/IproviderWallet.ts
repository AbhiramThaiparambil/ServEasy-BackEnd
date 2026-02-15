import { IBankDetails } from "./IServiceProvider";

export interface IWalletTransaction {
  type: "credit" | "debit";
  amount: number;
  status?: "none" | "pending" | "success" | "rejected";
  refBookingId?: string | null;
  note?: string | null;
  date?: Date;
  rejectionReason?: string;
  _id?: string;
}

export interface IProviderWallet {
  serviceProviderId: string;
  balance: number;
  transactions: IWalletTransaction[];
  bankDetails?: IBankDetails;
}
