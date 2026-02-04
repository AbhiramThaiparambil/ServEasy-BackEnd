import { Request, Response } from "express";
import { HttpStatus } from "../../constants/HttpStatus";
import { inject, injectable } from "tsyringe";
import { USE_CASE_TOKENS } from "../../constants/tokens";
import { IUploadChatImageUseCase } from "../../application/use-case/common/chat/uploadChatMedia/IUploadChatImage.usecase";
import { IGetAllChats } from "../../application/use-case/common/chat/getAllchats/IGetAllChats.usecase";
import { ISaveMessageUseCase } from "../../application/use-case/common/chat/saveMessage/ISaveMessage.uescase";
@injectable()
export class ChatController {
  constructor(
    @inject(USE_CASE_TOKENS.UploadChatImageUseCase)
    private uploadImageUseCase: IUploadChatImageUseCase,
    @inject(USE_CASE_TOKENS.GetAllChatsUseCase)
    private getAllChatsUseCase: IGetAllChats,
    @inject(USE_CASE_TOKENS.SaveMessageUseCase)
    private readonly saveMessageUseCase: ISaveMessageUseCase,
  ) {}

  uploadChatImage = async (req: Request, res: Response) => {
    try {
      const { image } = req.body;

      if (!image) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "No image uploaded" });
        return;
      }

      const result = await this.uploadImageUseCase.uploadImage(image);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error uploading image", error });
    }
  };

  async getAllChats(req: Request, res: Response): Promise<void> {
    try {
      const { serviceProviderId, userId } = req.body;

      let chats;

      if (serviceProviderId) {
        chats =
          await this.getAllChatsUseCase.getServiceProviderChats(
            serviceProviderId,
          );
      } else if (userId) {
        chats = await this.getAllChatsUseCase.getUserChats(userId);
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Missing userId or serviceProviderId" });
        return;
      }

      res.status(HttpStatus.OK).json(chats);
      return;
    } catch (error) {
      console.error("Error fetching chats:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
      return;
    }
  }

  async getSpecificChat(req: Request, res: Response): Promise<void> {
    try {
      const { sender, reciver } = req.body;

      if (!sender || !reciver) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "senderId and receiverId are required" });
        return;
      }

      const data = await this.saveMessageUseCase.getSpecificChat(
        sender as string,
        reciver as string,
      );

      res.status(HttpStatus.OK).json({ data });
      return;
    } catch (error) {
      console.error("Error getting specific chat:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
      return;
    }
  }
}
