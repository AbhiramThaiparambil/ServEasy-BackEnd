import { UserRepository } from "../../../../domain/repositories/IuserRepository";
import { inject, injectable } from "tsyringe";
import { IAddress } from "../../../../domain/entities/IAddress";

@injectable()
export class GetAddress {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}

  async execute(userId: string): Promise<IAddress[] | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User does not exist");

    return user.address ?user.address:null ; 
  }
}
