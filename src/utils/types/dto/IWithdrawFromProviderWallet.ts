export interface IWithdrawFromProviderWallet {
  walletId: string;
  transactionId: string;
  newStatus:  "success" | "rejected";
  reason?:"string"
}








