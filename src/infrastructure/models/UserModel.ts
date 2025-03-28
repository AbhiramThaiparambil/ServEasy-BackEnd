import mongoose from "mongoose"
import { User } from "../../domain/entities/IUser"

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String,  unique: true },
    phone: { type: String ,sparse: true},
    password: { type: String, required: true },
    isVerified:{type:Boolean,default:false},

    role:{type:String,enum:['user','admin','serviceProvider'],default:'user'},
    googleId:{type:String},
    serviceProvider: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceProvider" },
    isAdmin:{type:Boolean,default:false},
    isBlocked:{type:Boolean,default:false},
    address:{type:Array},
    profileImage:{type:String}

})

export const UserModel= mongoose.model<User & Document> ("User",UserSchema)