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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveMessageUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = __importDefault(require("mongoose"));
// import {SaveMessageDTO } from "../../../domain/entities/IChat"
let SaveMessageUseCase = class SaveMessageUseCase {
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }
    getSpecificChat(user1, user2) {
        return __awaiter(this, void 0, void 0, function* () {
            const user1Id = new mongoose_1.default.Types.ObjectId(user1);
            const user2Id = new mongoose_1.default.Types.ObjectId(user2);
            const chat = yield this.chatRepository.findByIds(user1Id, user2Id);
            if (!chat) {
                return {
                    data: null,
                    message: "noMessages",
                };
            }
            return {
                data: chat,
                message: "success",
            };
        });
    }
    execute(user1, user2, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.chatRepository.findByIds(new mongoose_1.default.Types.ObjectId(user1), new mongoose_1.default.Types.ObjectId(user2));
            console.log(message);
            if (!isExist) {
                const data = yield this.chatRepository.createChat(new mongoose_1.default.Types.ObjectId(user1), new mongoose_1.default.Types.ObjectId(user2), [message]);
                return data.messages[data.messages.length - 1];
            }
            else {
                const data = yield this.chatRepository.addMessage(isExist._id, message);
                if (!data) {
                    return message;
                }
                return data.messages[data.messages.length - 1];
            }
            // return this.chatRepository.saveMessage(data);
        });
    }
    makeItOnline(onlineId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.chatRepository.makeItOnline(new mongoose_1.default.Types.ObjectId(receiverId), new mongoose_1.default.Types.ObjectId(onlineId));
        });
    }
    makeItOffline(senderId, receiverId, offlineId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.chatRepository.makeItOffline(new mongoose_1.default.Types.ObjectId(receiverId), new mongoose_1.default.Types.ObjectId(senderId), new mongoose_1.default.Types.ObjectId(offlineId));
        });
    }
};
exports.SaveMessageUseCase = SaveMessageUseCase;
exports.SaveMessageUseCase = SaveMessageUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ChatRepository")),
    __metadata("design:paramtypes", [Object])
], SaveMessageUseCase);
