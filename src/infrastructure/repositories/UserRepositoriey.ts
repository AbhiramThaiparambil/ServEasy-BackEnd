import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/userRepository";
import { UserModel } from "../models/UserModel";
import { injectable } from "tsyringe";
import { hash, compare } from "bcrypt";
@injectable()
export class MongoUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email });
  }

  async findByPhone(phone: string): Promise<User | null> {
    return UserModel.findOne({ phone });
  }

  async HashPassword(passWord: string): Promise<string> {
    return await hash(passWord, 10);
  }

  async comparePassword(passWord1: string, password2: string): Promise<boolean> {
    
    return await compare(passWord1,password2);
  }

  async updateUser(user: User): Promise<boolean> {
    try {
      const result = await UserModel.findByIdAndUpdate(
        user._id, 
        { isVerified: user.isVerified }, 
        { new: true } 
      );
      return result !== null; 
    } catch (error) {
      console.error('Error updating user:', error);
      return false; 
    }
  }
  async findById(id: string):Promise<User|null>{
      
    return UserModel.findById(id)
  }

}
