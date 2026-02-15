import { IAddress } from "./IAddress";

export interface IUser {
  _id?: string;
  userName: string;
  email?: string;
  phone?: string;
  password: string;
  googleId?: string;
  isVerified: boolean;
  isBlocked?: boolean;
  serviceProvider?: string;
  profileImage?: string;
  isAdmin?: boolean;
  address?: IAddress[];
}
