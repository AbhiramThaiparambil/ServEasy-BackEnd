import mongoose, { Schema, Types } from 'mongoose';
import { IProviderWallet, IWalletTransaction } from '../../domain/entities/IproviderWallet';

const WalletTransactionSchema = new Schema<IWalletTransaction>({
  type: { type: String, enum: ['credit', 'debit'], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['none' , 'pending' ,'success' , 'rejected'], default: 'none' },
  refBookingId: { type: Types.ObjectId, ref: 'servicebookings', default: null },
  note: { type: String, default: null },
  date: { type: Date, required: true },
 rejectionReason: { type: String, default: null }
});

const ProviderWalletSchema = new Schema<IProviderWallet>({
  serviceProviderId: { type: Schema.Types.ObjectId, ref: 'serviceproviders', required: true },
  balance: { type: Number, required: true },
  transactions: [WalletTransactionSchema]
});

export const ProviderWalletModel = mongoose.model('ProviderWallet', ProviderWalletSchema);
