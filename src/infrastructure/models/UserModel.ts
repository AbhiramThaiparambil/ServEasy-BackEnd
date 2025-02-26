import mongoose from "mongoose"
import { User } from "../../domain/entities/user"

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String,  unique: true },
    phone: { type: String ,sparse: true},
    password: { type: String, required: true },
    isVerified:{type:Boolean,default:false},
    role:{type:String,enum:['user','admin','serviceProvider'],default:'user'}

})

export const UserModel= mongoose.model<User & Document> ("User",UserSchema)