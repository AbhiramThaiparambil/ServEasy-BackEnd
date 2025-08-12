import { Types } from 'mongoose';

export interface IWalletTransaction {
  type: 'credit' | 'debit';
  amount: number;
  status?: 'none' | 'pending' | 'success' | 'rejected';
  refBookingId?: Types.ObjectId | null;
  note?: string | null;
  date?: Date;
  rejectionReason?: string;
  _id?: string;
}

export interface IProviderWallet {
  serviceProviderId: string | Types.ObjectId;
  balance: number;
  transactions: IWalletTransaction[];
}
