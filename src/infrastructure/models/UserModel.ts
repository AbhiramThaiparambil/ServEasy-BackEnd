import mongoose from "mongoose"
import { User } from "../../domain/entities/user"

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String,  unique: true },
    phone: { type: String, unique: true },
    password: { type: String, required: true },
})

export const UserModel= mongoose.model<User & Document> ("User",UserSchema)