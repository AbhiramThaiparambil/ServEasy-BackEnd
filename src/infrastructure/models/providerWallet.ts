import mongoose, { Schema, Types } from 'mongoose';

const WalletTransactionSchema = new Schema({
  type: { type: String, enum: ['credit', 'debit'], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['none', 'pending', 'approved', 'rejected'], default: 'none' },
  refBookingId: { type: Types.ObjectId, ref: 'servicebookings', default: null },
  note: { type: String, default: null },
  date: { type: Date, required: true }
});

const ProviderWalletSchema = new Schema({
  serviceProviderId: { type: Types.ObjectId, ref: 'serviceproviders', required: true },
  balance: { type: Number, required: true },
  transactions: [WalletTransactionSchema]
});

export const ProviderWalletModel = mongoose.model('ProviderWallet', ProviderWalletSchema);
