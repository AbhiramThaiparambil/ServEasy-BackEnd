import { Types } from "mongoose";
import { INotification } from "../../domain/entities/INotification";
import { INotificationRepository } from "../../domain/repositories/INotificationRepository";
import NotificationModel from "../models/NotificationModel";
import { injectable } from "tsyringe";
@injectable()
export class NotificationRepository implements INotificationRepository {
  async findNotificationsByUserId(
    userId: Types.ObjectId
  ): Promise<INotification[] | null> {
    return NotificationModel.find({ userId: userId }).sort({notificationTime:-1})
  }
  async markNotificationAsRead(id: Types.ObjectId): Promise<void> {
    await NotificationModel.findByIdAndUpdate(
      { _id: id },
      { $set: { read: true } }
    );
  }

  async findNotificationsUnreaded(
    userId: Types.ObjectId
  ): Promise<number | null> {
    return NotificationModel.countDocuments({ userId: userId, read: false });
}



  async createNotification(notification: {
    content: string;
    userId: Types.ObjectId;
  }) {
    await NotificationModel.create(notification);
  }

  async delteSingleNotification(id: Types.ObjectId): Promise<void> {
    await NotificationModel.deleteOne({ _id: id });
  }

  async deleteUserAllNotification(id: Types.ObjectId): Promise<void> {
    await NotificationModel.deleteMany({ userId: id });
  }
}
