import { singleton } from "tsyringe";
import { Server, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import { SaveMessageUseCase } from "../../application/use-case/chat/SaveMessageUseCase";
import { ChatHandler } from "../../application/handlers/ChatHandler";
import { NotificationHandler } from "../../application/handlers/NotificationHandler";
// import { VideoCallHandler } from "../../application/handlers/VideoCallHandler";
import { NotificationUseCase } from "../../application/use-case/notification/NotificationUseCase ";
import {
  IChatNotification,
  ISystemNotification,
  IVideoCallNotification,
} from "../../domain/entities/INotification";
import { VideoCallHandler } from "../../application/handlers/VideoCallHandler";
@singleton()
export class SocketService {
  private io!: Server;

  constructor(
    private saveMessageUseCase: SaveMessageUseCase,
    private notificationUseCase: NotificationUseCase
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
        socket
      );
      new VideoCallHandler(this.io, this).register(socket);

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }

  // Add this method here
  public sendNotificationToUser(
    userId: string,
    notification:
      | IVideoCallNotification
      | IChatNotification
      | ISystemNotification
  ) {
    console.log("----------------------------------------------------");
    console.log("----------------------------------------------------");
    console.log("----------------------------------------------------");
    console.log("----------------------------------------------------");

    console.log(notification);
    console.log("----------------------------------------------------");
    console.log(userId);

    if (!this.io) {
      console.error(
        "SocketService has not been initialized with an HTTP server yet."
      );
      return;
    }
    this.io.to(userId).emit("receive_notification", notification);

    if (notification.type === "chat") {
      const content = `${notification.senderName} sent you a message: "${notification.content}"`;

      // this.notificationUseCase.create(content, userId);
    } else if (notification.type === "notification") {
      this.notificationUseCase.create(notification.content, userId);
    }
  }
}
