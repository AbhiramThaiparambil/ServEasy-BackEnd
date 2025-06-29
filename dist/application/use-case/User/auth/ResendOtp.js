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
exports.ResendOtp = void 0;
const tsyringe_1 = require("tsyringe");
const OtpService_1 = require("../../../../services/OTP/OtpService");
const phoneOtp_1 = require("../../../../services/OTP/phoneOtp");
const mailOtp_1 = require("../../../../services/OTP/mailOtp");
let ResendOtp = class ResendOtp {
    constructor(emailOtp, smsOtp, otpService) {
        this.emailOtp = emailOtp;
        this.smsOtp = smsOtp;
        this.otpService = otpService;
    }
    sendEmailOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = this.otpService.generateOtp();
            this.otpService.saveOtp(email, otp);
            yield this.emailOtp.sendEmail(email, otp);
            return `otp send to ${email} successFully`;
        });
    }
    sendSmsOtp(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = this.otpService.generateOtp();
            this.otpService.saveOtp(phone, otp);
            yield this.smsOtp.SendOtp(phone, otp);
            return `otp send to ${phone} successFully`;
        });
    }
};
exports.ResendOtp = ResendOtp;
exports.ResendOtp = ResendOtp = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("EmailOtpService")),
    __param(1, (0, tsyringe_1.inject)("SmsOtpService")),
    __param(2, (0, tsyringe_1.inject)(OtpService_1.Otpservice)),
    __metadata("design:paramtypes", [mailOtp_1.EmailOtpService,
        phoneOtp_1.SmsOtpService,
        OtpService_1.Otpservice])
], ResendOtp);
