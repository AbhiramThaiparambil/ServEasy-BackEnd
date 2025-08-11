export interface IProviderWalletView {
  profileImage: string;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  description: string;
  experience: string;
  pending:boolean;
  wallet: {
    balance: number;
  };
}