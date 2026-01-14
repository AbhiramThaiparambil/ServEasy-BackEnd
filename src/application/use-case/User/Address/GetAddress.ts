import { IUserRepository } from "../../../../domain/repositories/IuserRepository";
import { inject, injectable } from "tsyringe";
import { IAddress } from "../../../../domain/entities/IAddress";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";

@injectable()
export class GetAddress {
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
