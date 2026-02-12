import { Request, Response } from "express";
import { HttpStatus } from "../../constants/HttpStatus";
import { getErrorMessage } from "../../utils/errorUtils";

import { inject, injectable } from "tsyringe";
import { USE_CASE_TOKENS } from "../../constants/tokens";
import { IUploadChatImageUseCase } from "../../application/use-case/common/chat/uploadChatMedia/IUploadChatImage.usecase";
import { IGetAllChats } from "../../application/use-case/common/chat/getAllchats/IGetAllChats.usecase";
import { ISaveMessageUseCase } from "../../application/use-case/common/chat/saveMessage/ISaveMessage.uescase";
import { UploadChatImageRequestDTO } from "../../application/dtos/common/chat/uploadChatMedia/UploadChatImageDTO";
import { GetChatsRequestDTO } from "../../application/dtos/common/chat/getAllchats/GetAllChatsDTO";
import { GetSpecificChatRequestDTO } from "../../application/dtos/common/chat/saveMessage/SaveMessageDTO";

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

      const dto: UploadChatImageRequestDTO = { image };
      const result = await this.uploadImageUseCase.uploadImage(dto);
      res.status(HttpStatus.OK).json(result);
    } catch (error: unknown) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error uploading image", error: getErrorMessage(error) });
    }
  };

  async getAllChats(req: Request, res: Response): Promise<void> {
    try {
      console.log('chat controller called')
      const { serviceProviderId, userId } = req.body;

      let chats;

      if (serviceProviderId) {
        const dto: GetChatsRequestDTO = { id: serviceProviderId };
        chats =
          await this.getAllChatsUseCase.getServiceProviderChats(dto);
      } else if (userId) {
        const dto: GetChatsRequestDTO = { id: userId };
        chats = await this.getAllChatsUseCase.getUserChats(dto);
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Missing userId or serviceProviderId" });
        return;
      }

      res.status(HttpStatus.OK).json(chats);
      return;
    } catch (error: unknown) {
      console.error("Error fetching chats:", getErrorMessage(error));
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

      const dto: GetSpecificChatRequestDTO = {
        user1: sender as string,
        user2: reciver as string,
      };

      const data = await this.saveMessageUseCase.getSpecificChat(dto);

      res.status(HttpStatus.OK).json({ data });
      return;
    } catch (error: unknown) {
      console.error("Error getting specific chat:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
      return;
    }
  }
}
