import { Types } from "mongoose";
import { INotification } from "../entities/INotification";

export interface INotificationRepository{
    findNotificationsByUserId(userId:Types.ObjectId):Promise<INotification[]|null>
    markNotificationAsRead(id:Types.ObjectId):Promise<void>
    createNotification(notification:{content:string,userId:Types.ObjectId}):Promise<void>
    
}



 