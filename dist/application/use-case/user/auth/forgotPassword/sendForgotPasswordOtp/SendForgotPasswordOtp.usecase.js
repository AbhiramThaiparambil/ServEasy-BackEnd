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
exports.SendForgotPasswordOtpUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../../../../constants/tokens");
const errorUtils_1 = require("../../../../../../utils/errorUtils");
let SendForgotPasswordOtpUseCase = class SendForgotPasswordOtpUseCase {
    constructor(userRepository, emailOtp, otpService, smsOtp) {
        this.userRepository = userRepository;
        this.emailOtp = emailOtp;
        this.otpService = otpService;
        this.smsOtp = smsOtp;
    }
    sendEmailOtp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = data;
            if (!email)
                return { errorMessage: "Email is required" };
            try {
                const user = yield this.userRepository.findByEmail(email);
                if (!user)
                    return { errorMessage: "User does not exist. Please sign in." };
                const otp = this.otpService.generateOtp();
                this.otpService.saveOtp(email, otp);
                yield this.emailOtp.sendOtpEmail(email, otp);
                return { successMessage: `OTP sent successfully to ${email}` };
            }
            catch (error) {
                console.error("Error in sendEmailOtp:", (0, errorUtils_1.getErrorMessage)(error));
                return { errorMessage: "Failed to send OTP. Please try again." };
            }
        });
    }
    sendSmsOtp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phone } = data;
            if (!phone)
                return { errorMessage: "Phone is required" };
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
                console.error("Error in sendSmsOtp:", (0, errorUtils_1.getErrorMessage)(error));
                return { errorMessage: "Failed to send OTP. Please try again." };
            }
        });
    }
};
exports.SendForgotPasswordOtpUseCase = SendForgotPasswordOtpUseCase;
exports.SendForgotPasswordOtpUseCase = SendForgotPasswordOtpUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.UserRepository)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.EmailService)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.OtpService)),
    __param(3, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.SmsOtpService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], SendForgotPasswordOtpUseCase);
