import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { GetUserProfileUseCase } from "../../application/use-case/User/GetProfile";
import { TokenService } from "../../services/auth/TokenService";
import { HttpStatus } from "../../constants/HttpStatus";
import { UserProfileUpdate } from "../../application/use-case/User/updateProfile";
import { NotificationUseCase } from "../../application/use-case/notification/NotificationUseCase ";

@injectable()
export class UserController {
  constructor(
   
    @inject(NotificationUseCase) private notificationUseCase:NotificationUseCase
  ) {}

                                                                                                                                   
  getNotification = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("get notification ====================================================================================");
      const userId = res.locals.user?.userId
      console.log(res.locals.user);

      console.log(userId);
      if (!userId) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: "User not found" });
        return;
      }

      const notification = await this.notificationUseCase.getNotification(userId);
      console.log(notification);
      
      res.status(HttpStatus.OK).json( notification );
    } catch (error) {
      console.error( error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }

  



  deleteNotification = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("delete notification ====================================================================================");
      const userId = res.locals.user?.userId;
      const { id } = req.params;
  
      if (!userId || !id) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: "User not found or missing ID" });
        return;
      }
  
      if (id === "deleteAll") {
        await this.notificationUseCase.delteAllNotification(userId);
        res.status(HttpStatus.OK).json({ message: "All notifications deleted" });
      } else {
        await this.notificationUseCase.deleteSingleNotification(id);
        res.status(HttpStatus.OK).json({ message: "Notification deleted" });
      }
  
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }
  






  markAsReadNotification = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("markAsRead notification ====================================================================================");
      const { id } = req.params;
  console.log(id);
  
      if (!id) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: "Notification ID is required" });
        return;
      }
  
      await this.notificationUseCase.markAsRead(id);
  
      res.status(HttpStatus.OK).json({ message: "Notification marked as read" });
  
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
  }




}
