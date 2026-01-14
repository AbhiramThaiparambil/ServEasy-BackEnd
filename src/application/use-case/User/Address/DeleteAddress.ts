import { IUserRepository } from "../../../../domain/repositories/IuserRepository";
import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";

@injectable()
export class DeleteAddress {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string, addressId: string): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User does not exist");

    if (!user.address || user.address.length === 0) {
      throw new Error("No addresses found to delete");
    }

    const updatedAddresses = user.address.filter(
      (item) => item._id.toString() !== addressId
    );

    console.log(updatedAddresses);

    user.address = updatedAddresses.length > 0 ? updatedAddresses : [];

    const isUpdated = await this.userRepository.updateUserBasedId(userId, user);
    if (!isUpdated) throw new Error("Failed to delete address");

    return true;
  }
}
