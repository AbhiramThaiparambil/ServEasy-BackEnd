import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../../domain/repositories/IuserRepository";
import { REPOSITORY_TOKENS } from "../../../../utils/constants/tokens";

@injectable()
export class UpdateUserWithServiceProviderUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(
    userId: string,
    serviceProviderId: string
  ): Promise<boolean | void> {
    try {
      console.log(userId);
      console.log(serviceProviderId);

      return this.userRepository.addServiceProviderId(
        userId,
        serviceProviderId
      );
    } catch (error) {
      console.log(error);
    }
  }
}
