import { Socket, Server } from "socket.io";
import {
  IChatNotification,
  ISystemNotification,
  IVideoCallNotification,
} from "../../domain/entities/INotification";
import { ICreateNotificationUseCase } from "../use-case/common/notification/createNotification/ICreateNotification.usecase";
import { CreateNotificationRequestDTO } from "../../application/dtos/common/notification/createNotification/CreateNotificationDTO";

export class NotificationHandler {
  constructor(
    private notificationUseCase: ICreateNotificationUseCase,
    private io: Server,
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
      | ISystemNotification,
  ) {
    this.io.to(userId).emit("receive_notification", notification);
    console.log(notification);
    if (notification.type === "chat") {
      const content = `${notification.senderName} sent you a message: "${notification.content}"`;

      const dto: CreateNotificationRequestDTO = { content, userId };
      this.notificationUseCase.execute(dto);
    } else {
      const dto: CreateNotificationRequestDTO = {
        content: notification.content,
        userId,
      };
      this.notificationUseCase.execute(dto);
    }
  }
}
