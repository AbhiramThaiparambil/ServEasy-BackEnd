"use strict";
// import { container, singleton } from "tsyringe";
// import { Server, Socket } from "socket.io";
// import { Server as HTTPServer } from "http";
// import { SaveMessageUseCase } from "../../application/use-case/chat/SaveMessageUseCase";
// import { IMessage } from "../../domain/entities/IChat";
// import { NotificationUseCase } from "../../application/use-case/notification/NotificationUseCase ";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
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
//       // --- Chat join ---
//       socket.on("join_chat", ({ senderId, serviceProviderId }: { senderId: string; serviceProviderId: string }) => {
//         const roomId = this.createRoomId(senderId, serviceProviderId);
//         socket.join(roomId);
//         socket.to(roomId).emit("serviceProvider_online");
//         socket.to(roomId).emit("user_online");
//       });
//       // --- Chat message ---
//       socket.on("send_message", async ({ senderId, receiverId, message }: { senderId: string; receiverId: string; message: IMessage }) => {
//         const roomId = this.createRoomId(senderId, receiverId);
//         const savedMessage = await saveMessageUseCase.execute(senderId, receiverId, message);
//         socket.to(roomId).emit("receive_message", { message: savedMessage });
//       });
//       socket.on("leave_chat", ({ senderId, receiverId, offlineId }: { senderId: string; receiverId: string; offlineId: string }) => {
//         const roomId = this.createRoomId(senderId, receiverId);
//         socket.leave(roomId);
//         saveMessageUseCase.makeItOffline(senderId, receiverId, offlineId);
//       });
//       socket.on("makeItOnline", async ({ onlineId, receiverId }) => {
//         try {
//           await saveMessageUseCase.makeItOnline(onlineId, receiverId);
//         } catch (error) {
//           console.error("Error while making user online:", error);
//         }
//       });
//       socket.on("join_notification", ({ userId }) => {
//         socket.join(userId);
//         console.log(`User ${userId} joined notification room`);
//       });
//       socket.on("send_notification", ({ userId, notification }) => {
//         this.io.to(userId).emit("receive_notification", notification);
//       });
//       socket.on("join_video_call", ({ user1,user2 }: { user1:string,user2: string,receiverName:string }) => {
//         console.log(`${user2}`);
//         console.log('join video event is on');
//         this.sendNotificationToUser(user2,{ videoCall: `Incoming video call from abhiram` ,callerId:user1})
//         const roomId = this.createRoomId(user1,user2);
//            console.log(roomId);
//        socket.join(roomId);
//         socket.to(roomId).emit("user-joined");
//       });
//       socket.on("signal", ({ user1,user2, data  }: { user1:string,user2: string, data: any }) => {
//         const roomId = this.createRoomId(user1,user2);
//         socket.to(roomId).emit("signal", { data });
//       });
//       socket.on("leave_video_call", ({ roomId }: { roomId: string }) => {
//         socket.leave(roomId);
//         socket.to(roomId).emit("user-left");
//         console.log(`User ${socket.id} left video room: ${roomId}`);
//       });
//       socket.on("disconnect", () => {
//         console.log(`User disconnected: ${socket.id}`);
//       });
//     });
//   }
//   public sendNotificationToUser(userId: string, notification: any) {
//     if (!this.io) {
//       console.error("SocketService has not been initialized with an HTTP server yet.");
//       return;
//     }
//     this.io.to(userId).emit("receive_notification", notification);
//     const  notificationUseCase =container.resolve(NotificationUseCase)
//     notificationUseCase.create(notification.content,userId)
//   }
//   private createRoomId(userA: string, userB: string): string {
//     return [userA, userB].sort().join("_");
//   }
//   public joinChat(senderId: string, receiverId: string, socket: Socket) {
//     const roomId = this.createRoomId(senderId, receiverId);
//     socket.join(roomId);
//   }
// }
const tsyringe_1 = require("tsyringe");
const socket_io_1 = require("socket.io");
const SaveMessageUseCase_1 = require("../../application/use-case/chat/SaveMessageUseCase");
const ChatHandler_1 = require("../../application/handlers/ChatHandler");
const NotificationHandler_1 = require("../../application/handlers/NotificationHandler");
// import { VideoCallHandler } from "../../application/handlers/VideoCallHandler";
const NotificationUseCase_1 = require("../../application/use-case/notification/NotificationUseCase ");
const VideoCallHandler_1 = require("../../application/handlers/VideoCallHandler");
let SocketService = class SocketService {
    constructor(saveMessageUseCase, notificationUseCase) {
        this.saveMessageUseCase = saveMessageUseCase;
        this.notificationUseCase = notificationUseCase;
    }
    initialize(server) {
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
        });
        this.io.on("connection", (socket) => {
            console.log(`User connected: ${socket.id}`);
            new ChatHandler_1.ChatHandler(this.io, this.saveMessageUseCase, this).register(socket);
            new NotificationHandler_1.NotificationHandler(this.notificationUseCase, this.io).register(socket);
            new VideoCallHandler_1.VideoCallHandler(this.io, this).register(socket);
            socket.on("disconnect", () => {
                console.log(`User disconnected: ${socket.id}`);
            });
        });
    }
    // Add this method here
    sendNotificationToUser(userId, notification) {
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        console.log("----------------------------------------------------");
        console.log(notification);
        console.log("----------------------------------------------------");
        console.log(userId);
        if (!this.io) {
            console.error("SocketService has not been initialized with an HTTP server yet.");
            return;
        }
        this.io.to(userId).emit("receive_notification", notification);
        if (notification.type === "chat") {
            const content = `${notification.senderName} sent you a message: "${notification.content}"`;
            // this.notificationUseCase.create(content, userId);
        }
        else if (notification.type === "notfication") {
            this.notificationUseCase.create(notification.content, userId);
        }
    }
};
exports.SocketService = SocketService;
exports.SocketService = SocketService = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [SaveMessageUseCase_1.SaveMessageUseCase,
        NotificationUseCase_1.NotificationUseCase])
], SocketService);
