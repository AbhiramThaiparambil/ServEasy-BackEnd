"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.aiAssistanceRepository = void 0;
const mongoose_1 = require("mongoose");
const tsyringe_1 = require("tsyringe");
const aiAssistanceSessionModel_1 = require("../models/aiAssistanceSessionModel");
let aiAssistanceRepository = class aiAssistanceRepository {
    createSession(serviceProviderId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSession = new aiAssistanceSessionModel_1.AiAssistanceChatSessionModel({
                serviceProviderId,
                title: message.content,
                messages: [message],
            });
            return yield newSession.save();
        });
    }
    addMessage(serviceProviderId, message, chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(chatId);
            if (chatId) {
                const session = yield aiAssistanceSessionModel_1.AiAssistanceChatSessionModel.findById(new mongoose_1.Types.ObjectId(chatId));
                if (!session) {
                    return yield this.createSession(serviceProviderId, message);
                }
            }
            else {
                return yield this.createSession(serviceProviderId, message);
            }
            return yield aiAssistanceSessionModel_1.AiAssistanceChatSessionModel.findOneAndUpdate({ _id: chatId }, { $push: { messages: message } });
        });
    }
    findById(chatId) {
        return aiAssistanceSessionModel_1.AiAssistanceChatSessionModel.findById(chatId);
    }
    // findByServiceProvider(serviceProviderId: Types.ObjectId): Promise<IAiAssistanceChatSession[]> {
    // return await AiAssistanceChatSessionModel.aggregate([{$match:{serviceProviderId},{$lookup:{from:"serviceProvider",localField:"serviceProviderId",foreignField:"_id",as:"chats"}}}])
    // }
    //   createSession(session: Partial<IAiAssistanceChatSession>): Promise<IAiAssistanceChatSession>;
    //   findById(chatId: Types.ObjectId): Promise<IAiAssistanceChatSession | null>;
    //   findByUser(userId: Types.ObjectId): Promise<IAiAssistanceChatSession[]>;
    //   addMessage(
    //     chatId: Types.ObjectId,
    //     message: IAiAssistanceChatSession["messages"][0]
    //   ): Promise<IAiAssistanceChatSession | null>;
    //   endSession(chatId: Types.ObjectId): Promise<boolean>;
    findByProviderId(serviceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield aiAssistanceSessionModel_1.AiAssistanceChatSessionModel.find({ serviceProviderId: new mongoose_1.Types.ObjectId(serviceProviderId) }).sort({ createdAt: -1 });
        });
    }
    getChatsInfoByServiceProviderId(serviceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield aiAssistanceSessionModel_1.AiAssistanceChatSessionModel.aggregate([{ $match: { serviceProviderId: new mongoose_1.Types.ObjectId(serviceProviderId) } }, { $sort: { createdAt: -1 } }, { $project: { title: 1, _id: 1 } }]);
        });
    }
};
exports.aiAssistanceRepository = aiAssistanceRepository;
exports.aiAssistanceRepository = aiAssistanceRepository = __decorate([
    (0, tsyringe_1.injectable)()
], aiAssistanceRepository);
