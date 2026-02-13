import { AddAddressRequestDTO } from "../../../../dtos/user/address/AddressDTO";

export interface IAddNewAddress {
  execute(data: AddAddressRequestDTO): Promise<boolean>;
}
