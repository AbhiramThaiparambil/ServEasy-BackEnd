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
exports.AdminSignin = void 0;
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../../constants/tokens");
let AdminSignin = class AdminSignin {
    constructor(userRepository, tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, phone, password } = data;
            if (email) {
                return this.signByEmail(email, password);
            }
            else if (phone) {
                return this.signByPhone(phone, password);
            }
            return null;
        });
    }
    signByEmail(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(email);
            if (user && user.isAdmin) {
                const isMatch = yield this.userRepository.comparePassword(password, user.password);
                if (isMatch) {
                    if (!user._id)
                        return null;
                    const accessToken = this.tokenService.generateAccessToken(user._id.toString(), "adminId");
                    const refreshToken = yield this.tokenService.generateRefreshToken(user._id.toString(), "adminId");
                    return { accessToken, refreshToken, user };
                }
            }
            return null;
        });
    }
    signByPhone(phone, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByPhone(phone);
            if (user && user.isAdmin) {
                const isMatch = yield this.userRepository.comparePassword(password, user.password);
                if (isMatch) {
                    if (!user._id)
                        return null;
                    const accessToken = this.tokenService.generateAccessToken(user._id.toString(), "adminId");
                    const refreshToken = yield this.tokenService.generateRefreshToken(user._id.toString(), "adminId");
                    return { accessToken, refreshToken, user };
                }
            }
            return null;
        });
    }
};
exports.AdminSignin = AdminSignin;
exports.AdminSignin = AdminSignin = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.UserRepository)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.TokenService)),
    __metadata("design:paramtypes", [Object, Object])
], AdminSignin);
