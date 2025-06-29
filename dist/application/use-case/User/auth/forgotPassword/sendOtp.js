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
exports.SendOtp = void 0;
const tsyringe_1 = require("tsyringe");
const mailOtp_1 = require("../../../../../services/OTP/mailOtp");
const OtpService_1 = require("../../../../../services/OTP/OtpService");
const phoneOtp_1 = require("../../../../../services/OTP/phoneOtp");
let SendOtp = class SendOtp {
    constructor(userRepository, emailOtp, otpService, smsOtp) {
        this.userRepository = userRepository;
        this.emailOtp = emailOtp;
        this.otpService = otpService;
        this.smsOtp = smsOtp;
    }
    sendEmailOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findByEmail(email);
                if (!user)
                    return { errorMessage: "User does not exist. Please sign in." };
                const otp = this.otpService.generateOtp();
                this.otpService.saveOtp(email, otp);
                yield this.emailOtp.sendEmail(email, otp);
                return { successMessage: `OTP sent successfully to ${email}` };
            }
            catch (error) {
                console.error("Error in sendEmailOtp:", error);
                return { errorMessage: "Failed to send OTP. Please try again." };
            }
        });
    }
    sendSmsOtp(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findByPhone(phone);
                if (!user)
                    return { errorMessage: "User does not exist. Please sign in." };
                const otp = this.otpService.generateOtp();
                this.otpService.saveOtp(phone, otp);
                yield this.smsOtp.SendOtp(phone, otp);
                return { successMessage: `OTP sent successfully to ${phone}` };
            }
            catch (error) {
                console.error("Error in sendSmsOtp:", error);
                return { errorMessage: "Failed to send OTP. Please try again." };
            }
        });
    }
};
exports.SendOtp = SendOtp;
exports.SendOtp = SendOtp = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UserRepository")),
    __param(1, (0, tsyringe_1.inject)("EmailOtpService")),
    __param(2, (0, tsyringe_1.inject)(OtpService_1.Otpservice)),
    __param(3, (0, tsyringe_1.inject)("SmsOtpService")),
    __metadata("design:paramtypes", [Object, mailOtp_1.EmailOtpService,
        OtpService_1.Otpservice,
        phoneOtp_1.SmsOtpService])
], SendOtp);
