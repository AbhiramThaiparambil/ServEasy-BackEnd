import { inject, singleton } from "tsyringe";
import { Server, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import { SaveMessageUseCase } from "../../application/use-case/chat/saveMessage/SaveMessage.usecase";
import { ChatHandler } from "../../application/handlers/ChatHandler";
import { NotificationHandler } from "../../application/handlers/NotificationHandler";
// import { VideoCallHandler } from "../../application/handlers/VideoCallHandler";

import {
  IChatNotification,
  ISystemNotification,
  IVideoCallNotification,
} from "../../domain/entities/INotification";
import { VideoCallHandler } from "../../application/handlers/VideoCallHandler";
import { ICreateNotificationUseCase } from "../../application/use-case/notification/createNotification/ICreateNotification.usecase";
import { USE_CASE_TOKENS } from "../../constants/tokens";
import { ISaveMessageUseCase } from "../../application/use-case/chat/saveMessage/ISaveMessage.uescase";
@singleton()
export class SocketService {
  private io!: Server;

  constructor(
    @inject(USE_CASE_TOKENS.SaveMessageUseCase)
    private readonly saveMessageUseCase: SaveMessageUseCase,

    @inject(USE_CASE_TOKENS.CreateNotificationUseCase)
    private readonly notificationUseCase: ICreateNotificationUseCase,
  ) {}

  public initialize(server: HTTPServer) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connection", (socket: Socket) => {
      console.log(`User connected: ${socket.id}`);

      new ChatHandler(this.io, this.saveMessageUseCase, this).register(socket);
      new NotificationHandler(this.notificationUseCase, this.io).register(
        socket,
      );
      new VideoCallHandler(this.io, this).register(socket);

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }

  public sendNotificationToUser(
    userId: string,
    notification:
      | IVideoCallNotification
      | IChatNotification
      | ISystemNotification,
  ) {
    console.log(notification);
    console.log(userId);

    if (!this.io) {
      console.error(
        "SocketService has not been initialized with an HTTP server yet.",
      );
      return;
    }
    this.io.to(userId).emit("receive_notification", notification);

    if (notification.type === "chat") {
      const content = `${notification.senderName} sent you a message: "${notification.content}"`;

      // this.notificationUseCase.create(content, userId);
    } else if (notification.type === "notification") {
      this.notificationUseCase.execute(notification.content, userId);
    }
  }
}
