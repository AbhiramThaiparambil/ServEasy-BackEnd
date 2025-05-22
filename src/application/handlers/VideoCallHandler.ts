import { Server, Socket } from "socket.io";
import { SocketService } from "../../services/socket/socketService";

export class VideoCallHandler {
  constructor(private io: Server,private socketService: SocketService) {}

  public register(socket: Socket) {
    socket.on("join_video_call", ({ user1, user2,callerName,callerProfile,user }: { user1: string; user2: string ,callerName:string,callerProfile:string,user:boolean}, callback: () => void) => {
        console.log( user2,callerName,callerProfile);

        const roomId = this.createRoomId(user1, user2);
      socket.join(roomId);
        this.socketService.sendNotificationToUser(user2,{type:"video_call",callerId:user1,callerName,callerProfile:callerProfile,callRoomId:roomId,user,content:` ${callerName} is calling you via video`,receiverId:user2})

     

        socket.data.userId = user1;

      this.io.to(roomId).emit("user-joined");

      this.io.to(user2).emit("receive_notification", {
        videoCall: `Incoming video call from ${user1}`,
        callerId: user1,
      });

      callback?.();
    });











  
    socket.on("reject_videoCall",({callRoomId,user2}:{callRoomId:string,user2:string})=>{

        console.log(callRoomId);
        console.log("{}P{}{}{}{{{{}{}{}{}{}{}{}{}{}}{}{}{}{}{}{}}{}{}{}{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}{{{{{{{{{{{}}}}}}}}}}");

        console.log(user2);
        console.log(user2);
        console.log(callRoomId);
        console.log(callRoomId);

        
        socket.to(callRoomId).emit("user-left");


        this.socketService.sendNotificationToUser(user2,{
            type: "notfication",
            content: "User rejected your call",
            timestamp:Date.now()+""
          })


    })


    socket.on("signal", ({ user1, user2, data }: { user1: string; user2: string; data: any }) => {
      const roomId = this.createRoomId(user1, user2);
      socket.to(roomId).emit("signal", { data });
    });

    socket.on("leave_video_call", ({ user1, user2 }: { user1: string; user2: string }) => {
      const roomId = this.createRoomId(user1, user2);
      socket.leave(roomId);
      socket.to(roomId).emit("user-left");
    });

    socket.on("disconnect", () => {
      const userId = socket.data?.userId;
      if (userId) {
        console.log(`User disconnected: ${userId}`);
      }
    });
  }

  private createRoomId(userA: string, userB: string): string {
    return [userA, userB].sort().join("_");
  }
}
