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
exports.GoogleAuthUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const google_auth_library_1 = require("google-auth-library");
const dotenv_1 = require("dotenv");
const TokenService_1 = require("../../../../services/auth/TokenService");
(0, dotenv_1.config)();
let GoogleAuthUseCase = class GoogleAuthUseCase {
    constructor(userRepository, tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }
    execute(googleToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
                const ticket = yield this.client.verifyIdToken({
                    idToken: googleToken,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                const payload = ticket.getPayload();
                if (!payload)
                    throw new Error("Invalid Google token");
                console.log("Google Payload:", payload);
                const { sub, email, name, picture, email_verified } = payload;
                if (!email) {
                    throw new Error("Email not found in Google payload");
                }
                let user = yield this.userRepository.findByEmail(email);
                if (user) {
                    if (!user.googleId) {
                        user.googleId = sub;
                        yield this.userRepository.updateUser(user);
                    }
                }
                else {
                    const newUser = {
                        isVerified: email_verified || false,
                        password: sub,
                        userName: name || email.split("@")[0],
                        email,
                        googleId: sub,
                        profileImage: picture || "",
                    };
                    user = yield this.userRepository.create(newUser);
                }
                if (user) {
                    const accessToken = this.tokenService.generateAccessToken(user._id + "", "userId");
                    const refreshToken = this.tokenService.generateRefreshToken(user._id = "", "userId");
                    return { accessToken, refreshToken };
                }
                else {
                    throw new Error('use Auth failed');
                }
            }
            catch (error) {
                console.error("Google Auth Error:", error);
                throw new Error("Google Authentication Failed");
            }
        });
    }
};
exports.GoogleAuthUseCase = GoogleAuthUseCase;
exports.GoogleAuthUseCase = GoogleAuthUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UserRepository")),
    __param(1, (0, tsyringe_1.inject)("TokenService")),
    __metadata("design:paramtypes", [Object, TokenService_1.TokenService])
], GoogleAuthUseCase);
