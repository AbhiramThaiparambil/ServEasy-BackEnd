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
exports.UserProfileUpdateUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../../../constants/tokens");
const errorUtils_1 = require("../../../../../utils/errorUtils");
let UserProfileUpdateUseCase = class UserProfileUpdateUseCase {
    constructor(cloudinaryService, userRepository, emailOtp, otpService, smsOtp) {
        this.cloudinaryService = cloudinaryService;
        this.userRepository = userRepository;
        this.emailOtp = emailOtp;
        this.otpService = otpService;
        this.smsOtp = smsOtp;
    }
    updateProfile(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, newUserName, newProfileImage, newPassword, oldPassword, } = request;
            let profile = "";
            if (newProfileImage) {
                profile = yield this.cloudinaryService.uploadUserProfile(newProfileImage);
            }
            const updateData = {};
            if (newUserName) {
                updateData["userName"] = newUserName;
            }
            if (profile) {
                updateData["profileImage"] = profile;
            }
            if (newPassword && oldPassword) {
                const user = yield this.userRepository.findById(userId);
                if (user) {
                    console.log();
                    const isCorrect = yield this.userRepository.comparePassword(oldPassword, user.password);
                    console.log(isCorrect);
                    if (isCorrect) {
                        console.log(newPassword);
                        const hashPassword = yield this.userRepository.HashPassword(newPassword);
                        updateData["password"] = hashPassword;
                    }
                    else {
                        if (!isCorrect) {
                            return {
                                updated: false,
                                message: "Old password is incorrect",
                            };
                        }
                    }
                }
            }
            if (Object.keys(updateData).length === 0) {
                return {
                    updated: false,
                    message: "No changes detected to update.",
                };
            }
            const result = yield this.userRepository.updateUserBasedId(userId, updateData);
            return { updated: true, result: result };
        });
    }
    sendEmailOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findByEmail(email);
                if (user) {
                    return {
                        errorMessage: "This email is already in use. Please enter a new one.",
                    };
                }
                const otp = this.otpService.generateOtp();
                this.otpService.saveOtp(email, otp);
                yield this.emailOtp.sendOtpEmail(email, otp);
                return {
                    successMessage: `OTP sent successfully to ${email}`,
                    auth: email,
                };
            }
            catch (error) {
                console.error("Error in sendEmailOtp:", (0, errorUtils_1.getErrorMessage)(error));
                return { errorMessage: "Failed to send OTP. Please try again." };
            }
        });
    }
    sendSmsOtp(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findByPhone(phone);
                if (user) {
                    return {
                        errorMessage: "This phone number is already in use. Please enter a new one.",
                    };
                }
                const otp = this.otpService.generateOtp();
                this.otpService.saveOtp(phone, otp);
                yield this.smsOtp.SendOtp(phone, otp);
                return {
                    successMessage: `OTP sent successfully to ${phone}`,
                    auth: phone,
                };
            }
            catch (error) {
                console.error("Error in sendSmsOtp:", (0, errorUtils_1.getErrorMessage)(error));
                return { errorMessage: "Failed to send OTP. Please try again." };
            }
        });
    }
};
exports.UserProfileUpdateUseCase = UserProfileUpdateUseCase;
exports.UserProfileUpdateUseCase = UserProfileUpdateUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.CloudinaryService)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.UserRepository)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.EmailService)),
    __param(3, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.OtpService)),
    __param(4, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.SmsOtpService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], UserProfileUpdateUseCase);
