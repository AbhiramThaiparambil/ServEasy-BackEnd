export interface IProviderWalletView {
 _id:string;
  profileImage: string;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  description: string;
  experience: string;
  pending:boolean;
  isSubscribedProvider:boolean
  wallet: {
    balance: number;
  };
}