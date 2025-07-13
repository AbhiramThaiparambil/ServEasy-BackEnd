import { User } from "../../domain/entities/IUser";
import { IUserRepository } from "../../domain/repositories/IuserRepository";
import { UserModel } from "../models/UserModel";
import { injectable } from "tsyringe";
import { hash, compare } from "bcrypt";
@injectable()
export class MongoUserRepository implements IUserRepository {
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

  async comparePassword(
    passWord1: string,
    password2: string
  ): Promise<boolean> {
    return await compare(passWord1, password2);
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
      console.error("Error updating user:", error);
      return false;
    }
  }
  async findById(id: string): Promise<User | null> {
    return UserModel.findById(id);
  }

  async addServiceProviderId(
    userId: string,
    serviceProviderId: string
  ): Promise<boolean> {
    try {
      const result = await UserModel.findByIdAndUpdate(
        userId,
        { serviceProvider: serviceProviderId }, // Store serviceProvider ID in user document
        { new: true }
      );
      console.log(result);
      return result !== null;
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    }
  }

  async find(): Promise<User[]> {
    return await UserModel.find();
  }

  async updateUserField<K extends keyof User>(
    userId: string,
    field: K,
    value: User[K]
  ): Promise<boolean> {
    try {
      const result = await UserModel.findByIdAndUpdate(
        userId,
        { [field]: value },
        { new: true }
      );
      return result !== null;
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    }
  }
  async updatePassword(userId: string, newPassword: string): Promise<boolean> {
    const result = await UserModel.updateOne(
      { _id: userId },
      { $set: { password: newPassword } }
    );

    return result.modifiedCount > 0;
  }

  async updateUserBasedId(
    userId: string,
    updateData: Partial<User>
  ): Promise<boolean> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true } // Return updated document
      );

      return !!updatedUser; // Return true if update successful, false otherwise
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    }
  }

  // async addAddress(userId:String,address:IAddress){
  //   user
  // }

  async findUsersSkipLimit(skip: number, limit: number,search:string): Promise<User[]> {
    return await UserModel.find({
      $or: [
        { userName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ]
    }).skip(skip).limit(limit);
  }

  async userCount(): Promise<number> {
    return UserModel.countDocuments();
  }
}
