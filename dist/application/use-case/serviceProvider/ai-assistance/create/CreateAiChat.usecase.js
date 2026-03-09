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
exports.CreateAiChatUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../../../constants/tokens");
const isValidObjectId_1 = require("../../../../../utils/isValidObjectId");
const errorUtils_1 = require("../../../../../utils/errorUtils");
let CreateAiChatUseCase = class CreateAiChatUseCase {
    constructor(googleGenAIService, aiAssistance) {
        this.googleGenAIService = googleGenAIService;
        this.aiAssistance = aiAssistance;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { serviceProviderId, prompt, activeChatId } = data;
            try {
                let chatId;
                if (activeChatId && (0, isValidObjectId_1.isValidObjectId)(activeChatId)) {
                    chatId = activeChatId;
                }
                const newMessage = {
                    content: prompt,
                    createdAt: new Date(),
                    role: "user",
                };
                const savedUserMessage = yield this.aiAssistance.addMessage(serviceProviderId, newMessage, chatId);
                const response = yield this.googleGenAIService.generateResponse(prompt);
                if (!response.text) {
                    throw new Error("AI service returned empty response");
                }
                const responseMessage = {
                    content: response.text,
                    createdAt: new Date(),
                    role: "assistant",
                };
                const savedChat = yield this.aiAssistance.addMessage(serviceProviderId, responseMessage, chatId !== null && chatId !== void 0 ? chatId : savedUserMessage === null || savedUserMessage === void 0 ? void 0 : savedUserMessage.id);
                return {
                    aiResponse: response.text,
                    chatId: chatId !== null && chatId !== void 0 ? chatId : savedUserMessage === null || savedUserMessage === void 0 ? void 0 : savedUserMessage.id,
                    title: savedChat === null || savedChat === void 0 ? void 0 : savedChat.title,
                };
            }
            catch (error) {
                console.error("Error in AiChatUseCase.execute:", (0, errorUtils_1.getErrorMessage)(error));
                throw new Error("Failed to process AI chat request");
            }
        });
    }
};
exports.CreateAiChatUseCase = CreateAiChatUseCase;
exports.CreateAiChatUseCase = CreateAiChatUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.GoogleGenAIService)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.AiAssistanceRepository)),
    __metadata("design:paramtypes", [Object, Object])
], CreateAiChatUseCase);
