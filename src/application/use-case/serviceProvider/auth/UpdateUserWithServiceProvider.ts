import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../../domain/repositories/IuserRepository";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { UpdateUserWithProviderRequestDTO } from "../../../dtos/serviceProvider/auth/ServiceProviderAuthDTO";

@injectable()
export class UpdateUserWithServiceProviderUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(
    data: UpdateUserWithProviderRequestDTO
  ): Promise<boolean | void> {
    try {
      console.log(data.userId);
      console.log(data.serviceProviderId);

      return this.userRepository.addServiceProviderId(
        data.userId,
        data.serviceProviderId
      );
    } catch (error) {
      console.log(error);
    }
  }
}
