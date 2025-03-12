import { inject, injectable } from "tsyringe";
import { MongoUserRepository } from "../../../infrastructure/repositories/UserRepositoriey";
import { UserRepository } from "../../../domain/repositories/userRepository"; 
@injectable()
export class GetAdminProfileUseCase {
  constructor(
    @inject(MongoUserRepository) private userRepository: UserRepository
  ) {}
  async execute(userId:string){
   return await this.userRepository.findById(userId)
  }
}
