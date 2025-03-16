import { User } from "../entities/IUser";

export interface UserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User|null>;
  findById(id: string): Promise<User|null>;
  find():Promise<User[]>;
  findByPhone(phone: string): Promise<User|null>;
  HashPassword(passWord:string):Promise<string>;
  comparePassword(passWord1: string, password2: string): Promise<boolean>;
  updateUser(user: User): Promise<boolean>;
 addServiceProviderId(userId: string, serviceProviderId: string): Promise<boolean>;

//  updateUserField(userId: string, field:any, value: any): Promise<boolean>;
updateUserField<K extends keyof User>(userId: string, field: K, value: User[K]): Promise<boolean>;
updatePassword(userId:string,newPassword:string):Promise<boolean>;
updateUserBasedId(userId: string, updateData: Partial<User>): Promise<boolean>
  
}