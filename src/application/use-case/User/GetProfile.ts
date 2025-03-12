import { inject, injectable } from "tsyringe";
import { MongoUserRepository } from "../../../infrastructure/repositories/UserRepositoriey";
import { UserRepository } from "../../../domain/repositories/IuserRepository";

@injectable()
export class GetUserProfileUseCase {
  constructor(
    @inject(MongoUserRepository) private userRepository: UserRepository
  ) {}
  async execute(userId:string){
   return await this.userRepository.findById(userId)
  }
}






