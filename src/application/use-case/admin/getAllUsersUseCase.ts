import { inject, injectable } from "tsyringe";
import { MongoUserRepository } from "../../../infrastructure/repositories/UserRepositoriey";
import { UserRepository } from "../../../domain/repositories/userRepository"; 
@injectable()
export class getAllUsersUseCase {
  constructor(
    @inject(MongoUserRepository) private userRepository: UserRepository
  ) {}
  async execute(){
   return await this.userRepository.find()
  }
}