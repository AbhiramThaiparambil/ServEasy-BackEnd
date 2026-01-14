import { IUserRepository } from "../../../../domain/repositories/IuserRepository";
import { inject, injectable } from "tsyringe";
import { IAddress } from "../../../../domain/entities/IAddress";
import { ObjectId } from "mongodb";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
@injectable()
export class AddNewAddress {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string, newAddress: IAddress): Promise<boolean> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new Error("User does not exist");
    newAddress._id = new ObjectId();

    user.address = user.address ? [...user.address, newAddress] : [newAddress];

    const isUpdated = await this.userRepository.updateUserBasedId(userId, user);
    console.log(isUpdated);

    if (!isUpdated) throw new Error("Failed to add new address");

    return true;
  }
}
