import { inject, injectable } from "tsyringe";
import { MongoUserRepository } from "../../../../infrastructure/repositories/UserRepositoriey";
import { UserRepository } from "../../../../domain/repositories/IuserRepository"; 
@injectable()
export class getAllUsersUseCase {
  constructor(
    @inject(MongoUserRepository) private userRepository: UserRepository
  ) {}
  async execute(skip:number,limit:number,search:string) {
  const users=await this.userRepository.findUsersSkipLimit(skip,limit,search)
   const count =await this.userRepository.userCount()

   return {users,count}
  }
}