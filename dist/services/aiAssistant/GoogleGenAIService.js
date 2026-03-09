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
exports.GoogleGenAIService = void 0;
const dotenv_1 = require("dotenv");
const genai_1 = require("@google/genai");
const tsyringe_1 = require("tsyringe");
(0, dotenv_1.config)();
let GoogleGenAIService = class GoogleGenAIService {
    constructor() {
        this.ai = new genai_1.GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });
    }
    generateResponse(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: prompt,
                });
                console.log("GoogleGenAIService response:", response.text);
                return response;
            }
            catch (err) {
                console.error("GoogleGenAIService error:", err);
                throw err;
            }
        });
    }
};
exports.GoogleGenAIService = GoogleGenAIService;
exports.GoogleGenAIService = GoogleGenAIService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], GoogleGenAIService);
