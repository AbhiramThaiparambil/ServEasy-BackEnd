
import { Types } from "mongoose";
import { INotification } from "../../domain/entities/INotification";
import { INotificationRepository } from "../../domain/repositories/INotificationRepository";
import NotificationModel from "../models/NotificationModel";
import { injectable } from "tsyringe";
@injectable()
export class NotificationRepository implements INotificationRepository {
  async findNotificationsByUserId(
    userId: string
  ): Promise<INotification[] | null> {
    return NotificationModel.find({ userId: userId }).sort({
      notificationTime: -1,
    });
  }
  async markNotificationAsRead(id: string): Promise<void> {
    console.log(await NotificationModel.findOne({_id: id}));
    await NotificationModel.findByIdAndUpdate(
      { _id: id },
      { $set: { read: true } }
    );
  }

  async findNotificationsUnreaded(
    userId: string
  ): Promise<number | null> {
    return NotificationModel.countDocuments({ userId: userId, read: false });
  }

  async createNotification(notification: {
    content: string;
    userId: string;
  }) {
    await NotificationModel.create(notification);
  }

  async delteSingleNotification(id: string): Promise<void> {
    await NotificationModel.deleteOne({ _id: id });
  }

  async deleteUserAllNotification(id: string): Promise<void> {
    await NotificationModel.deleteMany({ userId: id });
  }
}
