import express from "express"
import { getAllChatsHandler } from "../controllers/chat/getAllChatsHandler";
import { getSpecificChat } from "../controllers/chat/getSpecificChat";
const chatRouter = express.Router();

chatRouter.post('/chats', getAllChatsHandler);
chatRouter.post("/",getSpecificChat)

export default chatRouter