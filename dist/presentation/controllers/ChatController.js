"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.ChatController = void 0;
const HttpStatus_1 = require("../../constants/HttpStatus");
const errorUtils_1 = require("../../utils/errorUtils");
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../constants/tokens");
let ChatController = class ChatController {
    constructor(uploadImageUseCase, getAllChatsUseCase, saveMessageUseCase) {
        this.uploadImageUseCase = uploadImageUseCase;
        this.getAllChatsUseCase = getAllChatsUseCase;
        this.saveMessageUseCase = saveMessageUseCase;
        this.uploadChatImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { image } = req.body;
                if (!image) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "No image uploaded" });
                    return;
                }
                const dto = { image };
                const result = yield this.uploadImageUseCase.uploadImage(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json(result);
            }
            catch (error) {
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Error uploading image", error: (0, errorUtils_1.getErrorMessage)(error) });
            }
        });
    }
    getAllChats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('chat controller called');
                const { serviceProviderId, userId } = req.body;
                let chats;
                if (serviceProviderId) {
                    const dto = { id: serviceProviderId };
                    chats =
                        yield this.getAllChatsUseCase.getServiceProviderChats(dto);
                }
                else if (userId) {
                    const dto = { id: userId };
                    chats = yield this.getAllChatsUseCase.getUserChats(dto);
                }
                else {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Missing userId or serviceProviderId" });
                    return;
                }
                console.log('chats', chats);
                res.status(HttpStatus_1.HttpStatus.OK).json(chats);
                return;
            }
            catch (error) {
                console.error("Error fetching chats:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal Server Error" });
                return;
            }
        });
    }
    getSpecificChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sender, reciver } = req.body;
                if (!sender || !reciver) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "senderId and receiverId are required" });
                    return;
                }
                const dto = {
                    user1: sender,
                    user2: reciver,
                };
                const data = yield this.saveMessageUseCase.getSpecificChat(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({ data });
                return;
            }
            catch (error) {
                console.error("Error getting specific chat:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
                return;
            }
        });
    }
};
exports.ChatController = ChatController;
exports.ChatController = ChatController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.UploadChatImageUseCase)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetAllChatsUseCase)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.SaveMessageUseCase)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ChatController);
