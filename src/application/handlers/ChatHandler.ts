import { Socket, Server } from "socket.io";
import { IMessage } from "../../domain/entities/IChat";
import { SocketService } from "../../services/socket/SocketService";
import { SaveMessageUseCase } from "../use-case/common/chat/saveMessage/SaveMessage.usecase";
import {
  SaveMessageRequestDTO,
  MakeChatOfflineRequestDTO,
  MakeChatOnlineRequestDTO,
} from "../dtos/common/chat/saveMessage/SaveMessageDTO";

export class ChatHandler {
  constructor(
    private io: Server,
    private saveMessageUseCase: SaveMessageUseCase,
    private socketService: SocketService,
  ) {}

  public register(socket: Socket) {
    socket.on(
      "join_chat",
      ({
        senderId,
        serviceProviderId,
      }: {
        senderId: string;
        serviceProviderId: string;
      }) => {
        const roomId = this.createRoomId(senderId, serviceProviderId);
        socket.join(roomId);
        socket.to(roomId).emit("user_online");
        socket.to(roomId).emit("serviceProvider_online");
      },
    );

    socket.on(
      "send_message",
      async ({
        senderId,
        receiverId,
        message,
        senderInfo,
        targetRole,
      }: {
        senderId: string;
        receiverId: string;
        message: IMessage;
        senderInfo: { senderName: string; senderProfile: string };
        targetRole?: "SERVICE_PROVIDER" | "USER";
      }) => {
        const roomId = this.createRoomId(senderId, receiverId);
        const dto: SaveMessageRequestDTO = {
          user1: senderId,
          user2: receiverId,
          message,
        };
        const savedMessage = await this.saveMessageUseCase.execute(dto);

        const room = this.io.sockets.adapter.rooms.get(roomId);
        const socketsInRoom = room ? Array.from(room) : [];
        const isReceiverInRoom = socketsInRoom.some(
          (socketId) => socketId !== socket.id,
        );

        if (!isReceiverInRoom) {
          this.socketService.sendNotificationToUser(receiverId, receiverId, {
            type: "chat",
            targetRole,
            senderId,
            senderName: senderInfo.senderName,
            senderProfile: senderInfo.senderProfile,
            content: message.content,
          });
        }
        socket.to(roomId).emit("receive_message", { message: savedMessage });
      },
    );

    socket.on("leave_chat", ({ senderId, receiverId, offlineId }) => {
      const roomId = this.createRoomId(senderId, receiverId);
      socket.leave(roomId);
      const dto: MakeChatOfflineRequestDTO = { senderId, receiverId, offlineId };
      this.saveMessageUseCase.makeItOffline(dto);
    });

    socket.on("makeItOnline", async ({ onlineId, receiverId }) => {
      const dto: MakeChatOnlineRequestDTO = { onlineId, receiverId };
      await this.saveMessageUseCase.makeItOnline(dto);
    });
  }

  private createRoomId(userA: string, userB: string): string {
    return [userA, userB].sort().join("___");
  }
}
