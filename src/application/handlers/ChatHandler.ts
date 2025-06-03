import { Socket,Server} from "socket.io";
import { SaveMessageUseCase } from "../../application/use-case/chat/SaveMessageUseCase";
import { IMessage } from "../../domain/entities/IChat";
import { SocketService } from "../../services/socket/socketService";

export class ChatHandler {
  constructor(private io: Server,private saveMessageUseCase: SaveMessageUseCase,private socketService: SocketService) {}

  public register(socket: Socket) {
    socket.on("join_chat", ({ senderId, serviceProviderId }: { senderId: string; serviceProviderId: string }) => {
      const roomId = this.createRoomId(senderId, serviceProviderId);
      socket.join(roomId);
      socket.to(roomId).emit("user_online");
      socket.to(roomId).emit("serviceProvider_online");
    });

    socket.on("send_message", async ({ senderId, receiverId, message,senderInfo }: { senderId: string; receiverId: string; message: IMessage,senderInfo:{senderName:string,senderProfile: string} }) => {
      const roomId = this.createRoomId(senderId, receiverId);
      const savedMessage = await this.saveMessageUseCase.execute(senderId, receiverId, message);

  const room = this.io.sockets.adapter.rooms.get(roomId);
  const socketsInRoom = room ? Array.from(room) : [];
  const isReceiverInRoom = socketsInRoom.some(socketId => socketId !== socket.id); 

  if (!isReceiverInRoom) {
    this.socketService.sendNotificationToUser(receiverId,{type: "chat",
        senderId,
        senderName:senderInfo.senderName,
        senderProfile:senderInfo.senderProfile,
        content:message.content
        })
    }
      socket.to(roomId).emit("receive_message", { message: savedMessage });
    });

    socket.on("leave_chat", ({ senderId, receiverId, offlineId }) => {
      const roomId = this.createRoomId(senderId, receiverId);
      socket.leave(roomId);
      this.saveMessageUseCase.makeItOffline(senderId, receiverId, offlineId);
    });

    socket.on("makeItOnline", async ({ onlineId, receiverId }) => {
      await this.saveMessageUseCase.makeItOnline(onlineId, receiverId);
    });
  }

  private createRoomId(userA: string, userB: string): string {
    return [userA, userB].sort().join("___");
  }
}
