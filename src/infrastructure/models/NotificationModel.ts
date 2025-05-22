import mongoose, { isObjectIdOrHexString } from "mongoose"
import { Types } from "mongoose"
import { INotification } from "../../domain/entities/INotification"

const notificationSchema =new  mongoose.Schema<INotification>({
    content:{type:String ,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"Users",required:true},
    notificationTime:{type:Date,default:Date.now()},
    read:{type:Boolean,default:false}
    
}) 

export default mongoose.model<INotification>("notification",notificationSchema)

