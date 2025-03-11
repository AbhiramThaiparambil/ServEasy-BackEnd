export interface User{
    _id?:string,
    userName:string,
    email?:string,
    phone?:string,
    password:string,
    googleId?:string,
    isVerified:boolean,
    role: string,
    profileImage?:string,
}

