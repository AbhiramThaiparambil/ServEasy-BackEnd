import mongoose from "mongoose";

export interface User{
  

    _id?:string,
    userName:string,
    email?:string,
    phone?:string,
    password:string,
    profileImage?: string;
    isVerified:boolean,
    isBlocked?:boolean,
    serviceProvider?: mongoose.Schema.Types.ObjectId; 
    isAdmin?:boolean;

}

