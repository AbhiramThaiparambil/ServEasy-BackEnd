"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllChatsHandler_1 = require("../controllers/chat/getAllChatsHandler");
const getSpecificChat_1 = require("../controllers/chat/getSpecificChat");
const tsyringe_1 = require("tsyringe");
const ChatController_1 = require("../controllers/ChatController");
const chatRouter = express_1.default.Router();
const chatController = tsyringe_1.container.resolve(ChatController_1.ChatController);
chatRouter.post('/chats', getAllChatsHandler_1.getAllChatsHandler);
chatRouter.post("/", getSpecificChat_1.getSpecificChat);
chatRouter.post("/upload-image", chatController.uploadChatImage);
exports.default = chatRouter;
