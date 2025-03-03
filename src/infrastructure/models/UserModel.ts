import mongoose from "mongoose"
import { User } from "../../domain/entities/user"

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String,  unique: true },
    phone: { type: String ,sparse: true},
    password: { type: String, required: true },
    isVerified:{type:Boolean,default:false},
    serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceProvider" },
    isAdmin:{type:Boolean,default:true}
})

export const UserModel= mongoose.model<User & Document> ("User",UserSchema)