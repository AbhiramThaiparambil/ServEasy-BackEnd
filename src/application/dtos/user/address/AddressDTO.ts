import { IAddress } from "../../../../domain/entities/IAddress";

export interface AddAddressRequestDTO {
  userId: string;
  address: IAddress;
}

export interface EditAddressRequestDTO {
  userId: string;
  address: IAddress;
}

export interface GetAddressRequestDTO {
  userId: string;
}

export interface DeleteAddressRequestDTO {
  userId: string;
  addressId: string;
}
