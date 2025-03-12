import mongoose from "mongoose";

export interface User{
  

    _id?:string,
    userName:string,
    email?:string,
    phone?:string,
    password:string,
<<<<<<< HEAD
    googleId?:string,
=======
    profileImage?: string;
>>>>>>> admin
    isVerified:boolean,
    isBlocked?:boolean,
    serviceProvider?: mongoose.Schema.Types.ObjectId; 
<<<<<<< HEAD
    profileImage?:string,
=======
    isAdmin?:boolean;

>>>>>>> admin
}

