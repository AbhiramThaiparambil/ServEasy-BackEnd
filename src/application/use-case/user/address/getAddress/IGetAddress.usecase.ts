import { GetAddressRequestDTO } from "../../../../dtos/user/address/AddressDTO";
import { IAddress } from "../../../../../domain/entities/IAddress";

export interface IGetAddress {
  execute(data: GetAddressRequestDTO): Promise<IAddress[] | null>;
}
