"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllChatsHandler = void 0;
const tsyringe_1 = require("tsyringe");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const GetAllChatsUseCase_1 = require("../../../application/use-case/chat/GetAllChatsUseCase");
const getAllChatsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serviceProviderId, userId } = req.body;
        console.log(serviceProviderId);
        const getAllChatsUseCase = tsyringe_1.container.resolve(GetAllChatsUseCase_1.GetAllChatsUseCase);
        let chats;
        if (serviceProviderId) {
            chats = yield getAllChatsUseCase.getServiceProviderChats(serviceProviderId);
        }
        else if (userId) {
            chats = yield getAllChatsUseCase.getUserChats(userId);
        }
        else {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'Missing userId or serviceProviderId' });
            return;
        }
        res.status(HttpStatus_1.HttpStatus.OK).json(chats);
        return;
    }
    catch (error) {
        console.error('Error fetching chats:', error);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        return;
    }
});
exports.getAllChatsHandler = getAllChatsHandler;
