import { Request, Response } from "express";
import { container } from "tsyringe";
import { HttpStatus } from "../../../constants/HttpStatus";
import { GetAllChatsUseCase } from "../../../application/use-case/chat/getAllchats/GetAllChats.usecase";

export const getAllChatsHandler = async (req: Request, res: Response) => {
  try {
    const { serviceProviderId, userId } = req.body;
    console.log(serviceProviderId);

    const getAllChatsUseCase = container.resolve(GetAllChatsUseCase);

    let chats;

    if (serviceProviderId) {
      chats = await getAllChatsUseCase.getServiceProviderChats(
        serviceProviderId
      );
    } else if (userId) {
      chats = await getAllChatsUseCase.getUserChats(userId);
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
};
