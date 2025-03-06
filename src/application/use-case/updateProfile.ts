import { injectable, inject } from "tsyringe";
import { CloudinaryService } from "../../services/cloudinary/cloudinary"; 
import { MongoUserRepository } from "../../infrastructure/repositories/UserRepositoriey";
import { UserRepository } from "../../domain/repositories/userRepository";



@injectable()
export class UserProfileUpdate {
  constructor(
    @inject(MongoUserRepository) private userRepository: UserRepository,
    @inject("CloudinaryService") private cloudinaryService: CloudinaryService 
  ) {}

  async execute(userId:string, profileImageRow: string,):Promise<boolean>{
          const profile = await this.cloudinaryService.uploadUserProfile(profileImageRow);
          console.log(profile);
          
   const result= await this.userRepository.updateUserField(userId,"profileImage",profile)
     return result
  }
}
