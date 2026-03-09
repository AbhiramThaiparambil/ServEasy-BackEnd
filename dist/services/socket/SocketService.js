"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const tsyringe_1 = require("tsyringe");
const socket_io_1 = require("socket.io");
const SaveMessage_usecase_1 = require("../../application/use-case/common/chat/saveMessage/SaveMessage.usecase");
const ChatHandler_1 = require("../../application/handlers/ChatHandler");
const NotificationHandler_1 = require("../../application/handlers/NotificationHandler");
const VideoCallHandler_1 = require("../../application/handlers/VideoCallHandler");
const tokens_1 = require("../../constants/tokens");
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
    sendNotificationToUser(userId, referenceId, notification) {
        console.log(notification);
        console.log(userId);
        if (!this.io) {
            console.error("SocketService has not been initialized with an HTTP server yet.");
            return;
        }
        this.io.to(userId).emit("receive_notification", notification);
        if (notification.type === "chat") {
            // const content = `${notification.senderName} sent you a message: "${notification.content}"`;
            // this.notificationUseCase.create(content, userId);
        }
        else if (notification.type === "notification") {
            const dto = {
                content: notification.content,
                userId: referenceId,
            };
            this.notificationUseCase.execute(dto);
        }
    }
    refreshData(userId) {
        this.io.to(userId).emit("refreshData");
    }
};
exports.SocketService = SocketService;
exports.SocketService = SocketService = __decorate([
    (0, tsyringe_1.singleton)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.SaveMessageUseCase)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.CreateNotificationUseCase)),
    __metadata("design:paramtypes", [SaveMessage_usecase_1.SaveMessageUseCase, Object])
], SocketService);
