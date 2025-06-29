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
var SignIn_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignIn = void 0;
const tsyringe_1 = require("tsyringe");
const TokenService_1 = require("../../../../services/auth/TokenService");
let SignIn = SignIn_1 = class SignIn {
    constructor(userRepository, tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }
    static create() {
        const userRepository = tsyringe_1.container.resolve("UserRepository");
        const tokenService = tsyringe_1.container.resolve("TokenService");
        return new SignIn_1(userRepository, tokenService);
    }
    signInWithEmail(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findByEmail(email);
                if (!user)
                    return { errorMessage: "User does not exist" };
                if (user.isBlocked == true)
                    return { errorMessage: "Your account has been blocked by the admin" };
                if (!user.isVerified)
                    return { errorOtp: "User not verified" };
                const isMatch = yield this.userRepository.comparePassword(password, user.password);
                if (!isMatch)
                    return { errorMessage: "Invalid credentials" };
                if (!user._id)
                    return console.log("userId is missing");
                const accessToken = this.tokenService.generateAccessToken(user._id, "userId");
                const refreshToken = this.tokenService.generateRefreshToken(user._id, "userId");
                return { accessToken, refreshToken };
            }
            catch (error) {
                throw error;
            }
        });
    }
    signInWithPhone(phone, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findByPhone(phone);
                if (!user)
                    return { errorMessage: "User does not exist" };
                if (user.isBlocked == true)
                    return { errorMessage: "Your account has been blocked by the admin" };
                if (!user.isVerified)
                    return { errorOtp: "User not verified" };
                const isMatch = yield this.userRepository.comparePassword(password, user.password);
                if (!isMatch)
                    return { errorMessage: "Invalid credentials" };
                if (!user._id)
                    return console.log("userId is missing");
                const accessToken = this.tokenService.generateAccessToken(user._id, "userId");
                const refreshToken = this.tokenService.generateRefreshToken(user._id, "userId");
                return { accessToken, refreshToken };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.SignIn = SignIn;
exports.SignIn = SignIn = SignIn_1 = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UserRepository")),
    __param(1, (0, tsyringe_1.inject)("TokenService")),
    __metadata("design:paramtypes", [Object, TokenService_1.TokenService])
], SignIn);
