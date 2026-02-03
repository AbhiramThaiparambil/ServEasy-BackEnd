import { IAddress } from "../../../../domain/entities/IAddress";

export interface IEditAddress {
  execute(userId: string, newAddress: IAddress): Promise<boolean>;
}
