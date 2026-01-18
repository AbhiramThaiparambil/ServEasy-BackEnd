import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IAddress } from "../../../../../domain/entities/IAddress";
import { IUserRepository } from "../../../../../domain/repositories/IuserRepository";
import { IGetAddress } from "./IGetAddress.usecase";

@injectable()
export class GetAddress implements IGetAddress {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<IAddress[] | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User does not exist");

    return user.address ? user.address : null;
  }
}
