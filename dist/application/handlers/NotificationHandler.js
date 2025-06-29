"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationHandler = void 0;
class NotificationHandler {
    constructor(notificationUseCase, io) {
        this.notificationUseCase = notificationUseCase;
        this.io = io;
    }
    register(socket) {
        socket.on("join_notification", ({ userId }) => {
            socket.join(userId);
        });
        socket.on("send_notification", ({ userId, notification }) => {
            this.sendNotification(userId, notification);
        });
    }
    sendNotification(userId, notification) {
        this.io.to(userId).emit("receive_notification", notification);
        console.log(notification);
        if (notification.type === "chat") {
            const content = `${notification.senderName} sent you a message: "${notification.content}"`;
            this.notificationUseCase.create(content, userId);
        }
        else {
            this.notificationUseCase.create(notification.content, userId);
        }
    }
}
exports.NotificationHandler = NotificationHandler;
