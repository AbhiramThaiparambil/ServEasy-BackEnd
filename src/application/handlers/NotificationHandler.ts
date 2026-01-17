import { Socket, Server } from "socket.io";
import {
  IChatNotification,
  ISystemNotification,
  IVideoCallNotification,
} from "../../domain/entities/INotification";
import { ICreateNotificationUseCase } from "../use-case/notification/createNotification/ICreateNotification.usecase";

export class NotificationHandler {
  constructor(
    private notificationUseCase: ICreateNotificationUseCase,
    private io: Server
  ) {}

  public register(socket: Socket) {
    socket.on("join_notification", ({ userId }) => {
      socket.join(userId);
    });

    socket.on("send_notification", ({ userId, notification }) => {
      this.sendNotification(userId, notification);
    });
  }

  private sendNotification(
    userId: string,
    notification:
      | IVideoCallNotification
      | IChatNotification
      | ISystemNotification
  ) {
    this.io.to(userId).emit("receive_notification", notification);
    console.log(notification);
    if (notification.type === "chat") {
      const content = `${notification.senderName} sent you a message: "${notification.content}"`;

      this.notificationUseCase.execute(content, userId);
    } else {
      this.notificationUseCase.execute(notification.content, userId);
    }
  }
}
