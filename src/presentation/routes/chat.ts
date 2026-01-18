import express from "express";
import { container } from "tsyringe";
import { ChatController } from "../controllers/ChatController";

const chatRouter = express.Router();
const chatController = container.resolve(ChatController);

chatRouter.post("/chats", chatController.getAllChats.bind(chatController));

chatRouter.post("/", chatController.getSpecificChat.bind(chatController));

chatRouter.post(
  "/upload-image",
  chatController.uploadChatImage.bind(chatController),
);

export default chatRouter;
