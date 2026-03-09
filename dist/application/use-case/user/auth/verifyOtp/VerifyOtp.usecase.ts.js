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
exports.VerifyOtp = void 0;
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../../../constants/tokens");
let VerifyOtp = class VerifyOtp {
    constructor(userRepository, otpSErvice, redisService, tokenService) {
        this.userRepository = userRepository;
        this.otpSErvice = otpSErvice;
        this.redisService = redisService;
        this.tokenService = tokenService;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sender: key, otp: enteredOtp } = data;
            const isValidOtp = yield this.otpSErvice.verifyOtp(key, enteredOtp);
            console.log(isValidOtp);
            if (!isValidOtp)
                return { errorMessage: "Invalid or Expired Otp" };
            console.log(key);
            const user = yield this.redisService.getUser(`user:${key}`);
            console.log("radis saved User", user);
            if (!user)
                return {
                    errorMessage: "We couldn’t find your OTP. Please sign up again.",
                };
            const savedUser = yield this.userRepository.create(user);
            if (!savedUser || !savedUser._id) {
                return { errorMessage: "User creation failed. Please try again." };
            }
            const accessToken = this.tokenService.generateAccessToken(savedUser._id, "userId");
            const refreshToken = this.tokenService.generateRefreshToken(savedUser._id, "userId");
            return {
                success: "user verification successful",
                accessToken,
                refreshToken,
            };
        });
    }
};
exports.VerifyOtp = VerifyOtp;
exports.VerifyOtp = VerifyOtp = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.UserRepository)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.OtpService)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.RedisService)),
    __param(3, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.TokenService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], VerifyOtp);
