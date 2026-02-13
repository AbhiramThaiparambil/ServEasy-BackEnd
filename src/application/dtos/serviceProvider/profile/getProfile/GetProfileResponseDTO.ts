import { ISubscription } from "../../../../../domain/entities/ISubscription";


export interface GetProfileResponseDTO {

   _id:string,
      serviceProviderName: string,
      serviceProviderEmail: string,
      serviceProviderPhone: string,
       userId:string,
       description:string,
      profileImage: string,
      isBlocked:boolean,
        isProServiceProvider: boolean;
        subscriptions?: ISubscription[];
        bankDetails?: BankDetails;

}

// export interface GetProfileResponseDTO {
//   _id: string;
//   serviceProviderName: string;
//   serviceProviderEmail: string;
//   serviceProviderPhone: string;
//   description: string;
//   socialMedia: string;
//   services: string[];
//   skills: string[];
//   location: {
//     type?: string;
//     coordinates?: [number, number];
//     address?: string;
//   };

//   experience: number;
//   profileImage: string;
//   document?: string[];
//   isVerified: 'verified' | 'pending' | 'rejected';
//   userId: string;
//   isBlocked: boolean;
//   createdAt: string;
//   updatedAt: string;
//   isProServiceProvider: boolean;
//   bankDetails?: BankDetails;
// }

export interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
}
