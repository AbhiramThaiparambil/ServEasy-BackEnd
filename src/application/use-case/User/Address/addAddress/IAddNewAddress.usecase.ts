import { IAddress } from "../../../../../domain/entities/IAddress";

export interface IAddNewAddress {
  execute(userId: string, newAddress: IAddress): Promise<boolean>;
}
