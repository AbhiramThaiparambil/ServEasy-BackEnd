export interface User{
    _id?:string,
    userName:string,
    email?:string,
    phone?:string,
    password:string,
    isVerified:boolean,
    role: string
}

