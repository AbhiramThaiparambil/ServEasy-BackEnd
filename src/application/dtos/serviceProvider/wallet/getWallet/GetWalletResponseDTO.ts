export interface WalletTransactionDTO {
  amount: number;
  type: "credit" | "debit";
  status: "none" | "pending" | "success" | "rejected" | "completed" | "failed";
  date: Date;
  description?: string;
  note?: string;
}

export interface GetWalletResponseDTO {
  _id?: string;
  serviceProviderId: string;
  balance: number;
  transactions: WalletTransactionDTO[];
  totalTransactions: number;
}
