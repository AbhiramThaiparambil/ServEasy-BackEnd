// import { container, singleton } from "tsyringe";
// import { Server, Socket } from "socket.io";
// import { Server as HTTPServer } from "http";
// import { SaveMessageUseCase } from "../../application/use-case/chat/SaveMessageUseCase";
// import { IMessage } from "../../domain/entities/IChat";

// @singleton()
// export class SocketService {
//   private io!: Server;

//   constructor() {}

//   public initialize(server: HTTPServer) {
//     this.io = new Server(server, {
//       cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//       },
//     });

//     this.setupListeners();
//   }

//   private setupListeners() {
//     this.io.on("connection", (socket: Socket) => {
//       console.log(`User connected: ${socket.id}`);
//       const saveMessageUseCase = container.resolve(SaveMessageUseCase);

//       socket.on(
//         "join_chat",
//         ({
//           senderId,
//           serviceProviderId,
//         }: {
//           senderId: string;
//           serviceProviderId: string;
//         }) => {
//           console.log("SENDERID    " + senderId);
//           console.log("SERVICEPROVIDER    " + serviceProviderId);

//           const roomId = this.createRoomId(senderId, serviceProviderId);
//           console.log("ROOM ID " + roomId);

//           socket.join(roomId);
//           socket.to(roomId).emit("serviceProvider_online", () => {});
//           socket.to(roomId).emit("user_online");
//         }
//       );

//       socket.on("makeItOnline", async ({ onlineId, receiverId }) => {
//         try {
//           console.log(onlineId, receiverId);

//           await saveMessageUseCase.makeItOnline(onlineId, receiverId);
//           console.log(
//             `User ${onlineId} is now online and receiver ${receiverId} updated.`
//           );
//         } catch (error) {
//           console.error("Error while making user online:", error);
//         }
//       });

//       socket.on(
//         "send_message",
//         async ({
//           senderId,
//           receiverId,
//           message,
//         }: {
//           senderId: string;
//           receiverId: string;
//           message: IMessage;
//         }) => {
//           console.log(message);

//           const roomId = this.createRoomId(senderId, receiverId);
//           console.log("ROOM ID " + roomId);

//           const savedMessage = await saveMessageUseCase.execute(
//             senderId,
//             receiverId,
//             message
//           );
//           console.log("ROOM ID " + roomId);

//           socket.to(roomId).emit(
//             "receive_message",
//             {
//               message: savedMessage,
//             },
//             () => {
//               console.log("SEND MESSAGE TO FRONT END");
//             }
//           );
//         }
//       );

//       socket.on(
//         "leave_chat",
//         ({
//           senderId,
//           receiverId,
//           offlineId,
//         }: {
//           senderId: string;
//           receiverId: string;
//           offlineId: string;
//         }) => {
//           const roomId = this.createRoomId(senderId, receiverId);
//           socket.leave(roomId);
//           saveMessageUseCase.makeItOffline(senderId, receiverId, offlineId);
//         }
//       );

//       socket.on("disconnect", () => {});

//       socket.on("join_notification", ({ userId }) => {
//         socket.join(userId);
//         console.log(`User ${userId} joined notification room`);
//       });

//       socket.on("send_notification", ({ userId, notification }) => {
//         console.log(`Sending notification to ${userId}:`, notification);
//         this.io.to(userId).emit("receive_notification", notification);
//       });

//       // Add method in class
//     });
//   }
//   public sendNotificationToUser(userId: string, notification: any) {
//     if (!this.io) {
//       console.error(
//         "SocketService has not been initialized with an HTTP server yet."
//       );
//       return;
//     }

//     this.io.to(userId).emit("receive_notification", notification);
//   }
//   private createRoomId(userA: string, userB: string): string {
//     return [userA, userB].sort().join("_");
//   }

//   public joinChat(senderId: string, receiverId: string, socket: Socket) {
//     const roomId = this.createRoomId(senderId, receiverId);
//     socket.join(roomId);
//   }
// }












import { container, singleton } from "tsyringe";
import { Server, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import { SaveMessageUseCase } from "../../application/use-case/chat/SaveMessageUseCase";
import { IMessage } from "../../domain/entities/IChat";

@singleton()
export class SocketService {
  private io!: Server;

  constructor() {}

  public initialize(server: HTTPServer) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.setupListeners();
  }

  private setupListeners() {
    this.io.on("connection", (socket: Socket) => {
      console.log(`User connected: ${socket.id}`);
      const saveMessageUseCase = container.resolve(SaveMessageUseCase);

      // --- Chat join ---
      socket.on("join_chat", ({ senderId, serviceProviderId }: { senderId: string; serviceProviderId: string }) => {
        const roomId = this.createRoomId(senderId, serviceProviderId);
        socket.join(roomId);
        socket.to(roomId).emit("serviceProvider_online");
        socket.to(roomId).emit("user_online");
      });

      // --- Chat message ---
      socket.on("send_message", async ({ senderId, receiverId, message }: { senderId: string; receiverId: string; message: IMessage }) => {
        const roomId = this.createRoomId(senderId, receiverId);
        const savedMessage = await saveMessageUseCase.execute(senderId, receiverId, message);
        socket.to(roomId).emit("receive_message", { message: savedMessage });
      });

      socket.on("leave_chat", ({ senderId, receiverId, offlineId }: { senderId: string; receiverId: string; offlineId: string }) => {
        const roomId = this.createRoomId(senderId, receiverId);
        socket.leave(roomId);
        saveMessageUseCase.makeItOffline(senderId, receiverId, offlineId);
      });

      socket.on("makeItOnline", async ({ onlineId, receiverId }) => {
        try {
          await saveMessageUseCase.makeItOnline(onlineId, receiverId);
        } catch (error) {
          console.error("Error while making user online:", error);
        }
      });

      socket.on("join_notification", ({ userId }) => {
        socket.join(userId);
        console.log(`User ${userId} joined notification room`);
      });

      socket.on("send_notification", ({ userId, notification }) => {
        this.io.to(userId).emit("receive_notification", notification);
      });

    

    
      socket.on("join_video_call", ({ user1,user2 }: { user1:string,user2: string,receiverName:string }) => {
        console.log(`${user2}`);
        console.log('join video event is on');
        
        this.sendNotificationToUser(user2,{ videoCall: `Incoming video call from abhiram` ,callerId:user1})
        const roomId = this.createRoomId(user1,user2);
           console.log(roomId);
           
       socket.join(roomId);
        
        socket.to(roomId).emit("user-joined");
      });

      socket.on("signal", ({ user1,user2, data  }: { user1:string,user2: string, data: any }) => {
        const roomId = this.createRoomId(user1,user2);

        socket.to(roomId).emit("signal", { data });
      });

      socket.on("leave_video_call", ({ roomId }: { roomId: string }) => {
        socket.leave(roomId);
        socket.to(roomId).emit("user-left");
        console.log(`User ${socket.id} left video room: ${roomId}`);
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }

  public sendNotificationToUser(userId: string, notification: any) {
    if (!this.io) {
      console.error("SocketService has not been initialized with an HTTP server yet.");
      return;
    }

    this.io.to(userId).emit("receive_notification", notification);
  }

  private createRoomId(userA: string, userB: string): string {
    return [userA, userB].sort().join("_");
  }

  public joinChat(senderId: string, receiverId: string, socket: Socket) {
    const roomId = this.createRoomId(senderId, receiverId);
    socket.join(roomId);
  }
}
