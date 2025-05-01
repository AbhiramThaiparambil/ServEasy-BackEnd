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

      socket.on(
        "join_chat",
        ({
          senderId,
          serviceProviderId,
        }: {
          senderId: string;
          serviceProviderId: string;
        }) => {
            console.log("SENDERID    "  +senderId);
            console.log("SERVICEPROVIDER    "+serviceProviderId);
            
          const roomId = this.createRoomId(senderId, serviceProviderId);
          console.log('ROOM ID '+roomId);

          socket.join(roomId);
          socket.to(roomId).emit("serviceProvider_online",()=>{

        });
          socket.to(roomId).emit("user_online");
    
        }
        
       
       
         

      );

      socket.on("makeItOnline", async ({ onlineId, receiverId }) => {
        try {
            console.log(onlineId,receiverId);
            
          await saveMessageUseCase.makeItOnline(onlineId, receiverId);
          console.log(`User ${onlineId} is now online and receiver ${receiverId} updated.`);
        } catch (error) {
          console.error("Error while making user online:", error);
        }
      });
      
      

      
      socket.on(
        "send_message",
        async ({
          senderId,
          receiverId,
          message,
        }: {
          senderId: string;
          receiverId: string;
          message: IMessage;
          
        }) => {
            console.log(message);
            
          const roomId = this.createRoomId(senderId, receiverId);
           console.log('ROOM ID '+roomId);
           

          const savedMessage=await saveMessageUseCase.execute(
            senderId,
            receiverId,
            message
          );
          console.log('ROOM ID '+roomId);

          socket.to(roomId).emit("receive_message", {
            message:savedMessage
            

          },()=>{console.log('SEND MESSAGE TO FRONT END');
          });
        }
      );

      socket.on(
        "leave_chat",
        ({
          senderId,
          receiverId,
          offlineId
        }: {
          senderId: string;
          receiverId: string;
          offlineId:string;
        }) => {
          const roomId = this.createRoomId(senderId, receiverId);
          socket.leave(roomId);
          saveMessageUseCase.makeItOffline(senderId,receiverId,offlineId)

        }
      );

      socket.on("disconnect", () => {
      });



      socket.on("message_delivered",()=>{


      });






    });
  }

  private createRoomId(userA: string, userB: string): string {
    return [userA, userB].sort().join("_");
  }

  public joinChat(senderId: string, receiverId: string, socket: Socket) {
    const roomId = this.createRoomId(senderId, receiverId);
    socket.join(roomId);
  }
}
