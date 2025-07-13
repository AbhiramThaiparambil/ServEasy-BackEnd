import { inject, injectable } from "tsyringe";
import { MongoUserRepository } from "../../../infrastructure/repositories/UserRepositoriey";
import {IUserRepository } from "../../../domain/repositories/IuserRepository";
import { userSanitizer } from "../../../utils/sanitizers/userSanitizer";

@injectable()
export class GetUserProfileUseCase {
  constructor(
    @inject(MongoUserRepository) private userRepository: IUserRepository
  ) {}
  async execute(userId:string){
   const data= await this.userRepository.findById(userId)
   if(!data)return data

   return userSanitizer(data)
  }
}






