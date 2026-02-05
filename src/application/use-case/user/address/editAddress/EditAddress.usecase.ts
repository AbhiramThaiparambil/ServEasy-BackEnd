import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IUserRepository } from "../../../../../domain/repositories/IuserRepository";
import { IAddress } from "../../../../../domain/entities/IAddress";

import { EditAddressRequestDTO } from "../../../../dtos/user/address/AddressDTO";

@injectable()
export class EditAddress {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(data: EditAddressRequestDTO): Promise<boolean> {
    const { userId, address: newAddress } = data;
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User does not exist");

    if (!user.address || user.address.length === 0) {
      throw new Error("No address found to edit");
    }

    user.address = user.address.map((item) =>
      item._id.toString() === newAddress._id ? newAddress : item
    );

    const isUpdated = await this.userRepository.updateUserBasedId(userId, user);
    if (!isUpdated) throw new Error("Failed to update address");

    return true;
  }
}
