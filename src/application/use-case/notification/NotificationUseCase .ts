import { inject, injectable } from "tsyringe";
import { NotificationRepository } from "../../../infrastructure/repositories/NotificationRepository";
import { Types } from "mongoose";

@injectable()
 export class  NotificationUseCase{
   constructor(@inject('NotificationRepository') private NotificationRepository:NotificationRepository){}

    async getNotification(userId:string){
        const notifications= await this.NotificationRepository.findNotificationsByUserId(new Types.ObjectId(userId))
        const unreadedNotification=await this.NotificationRepository.findNotificationsUnreaded(new Types.ObjectId(userId))
        return {notifications,unreadedNotification}
    }

    async markAsRead(id:string){
        return this.NotificationRepository.markNotificationAsRead(new Types.ObjectId(id))
    }

    async create(content:string,id:string){
        return this.NotificationRepository.createNotification({content,userId:new Types.ObjectId(id)})
    }

    async deleteSingleNotification(userId:string){
         this.NotificationRepository.delteSingleNotification(new Types.ObjectId(userId))
         return await this.NotificationRepository.findNotificationsByUserId(new Types.ObjectId(userId))

    }

    async delteAllNotification(userId:string){
      this.NotificationRepository.deleteUserAllNotification(new Types.ObjectId(userId))   
    }

}