import { DeleteAddressRequestDTO } from "../../../../dtos/user/address/AddressDTO";

export interface IDeleteAddress {
  execute(data: DeleteAddressRequestDTO): Promise<boolean>;
}
