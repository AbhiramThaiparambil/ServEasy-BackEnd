import { IUser } from "../entities/IUser";
import { Types } from "mongoose";
export interface IUserRepository {
  create(user: IUser | Types.ObjectId): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  find(): Promise<IUser[]>;
  findUsersSkipLimit(
    skip: number,
    limit: number,
    search: string
  ): Promise<IUser[]>;
  findByPhone(phone: string): Promise<IUser | null>;
  HashPassword(passWord: string): Promise<string>;
  comparePassword(passWord1: string, password2: string): Promise<boolean>;
  updateUser(user: IUser): Promise<boolean>;
  addServiceProviderId(
    userId: string,
    serviceProviderId: string
  ): Promise<boolean>;
  userCount(): Promise<number>;
  //  updateUserField(userId: string, field:any, value: any): Promise<boolean>;
  updateUserField<K extends keyof IUser>(
    userId: string,
    field: K,
    value: IUser[K]
  ): Promise<boolean>;
  updatePassword(userId: string, newPassword: string): Promise<boolean>;
  updateUserBasedId(
    userId: string,
    updateData: Partial<IUser>
  ): Promise<boolean>;
}
