import express from "express"
import { getAllChatsHandler } from "../controllers/chat/getAllChatsHandler";
import { getSpecificChat } from "../controllers/chat/getSpecificChat";
import { container } from "tsyringe";
import { ChatController } from "../controllers/ChatController";
const chatRouter = express.Router();
const chatController = container.resolve(ChatController)
chatRouter.post('/chats', getAllChatsHandler);
chatRouter.post("/",getSpecificChat)
chatRouter.post("/upload-image",chatController.uploadChatImage)

export default chatRouter