"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatHandler = void 0;
class ChatHandler {
    constructor(io, saveMessageUseCase, socketService) {
        this.io = io;
        this.saveMessageUseCase = saveMessageUseCase;
        this.socketService = socketService;
    }
    register(socket) {
        socket.on("join_chat", ({ senderId, serviceProviderId }) => {
            const roomId = this.createRoomId(senderId, serviceProviderId);
            socket.join(roomId);
            socket.to(roomId).emit("user_online");
            socket.to(roomId).emit("serviceProvider_online");
        });
        socket.on("send_message", (_a) => __awaiter(this, [_a], void 0, function* ({ senderId, receiverId, message, senderInfo }) {
            const roomId = this.createRoomId(senderId, receiverId);
            const savedMessage = yield this.saveMessageUseCase.execute(senderId, receiverId, message);
            const room = this.io.sockets.adapter.rooms.get(roomId);
            const socketsInRoom = room ? Array.from(room) : [];
            const isReceiverInRoom = socketsInRoom.some(socketId => socketId !== socket.id);
            if (!isReceiverInRoom) {
                this.socketService.sendNotificationToUser(receiverId, { type: "chat",
                    senderId,
                    senderName: senderInfo.senderName,
                    senderProfile: senderInfo.senderProfile,
                    content: message.content
                });
            }
            socket.to(roomId).emit("receive_message", { message: savedMessage });
        }));
        socket.on("leave_chat", ({ senderId, receiverId, offlineId }) => {
            const roomId = this.createRoomId(senderId, receiverId);
            socket.leave(roomId);
            this.saveMessageUseCase.makeItOffline(senderId, receiverId, offlineId);
        });
        socket.on("makeItOnline", (_a) => __awaiter(this, [_a], void 0, function* ({ onlineId, receiverId }) {
            yield this.saveMessageUseCase.makeItOnline(onlineId, receiverId);
        }));
    }
    createRoomId(userA, userB) {
        return [userA, userB].sort().join("___");
    }
}
exports.ChatHandler = ChatHandler;
