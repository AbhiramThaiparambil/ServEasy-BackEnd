import { UserRepository } from "../../../../domain/repositories/IuserRepository";
import { inject, injectable } from "tsyringe";
import { IAddress } from "../../../../domain/entities/IAddress";

@injectable()
export class EditAddress {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  async execute(userId: string, newAddress: IAddress): Promise<boolean> {
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
