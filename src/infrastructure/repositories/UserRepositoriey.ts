import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/userRepository";
import { UserModel } from "../models/UserModel";
import {injectable} from "tsyringe"

@injectable()
export class MongoUserRepository implements UserRepository{
 
    async create(user: User): Promise<User> {
      const newUser= new UserModel(user);
      await newUser.save();
      return newUser      
    }
 
    async findByEmail(email: string): Promise<User | null> {
        return UserModel.findOne({ email });
      }
    
      async findByPhone(phone: string): Promise<User | null> {
        return UserModel.findOne({ phone });
      }
}