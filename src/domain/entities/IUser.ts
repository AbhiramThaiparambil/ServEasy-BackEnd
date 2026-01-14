import mongoose from "mongoose";
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
  serviceProvider?: mongoose.Schema.Types.ObjectId;
  profileImage?: string;
  isAdmin?: boolean;
  address?: IAddress[];
}
