"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoCallHandler = void 0;
class VideoCallHandler {
    constructor(io, socketService) {
        this.io = io;
        this.socketService = socketService;
    }
    register(socket) {
        socket.on("join_video_call", ({ user1, user2, targetRole, callerName, callerProfile, user, }, callback) => {
            console.log(user2, callerName, callerProfile);
            const roomId = this.createRoomId(user1, user2);
            socket.join(roomId);
            const room = this.io.sockets.adapter.rooms.get(roomId);
            const socketsInRoom = room ? Array.from(room) : [];
            const isReceiverInRoom = socketsInRoom.some((socketId) => socketId !== socket.id);
            if (!isReceiverInRoom) {
                console.log("_____________________________________");
                console.log("user 2 ");
                console.log(user2);
                console.log("user 1");
                console.log(user1);
                console.log("_____________________________________");
                console.log(callerName, callerProfile, user);
                this.socketService.sendNotificationToUser(user2, user2, {
                    type: "video_call",
                    callerId: user1,
                    targetRole,
                    callerName,
                    callerProfile: callerProfile,
                    callRoomId: roomId,
                    user,
                    content: ` ${callerName} is calling you via video`,
                    receiverId: user2,
                });
            }
            socket.data.userId = user1;
            this.io.to(roomId).emit("user-joined");
            this.io.to(user2).emit("receive_notification", {
                videoCall: `Incoming video call from ${user1}`,
                callerId: user1,
            });
            callback === null || callback === void 0 ? void 0 : callback();
        });
        socket.on("reject_videoCall", ({ callRoomId, user2 }) => {
            console.log(callRoomId);
            console.log(user2);
            console.log(user2);
            console.log(callRoomId);
            console.log(callRoomId);
            socket.to(callRoomId).emit("user-left");
            this.socketService.sendNotificationToUser(user2, user2, {
                type: "notification",
                targetRole: "USER",
                content: "User rejected your call",
                timestamp: Date.now() + "",
            });
        });
        socket.on("signal", ({ user1, user2, data }) => {
            const roomId = this.createRoomId(user1, user2);
            socket.to(roomId).emit("signal", { data });
        });
        socket.on("leave_video_call", ({ user1, user2 }) => {
            const roomId = this.createRoomId(user1, user2);
            socket.leave(roomId);
            socket.to(roomId).emit("user-left");
        });
        socket.on("disconnect", () => {
            var _a;
            const userId = (_a = socket.data) === null || _a === void 0 ? void 0 : _a.userId;
            if (userId) {
                console.log(`User disconnected: ${userId}`);
            }
        });
    }
    createRoomId(userA, userB) {
        return [userA, userB].sort().join("_");
    }
}
exports.VideoCallHandler = VideoCallHandler;
