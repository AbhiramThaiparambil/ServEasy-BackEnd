"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const ChatController_1 = require("../controllers/ChatController");
const chatRouter = express_1.default.Router();
const chatController = tsyringe_1.container.resolve(ChatController_1.ChatController);
chatRouter.post("/chats", chatController.getAllChats.bind(chatController));
chatRouter.post("/", chatController.getSpecificChat.bind(chatController));
chatRouter.post("/upload-image", chatController.uploadChatImage.bind(chatController));
exports.default = chatRouter;
