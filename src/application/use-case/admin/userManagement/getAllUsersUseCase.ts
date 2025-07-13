import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../../domain/repositories/IuserRepository"; 
import { userSanitizer } from "../../../../utils/sanitizers/userSanitizer";
@injectable()
export class getAllUsersUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}
  async execute(skip:number,limit:number,search:string) {
  const users=await this.userRepository.findUsersSkipLimit(skip,limit,search)
   const count =await this.userRepository.userCount()
  

    

    
   return {users:users.map(userSanitizer),count}
  }
}