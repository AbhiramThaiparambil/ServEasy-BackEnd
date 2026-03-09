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
exports.ServiceProviderSubscriptionController = void 0;
const tsyringe_1 = require("tsyringe");
const requestUtils_1 = require("../../utils/requestUtils");
const errorUtils_1 = require("../../utils/errorUtils");
const tokens_1 = require("../../constants/tokens");
const HttpStatus_1 = require("../../constants/HttpStatus");
let ServiceProviderSubscriptionController = class ServiceProviderSubscriptionController {
    constructor(createAiChatUseCase, getAIChatByIdUseCase, getProviderChats) {
        this.createAiChatUseCase = createAiChatUseCase;
        this.getAIChatByIdUseCase = getAIChatByIdUseCase;
        this.getProviderChats = getProviderChats;
    }
    handleChatRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { message, activeChatId } = req.body;
            console.log(req.body);
            const serviceProviderId = res.locals.serviceProvider_id;
            if (!serviceProviderId) {
                res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                    error: "Service Provider ID is required",
                });
                return;
            }
            if (!message ||
                typeof message !== "string" ||
                message.trim().length === 0) {
                res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                    error: "Message is required and must be a non-empty string",
                });
                return;
            }
            const dto = {
                serviceProviderId,
                prompt: message,
                activeChatId,
            };
            const response = yield this.createAiChatUseCase.execute(dto);
            console.log(response);
            console.log();
            if (!response) {
                res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                    error: "Message is required and must be a non-empty string",
                });
                return;
            }
            console.warn(response.chatId + "chat is chat id chat id chat id chat id");
            res.status(HttpStatus_1.HttpStatus.OK).json({
                id: response.chatId,
                role: "assistant",
                title: response.title,
                content: response.aiResponse,
                createdAt: new Date(),
            });
        });
    }
    handleGetChatByChatId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chatId = (0, requestUtils_1.getString)(req.params.chatId);
                if (!chatId) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ error: "chat id is required" });
                    return;
                }
                const dto = { id: chatId };
                const data = yield this.getAIChatByIdUseCase.execute(dto);
                if (!data) {
                    res.status(HttpStatus_1.HttpStatus.NOT_FOUND).json({ error: "Chat not found" });
                    return;
                }
                res.status(HttpStatus_1.HttpStatus.OK).json(data);
            }
            catch (error) {
                console.error((0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ error: "Something went wrong" });
            }
        });
    }
    getServiceProviderChatsHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const providerId = (0, requestUtils_1.getString)(req.params.providerId);
                if (!providerId) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ error: "serviceProvider id is required" });
                    return;
                }
                const dto = { providerId };
                const data = yield this.getProviderChats.execute(dto);
                if (!data) {
                    res.status(HttpStatus_1.HttpStatus.NOT_FOUND).json({ error: "Chat not found" });
                    return;
                }
                res.status(HttpStatus_1.HttpStatus.OK).json(data);
            }
            catch (e) { }
        });
    }
};
exports.ServiceProviderSubscriptionController = ServiceProviderSubscriptionController;
exports.ServiceProviderSubscriptionController = ServiceProviderSubscriptionController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.CreateAiChatUseCase)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetAIChatByIdUseCase)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetProviderAIChatsUseCase)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ServiceProviderSubscriptionController);
