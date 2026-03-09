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
exports.Otpservice = void 0;
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../constants/tokens");
let Otpservice = class Otpservice {
    constructor(redisService) {
        this.redisService = redisService;
    }
    generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    saveOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.redisService.set(email, otp, 65);
        });
    }
    verifyOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const isValid = yield this.redisService.get(email);
            if (!isValid)
                return false;
            return isValid === otp ? true : false;
        });
    }
    removeOtp(key) {
        return __awaiter(this, void 0, void 0, function* () {
            this.redisService.delete(key);
        });
    }
};
exports.Otpservice = Otpservice;
exports.Otpservice = Otpservice = __decorate([
    (0, tsyringe_1.singleton)(),
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.RedisService)),
    __metadata("design:paramtypes", [Object])
], Otpservice);
