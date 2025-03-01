import { User } from "../entities/user";

export interface UserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User|null>;
  findById(id: string): Promise<User|null>;

  findByPhone(phone: string): Promise<User|null>;
  HashPassword(passWord:string):Promise<string>;
  comparePassword(passWord1: string, password2: string): Promise<boolean>;
  updateUser(user: User): Promise<boolean>; // Added updateUser method

}
