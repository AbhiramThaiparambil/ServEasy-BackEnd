import mongoose from "mongoose";
import { IUser } from "../../domain/entities/IUser";


const AddressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  houseName: { type: String, required: true },
  pincode: { type: String, required: true },
  landmark: { type: String },
  state: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String },
});






const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, unique: true },
  phone: { type: String, sparse: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ["user", "admin", "serviceProvider"],
    default: "user",
  },
  googleId: { type: String },
  serviceProvider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceProvider",
  },
  isAdmin: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  address: [AddressSchema],
  profileImage: { type: String },
});

export const UserModel = mongoose.model<IUser & Document>("User", UserSchema);
