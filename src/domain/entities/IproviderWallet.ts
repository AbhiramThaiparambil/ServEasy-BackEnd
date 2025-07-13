import { Types } from "mongoose";

export interface IWalletTransaction {
  type: 'credit' | 'debit';
  amount: number;
  status?: 'none' | 'pending' | 'approved' | 'rejected';
  refBookingId?: Types.ObjectId|null;
  note?: string | null;
  date?: Date;
}

export interface IProviderWallet {
  serviceProviderId: string|Types.ObjectId;
  balance: number;
  transactions: IWalletTransaction[];
}
