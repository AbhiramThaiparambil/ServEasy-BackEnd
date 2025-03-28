import mongoose from "mongoose";

 export interface IAddress {
    _id:string|mongoose.Types.ObjectId;
  name: string;
  houseName: string;
  pincode: string;
  landmark: string;
  state: string;
  description: string;
  isDefault?: boolean

}