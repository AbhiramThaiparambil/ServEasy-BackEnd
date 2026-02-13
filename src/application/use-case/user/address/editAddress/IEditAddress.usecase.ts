import { EditAddressRequestDTO } from "../../../../dtos/user/address/AddressDTO";

export interface IEditAddress {
  execute(data: EditAddressRequestDTO): Promise<boolean>;
}
