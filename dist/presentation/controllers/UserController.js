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
exports.UserController = void 0;
const requestUtils_1 = require("../../utils/requestUtils");
const tsyringe_1 = require("tsyringe");
const HttpStatus_1 = require("../../constants/HttpStatus");
const errorUtils_1 = require("../../utils/errorUtils");
const setAuthCookies_1 = require("../../utils/setAuthCookies");
const SignIn_usecase_1 = require("../../application/use-case/user/auth/signIn/SignIn.usecase");
const tokens_1 = require("../../constants/tokens");
let UserController = class UserController {
    constructor(markAsRead, deleteSingleNotification, delteAllNotification, getNotificationUsecase, registerUser, signInUseCase, verifyOtpUseCase, resendOtpUseCase, tokenService, getUserProfileUseCase, sendOtpUseCase, forgotVerifyOtpUseCase, resetPasswordUseCase, userProfileUpdate, profileUpdateOtp, getServics, getAllActiveService, getAddressUseCase, addNewAddressUseCase, editAddressUseCase, deleteAddressUseCase, addReviewUseCase, getServiceProviderInfoUseCase, userSiteSettings, findFeatureCouponsUseCase, recommendAdsUseCase, increaseAdClicksUseCase, googleAuthUseCase, findActiveCouponsusecase, applyCouponUseCase, removeCouponUseCase, autoSuggestionUseCase) {
        this.markAsRead = markAsRead;
        this.deleteSingleNotification = deleteSingleNotification;
        this.delteAllNotification = delteAllNotification;
        this.getNotificationUsecase = getNotificationUsecase;
        this.registerUser = registerUser;
        this.signInUseCase = signInUseCase;
        this.verifyOtpUseCase = verifyOtpUseCase;
        this.resendOtpUseCase = resendOtpUseCase;
        this.tokenService = tokenService;
        this.getUserProfileUseCase = getUserProfileUseCase;
        this.sendOtpUseCase = sendOtpUseCase;
        this.forgotVerifyOtpUseCase = forgotVerifyOtpUseCase;
        this.resetPasswordUseCase = resetPasswordUseCase;
        this.userProfileUpdate = userProfileUpdate;
        this.profileUpdateOtp = profileUpdateOtp;
        this.getServics = getServics;
        this.getAllActiveService = getAllActiveService;
        this.getAddressUseCase = getAddressUseCase;
        this.addNewAddressUseCase = addNewAddressUseCase;
        this.editAddressUseCase = editAddressUseCase;
        this.deleteAddressUseCase = deleteAddressUseCase;
        this.addReviewUseCase = addReviewUseCase;
        this.getServiceProviderInfoUseCase = getServiceProviderInfoUseCase;
        this.userSiteSettings = userSiteSettings;
        this.findFeatureCouponsUseCase = findFeatureCouponsUseCase;
        this.recommendAdsUseCase = recommendAdsUseCase;
        this.increaseAdClicksUseCase = increaseAdClicksUseCase;
        this.googleAuthUseCase = googleAuthUseCase;
        this.findActiveCouponsusecase = findActiveCouponsusecase;
        this.applyCouponUseCase = applyCouponUseCase;
        this.removeCouponUseCase = removeCouponUseCase;
        this.autoSuggestionUseCase = autoSuggestionUseCase;
        this.refreshToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                if (!refreshToken) {
                    res
                        .status(HttpStatus_1.HttpStatus.UNAUTHORIZED)
                        .json({ error: "Refresh token is missing" });
                    return;
                }
                const decoded = this.tokenService.verifyRefreshToken(refreshToken);
                if (!decoded) {
                    res
                        .status(HttpStatus_1.HttpStatus.UNAUTHORIZED)
                        .json({ error: "Invalid refresh token" });
                    return;
                }
                const response = yield this.getUserProfileUseCase.execute(decoded.userId);
                const user = response.user;
                if (!user) {
                    res.status(HttpStatus_1.HttpStatus.NOT_FOUND).json({ error: "User not found" });
                    return;
                }
                const newAccessToken = yield this.tokenService.generateAccessToken(user._id + "", "userId");
                res.status(HttpStatus_1.HttpStatus.OK).json({ accessToken: newAccessToken });
            }
            catch (error) {
                console.error("RefreshToken error:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ error: "Internal Server Error" });
            }
        });
        this.getNotification = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
                if (!userId) {
                    res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: "User not found" });
                    return;
                }
                const dto = { userId: userId };
                const notification = yield this.getNotificationUsecase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json(notification);
            }
            catch (error) {
                console.error((0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
            }
        });
        this.deleteNotification = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
                const id = (0, requestUtils_1.getString)(req.params.id);
                if (!userId || !id) {
                    res
                        .status(HttpStatus_1.HttpStatus.UNAUTHORIZED)
                        .json({ message: "User not found or missing ID" });
                    return;
                }
                if (id === "deleteAll") {
                    const dto = { userId };
                    yield this.delteAllNotification.execute(dto);
                    res
                        .status(HttpStatus_1.HttpStatus.OK)
                        .json({ message: "All notifications deleted" });
                }
                else {
                    const dto = { notificationId: id };
                    yield this.deleteSingleNotification.execute(dto);
                    res.status(HttpStatus_1.HttpStatus.OK).json({ message: "Notification deleted" });
                }
            }
            catch (error) {
                console.error((0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
            }
        });
        this.markAsReadNotification = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, requestUtils_1.getString)(req.params.id);
                if (!id) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Notification ID is required" });
                    return;
                }
                const dto = { notificationId: id };
                yield this.markAsRead.execute(dto);
                res
                    .status(HttpStatus_1.HttpStatus.OK)
                    .json({ message: "Notification marked as read" });
            }
            catch (error) {
                console.error((0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
            }
        });
        this.registerUserController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName, email, password, phone } = req.body;
                if (!userName || !password) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Username and password are required" });
                    return;
                }
                const dto = {
                    userName,
                    password,
                    phone,
                    email,
                };
                if (!dto.phone && !dto.email) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Either phone or email is required" });
                    return;
                }
                const result = yield this.registerUser.execute(dto);
                if ("errorMessage" in result) {
                    res
                        .status(HttpStatus_1.HttpStatus.UNAUTHORIZED)
                        .json({ error: result.errorMessage });
                    return;
                }
                const regInfo = result.user.phone ? result.user.phone : result.user.email;
                const message = result.user.phone
                    ? "OTP sent to phone"
                    : "Your account has been successfully created";
                res.status(HttpStatus_1.HttpStatus.CREATED).json({ message, regInfo });
            }
            catch (error) {
                const errorMessage = (0, errorUtils_1.getErrorMessage)(error);
                console.error("Registration error:", errorMessage);
                res
                    .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                    .json({ message: errorMessage || "An unexpected error occurred" });
            }
        });
        this.googleAuthController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { googleToken } = req.body;
                if (!googleToken) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Google token is required" });
                    return;
                }
                const dto = { googleToken };
                const result = yield this.googleAuthUseCase.execute(dto);
                (0, setAuthCookies_1.setAuthCookies)(res, "refreshToken", result.refreshToken);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    accessToken: result.accessToken,
                });
            }
            catch (error) {
                console.error("Google auth error:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Google authentication failed" });
            }
        });
        this.signInUserController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const method = (0, requestUtils_1.getString)(req.params.method);
            try {
                if (method === "email") {
                    const { email, password } = req.body;
                    if (!email || !password) {
                        res
                            .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                            .json({ error: "Email and password are required" });
                        return;
                    }
                    const dto = {
                        email,
                        password
                    };
                    const result = yield this.signInUseCase.signInWithEmail(dto);
                    if ("errorMessage" in result) {
                        res
                            .status(HttpStatus_1.HttpStatus.UNAUTHORIZED)
                            .json({ error: result.errorMessage });
                        return;
                    }
                    if (result === null || result === void 0 ? void 0 : result.refreshToken) {
                        (0, setAuthCookies_1.setAuthCookies)(res, "refreshToken", result.refreshToken);
                    }
                    res.status(HttpStatus_1.HttpStatus.OK).json({ accessToken: result === null || result === void 0 ? void 0 : result.accessToken });
                    return;
                }
                if (method === "phone") {
                    const { phone, password } = req.body;
                    if (!phone || !password) {
                        res
                            .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                            .json({ error: "Phone and password are required" });
                        return;
                    }
                    const dto = {
                        phone,
                        password
                    };
                    const result = yield this.signInUseCase.signInWithPhone(dto);
                    if ("errorMessage" in result) {
                        res
                            .status(HttpStatus_1.HttpStatus.UNAUTHORIZED)
                            .json({ error: result.errorMessage });
                        return;
                    }
                    if (result === null || result === void 0 ? void 0 : result.refreshToken) {
                        (0, setAuthCookies_1.setAuthCookies)(res, "refreshToken", result.refreshToken);
                    }
                    res.status(HttpStatus_1.HttpStatus.OK).json({ accessToken: result === null || result === void 0 ? void 0 : result.accessToken });
                    return;
                }
                res
                    .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                    .json({ error: "Invalid login method" });
            }
            catch (error) {
                console.error((0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ error: "Internal Server Error" });
            }
        });
        this.verifyOtpController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp, sender } = req.body;
                const dto = { otp, sender };
                const result = yield this.verifyOtpUseCase.execute(dto);
                console.log(result);
                if ("errorMessage" in result) {
                    res
                        .status(HttpStatus_1.HttpStatus.UNAUTHORIZED)
                        .json({ error: result.errorMessage });
                    return;
                }
                (0, setAuthCookies_1.setAuthCookies)(res, "refreshToken", result.refreshToken);
                res
                    .status(HttpStatus_1.HttpStatus.OK)
                    .json({ message: result.success, accessToken: result.accessToken });
            }
            catch (error) {
                console.error((0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal Server Error" });
            }
        });
        this.resendOtpController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.email) {
                    const dto = { email: req.body.email };
                    const result = yield this.resendOtpUseCase.sendEmailOtp(dto);
                    console.log(result);
                    res.status(HttpStatus_1.HttpStatus.OK).json({ message: result });
                    return;
                }
                else if (req.body.phone) {
                    const dto = { phone: req.body.phone };
                    const result = yield this.resendOtpUseCase.sendSmsOtp(dto);
                    res.status(HttpStatus_1.HttpStatus.OK).json({ message: result });
                    return;
                }
                else {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ errorMessage: "Email or phone is required" });
                }
            }
            catch (error) {
                console.error((0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal Server Error" });
            }
        });
        this.userProfileController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, requestUtils_1.getString)(req.params.id)) {
                    const response = yield this.getUserProfileUseCase.execute((0, requestUtils_1.getString)(req.params.id));
                    const user = response.user;
                    res.status(HttpStatus_1.HttpStatus.OK).json({
                        userAvatar: user === null || user === void 0 ? void 0 : user.profileImage,
                        userName: user === null || user === void 0 ? void 0 : user.userName,
                    });
                    return;
                }
                const authHeader = req.headers.authorization;
                if (!authHeader) {
                    res
                        .status(HttpStatus_1.HttpStatus.UNAUTHORIZED)
                        .json({ message: "Unauthorized: No token provided" });
                    return;
                }
                const token = authHeader.split(" ")[1];
                const decoded = yield this.tokenService.verifyAccessToken(token);
                if (!decoded || !decoded.userId) {
                    res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: "User not found" });
                    return;
                }
                const response = yield this.getUserProfileUseCase.execute(decoded.userId);
                res.status(HttpStatus_1.HttpStatus.OK).json({ user: response.user });
            }
            catch (error) {
                console.error("Error in userProfile:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
            }
        });
        this.sendOtpController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, phone } = req.body;
                if (!email && !phone) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Email or phone number is required" });
                }
                if (email) {
                    const dto = { email };
                    const message = yield this.sendOtpUseCase.sendEmailOtp(dto);
                    if (message.successMessage) {
                        res.status(HttpStatus_1.HttpStatus.OK).json({ message });
                    }
                    if (message.errorMessage) {
                        res
                            .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                            .json({ message: message.errorMessage });
                    }
                }
                if (phone) {
                    const dto = { phone };
                    const message = yield this.sendOtpUseCase.sendSmsOtp(dto);
                    if (message.successMessage) {
                        res.status(HttpStatus_1.HttpStatus.OK).json({ message });
                    }
                    if (message.errorMessage) {
                        res
                            .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                            .json({ message: message.errorMessage });
                    }
                }
            }
            catch (error) {
                console.error("sendOtp error:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Something went wrong. Please try again later." });
            }
        });
        this.forgotVerifyOtp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp, key } = req.body;
                console.log(console.log(req.body));
                if (!otp || !key) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "OTP and key are required." });
                    return;
                }
                const dto = { otp, sender: key };
                const result = yield this.forgotVerifyOtpUseCase.execute(dto);
                if (result === true) {
                    res
                        .status(HttpStatus_1.HttpStatus.OK)
                        .json({ message: "OTP verified successfully." });
                }
                else {
                    res
                        .status(HttpStatus_1.HttpStatus.UNAUTHORIZED)
                        .json({ message: "OTP expired or invalid." });
                }
            }
            catch (error) {
                console.error("Error in verifyOtp:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Something went wrong. Please try again later." });
            }
        });
        this.resetPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, email, phone } = req.body;
                if (!password) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ Message: "Password is required" });
                    return;
                }
                if (!email && !phone) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ Message: "Email or phone is required" });
                    return;
                }
                let result;
                if (email) {
                    const dto = { newPassword: password, email };
                    result = yield this.resetPasswordUseCase.resetPasswordEmail(dto);
                }
                else {
                    const dto = { newPassword: password, phone };
                    result = yield this.resetPasswordUseCase.resetPasswordPhone(dto);
                }
                res.status(HttpStatus_1.HttpStatus.OK).json({ Message: result });
            }
            catch (error) {
                console.error("Error in resetPassword:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    Message: "Something went wrong. Please try again later.",
                });
            }
        });
        this.userProfileUpdateController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { newEmail, newPhone, newUserName, NewProfileImage, newPassword, oldPassword, } = req.body;
                const userId = (0, requestUtils_1.getString)(req.params.userid);
                if (!userId) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "User ID is required" });
                    return;
                }
                if (newUserName || NewProfileImage || newPassword || oldPassword) {
                    const dto = {
                        userId,
                        newUserName,
                        newProfileImage: NewProfileImage,
                        newPassword,
                        oldPassword
                    };
                    const update = yield this.userProfileUpdate.updateProfile(dto);
                    if (!update.updated) {
                        res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: update.message });
                        return;
                    }
                    res
                        .status(HttpStatus_1.HttpStatus.OK)
                        .json({ message: "Profile updated successfully" });
                    return;
                }
                let otpResponse;
                if (newEmail) {
                    otpResponse = yield this.userProfileUpdate.sendEmailOtp(newEmail);
                    if (otpResponse.errorMessage) {
                        res
                            .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                            .json({ message: otpResponse.errorMessage });
                        return;
                    }
                    res.status(HttpStatus_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({
                        message: otpResponse.successMessage,
                        auth: otpResponse.auth,
                    });
                    return;
                }
                if (newPhone) {
                    otpResponse = yield this.userProfileUpdate.sendSmsOtp(newPhone);
                    if (otpResponse.errorMessage) {
                        res
                            .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                            .json({ message: otpResponse.errorMessage });
                        return;
                    }
                    res.status(HttpStatus_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({
                        message: otpResponse.successMessage,
                        auth: otpResponse.auth,
                    });
                    return;
                }
            }
            catch (error) {
                console.error("Error updating profile:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal Server Error" });
                return;
            }
        });
        this.profileUpdateOtpController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, key, otp } = req.body;
                const result = yield this.profileUpdateOtp.execute(userId, key, otp);
                if (result.success) {
                    res.status(HttpStatus_1.HttpStatus.OK).json({ message: result.success });
                }
                else if (result.errorMessage) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ errorMessage: result.errorMessage });
                }
                else {
                    res
                        .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                        .json({ errorMessage: "Internal server error" });
                }
            }
            catch (error) {
                console.error("Error in profileUpdateOtp:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ errorMessage: "Internal server error" });
            }
        });
        this.logoutUserController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("refreshToken", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                });
                if (req.cookies.serviceProviderToken) {
                    res.clearCookie("serviceProviderToken", {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        sameSite: "strict",
                    });
                }
                res
                    .status(HttpStatus_1.HttpStatus.OK)
                    .json({ message: "User logged out successfully" });
            }
            catch (error) {
                console.error("Logout error:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
            }
        });
        this.getSingleServiceHandler = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, requestUtils_1.getString)(req.params.id);
                console.log(id);
                if (!id) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Service ID is required" });
                    return;
                }
                const dto = { serviceId: id };
                const data = yield this.getServics.execute(dto);
                if (!data) {
                    res.status(HttpStatus_1.HttpStatus.NOT_FOUND).json({ message: "Service not found" });
                    return;
                }
                res.status(HttpStatus_1.HttpStatus.OK).json(data);
            }
            catch (error) {
                console.error("Error fetching service:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
            }
        });
        this.userProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id) {
                    const response = yield this.getUserProfileUseCase.execute((0, requestUtils_1.getString)(req.params.id));
                    const user = response.user;
                    res.status(HttpStatus_1.HttpStatus.OK).json({
                        userAvatar: user === null || user === void 0 ? void 0 : user.profileImage,
                        userName: user === null || user === void 0 ? void 0 : user.userName,
                    });
                    return;
                }
                else {
                    const authHeader = req.headers.authorization;
                    if (!authHeader) {
                        res.status(401).json({ message: "Unauthorized: No token provided" });
                        return;
                    }
                    const token = authHeader.split(" ")[1];
                    const decoded = yield this.tokenService.verifyAccessToken(token);
                    if (!decoded || !decoded.userId) {
                        res.status(401).json({ message: "User not found" });
                        return;
                    }
                    const response = yield this.getUserProfileUseCase.execute(decoded.userId);
                    res.status(200).json({ user: response.user });
                }
            }
            catch (error) {
                console.error("Error in userProfile:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
            }
        });
        this.getActiveServices = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const page = Math.max(Number(req.query.page) || 1, 1);
                const limit = Math.min(Number(req.query.limit) || 10, 50);
                const skip = (page - 1) * limit;
                console.log(limit);
                console.log(skip);
                const dto = { skip, limit };
                const result = yield this.getAllActiveService.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json(result);
                return;
            }
            catch (e) {
                console.error((0, errorUtils_1.getErrorMessage)(e));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "An error occurred while fetching services.",
                });
                return;
            }
        });
        this.getActiveNearbyServices = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
                const page = Math.max(Number(req.query.page) || 1, 1);
                const limit = Math.min(Number(req.query.limit) || 3);
                const skip = (page - 1) * limit;
                console.log(limit);
                console.log(skip);
                const longitude = req.query.longitude !== undefined ? Number(req.query.longitude) : null;
                const latitude = req.query.latitude !== undefined ? Number(req.query.latitude) : null;
                const parsedFilters = {
                    category: req.query.category,
                    experience: req.query.experience
                        ? parseInt(req.query.experience.replace("+", ""), 10)
                        : undefined,
                    priceSort: req.query.priceSort,
                    searchQuery: req.query.searchQuery,
                };
                console.log("Parsed Filters:", parsedFilters);
                console.log("Pagination:", { page, limit, skip });
                // if (isNaN(longitude) || isNaN(latitude)) {
                //   const result = await this.getAllActiveService.getNearByServices(
                //     userId,
                //     skip,
                //     limit,
                //     null,
                //     null,
                //     parsedFilters,
                //   );
                //   res.status(HttpStatus.OK).json(result);
                //   return;
                // }
                const dto = {
                    userId,
                    skip,
                    limit,
                    userLongitude: longitude,
                    userLatitude: latitude,
                    filters: parsedFilters
                };
                const result = yield this.getAllActiveService.getNearByServices(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json(result);
                return;
            }
            catch (e) {
                console.error((0, errorUtils_1.getErrorMessage)(e));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "An error occurred while fetching services.",
                });
                return;
            }
        });
        //  public getActiveServices = async (
        //   req: Request,
        //   res: Response
        // ): Promise<void> => {
        //   try {
        //     const {
        //       userLongitude,
        //       userLatitude,
        //       category,
        //       experienceSort,
        //       priceSort,
        //       ratingFilter,
        //       searchQuery,
        //     } = req.query;
        //     const longitude = Number(userLongitude);
        //     const latitude = Number(userLatitude);
        //     const userId = res.locals.user?.userId;
        //     const filters = {
        //       category: category?.toString(),
        //       experienceSort: experienceSort?.toString(),
        //       priceSort: priceSort?.toString(),
        //       ratingFilter: ratingFilter ? Number(ratingFilter) : null,
        //       searchQuery: searchQuery?.toString(),
        //     };
        //     let result;
        //     console.log(req.query);
        //     console.log("____________________________________________");
        //     console.log("____________________________________________");
        //     console.log("____________________________________________");
        //     if (!isNaN(longitude) && !isNaN(latitude)) {
        //       result = await this.getAllActiveService.getNearByservices(
        //         longitude,
        //         latitude,
        //         userId,
        //         filters
        //       );
        //       console.log(result);
        //     } else {
        //       result = await this.getAllActiveService.execute(userId);
        //     }
        //     res.status(HttpStatus.OK).json(result);
        //     return;
        //   } catch (e) {
        //     console.error(e);
        //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        //       message: "An error occurred while fetching services.",
        //     });
        //     return;
        //   }
        // };
        this.getAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
                console.log("User ID:", userId);
                if (!userId) {
                    res.status(401).json({ message: "Unauthorized: User ID missing" });
                    return;
                }
                const dto = { userId };
                const allAddress = yield this.getAddressUseCase.execute(dto);
                res.status(200).json({ allAddress });
                return;
            }
            catch (error) {
                console.error("Error fetching address:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(500).json({ message: "Failed to fetch address" });
                return;
            }
        });
        this.addNewAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { address } = req.body;
                const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
                console.log(userId, address);
                if (!userId) {
                    res.status(401).json({ message: "Unauthorized: User ID missing" });
                    return;
                }
                if (!address) {
                    res.status(400).json({ message: "Address is required" });
                    return;
                }
                const dto = { userId, address };
                const result = yield this.addNewAddressUseCase.execute(dto);
                console.log(result);
                res.status(200).json({ message: "Address added successfully" });
                return;
            }
            catch (error) {
                console.error("Error adding new address:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(500).json({ message: "Failed to add new address" });
                return;
            }
        });
        this.editAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                console.log(req.body);
                const { address } = req.body;
                const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
                console.log("User ID:", userId, "Updated Address:", address);
                if (!userId) {
                    res.status(401).json({ message: "Unauthorized: User ID missing" });
                    return;
                }
                if (!address) {
                    res.status(400).json({ message: "Updated address data is required" });
                    return;
                }
                const dto = { userId, address };
                yield this.editAddressUseCase.execute(dto);
                res.status(200).json({ message: "Address updated successfully" });
                return;
            }
            catch (error) {
                console.error("Error updating address:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(500).json({ message: "Failed to update address" });
                return;
            }
        });
        this.deleteAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (0, requestUtils_1.getString)(req.params.id);
                const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
                console.log("User ID:", userId, "Address ID:", id);
                if (!userId) {
                    res.status(401).json({ message: "Unauthorized: User ID missing" });
                    return;
                }
                if (!id) {
                    res.status(400).json({ message: "Address ID is required" });
                    return;
                }
                const dto = { userId, addressId: id };
                yield this.deleteAddressUseCase.execute(dto);
                res.status(200).json({ message: "Address deleted successfully" });
                return;
            }
            catch (error) {
                console.error("Error deleting address:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(500).json({ message: "Failed to delete address" });
                return;
            }
        });
        this.addReview = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Adding review with body:", req.body);
                const { bookedServiceId, serviceId, rating, comment, userId } = req.body;
                if (!bookedServiceId || !serviceId || rating === undefined) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        message: "bookedServiceId, serviceId, and rating are required.",
                    });
                    return;
                }
                if (comment && typeof comment !== "string") {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        message: "Comment must be a string.",
                    });
                    return;
                }
                const reviewData = {
                    bookedServiceId,
                    serviceId,
                    rating,
                    comment,
                    userId,
                };
                yield this.addReviewUseCase.execute(reviewData);
                res
                    .status(HttpStatus_1.HttpStatus.CREATED)
                    .json({ message: "Review added successfully!" });
            }
            catch (error) {
                console.error("Error adding review:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Failed to add review." });
            }
        });
        this.getServiceProviderInfoChat = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, requestUtils_1.getString)(req.params.id)) {
                    const dto = { userId: (0, requestUtils_1.getString)(req.params.id) };
                    const user = yield this.getServiceProviderInfoUseCase.execute(dto);
                    res.status(HttpStatus_1.HttpStatus.OK).json({
                        userAvatar: user === null || user === void 0 ? void 0 : user.profileImage,
                        userName: user === null || user === void 0 ? void 0 : user.serviceProviderName,
                    });
                    return;
                }
                res
                    .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                    .json({ message: "Service provider ID is required" });
            }
            catch (error) {
                console.error("Error in getServiceProviderInfoChat:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
            }
        });
        this.getSiteThemes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userSiteSettings.getThemes();
                console.log(result.themes);
                res.status(HttpStatus_1.HttpStatus.OK).json(result);
                return;
            }
            catch (error) {
                console.error("Error in getSiteThemes:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
            }
        });
        this.removeCoupon = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingId = (0, requestUtils_1.getString)(req.params.bookingId);
                const dto = { bookingId };
                const result = yield this.removeCouponUseCase.execute(dto);
                if (result.success) {
                    res.status(HttpStatus_1.HttpStatus.OK).json(result);
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json(result);
                }
            }
            catch (err) {
                console.error("Error removing coupon:", (0, errorUtils_1.getErrorMessage)(err));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: "Failed to remove coupon" });
            }
        });
        this.applyCoupon = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { couponCode, bookingId } = req.body;
                const dto = { couponCode, bookingId };
                const result = yield this.applyCouponUseCase.execute(dto);
                if (result.success) {
                    res.status(HttpStatus_1.HttpStatus.OK).json(result);
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json(result);
                }
            }
            catch (error) {
                console.error("Error applying coupon:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Failed to apply coupon" });
            }
        });
        this.getSiteBanners = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userSiteSettings.getBanners();
                res.status(HttpStatus_1.HttpStatus.OK).json(result);
                return;
            }
            catch (error) {
                console.error("Error in getSiteBanners:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
            }
        });
        this.findFeatureCoupons = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const skip = Number(req.query.skip) || 0;
                const dto = { skip };
                const data = yield this.findFeatureCouponsUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json(data);
            }
            catch (error) {
                console.error("Error fetching featured coupons:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Something went wrong" });
            }
        });
        this.findActiveCoupons = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.findActiveCouponsusecase.execute();
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    success: true,
                    message: "Active coupons fetched successfully",
                    data: result.coupons,
                });
                return;
            }
            catch (error) {
                console.error("Find active coupons error:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Failed to fetch active coupons",
                });
                return;
            }
        });
        this.getRecommendedAds = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('hey hey ads requesteeddd ');
                const dto = {
                    count: req.query.count ? Number(req.query.count) : 1,
                    category: req.query.category,
                    providerId: req.query.providerId,
                    lat: req.query.lat ? Number(req.query.lat) : undefined,
                    lng: req.query.lng ? Number(req.query.lng) : undefined,
                    radius: req.query.radius ? Number(req.query.radius) : undefined,
                };
                const ads = yield this.recommendAdsUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    success: true,
                    count: ads.length,
                    ads,
                });
            }
            catch (error) {
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: (0, errorUtils_1.getErrorMessage)(error) });
            }
        });
        this.increaseClicks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const adId = (0, requestUtils_1.getString)(req.params.adId);
                const dto = { adId };
                const result = yield this.increaseAdClicksUseCase.execute(dto);
                res.status(200).json({
                    success: true,
                    message: "Clicks updated",
                    clicks: result,
                });
            }
            catch (err) {
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: (0, errorUtils_1.getErrorMessage)(err) });
            }
        });
        this.getAutoSuggestions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { query } = req.query;
                if (!query || typeof query !== "string") {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Query parameter is required" });
                    return;
                }
                const dto = { query };
                const result = yield this.autoSuggestionUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({ success: true, suggestions: result.suggestions });
            }
            catch (error) {
                console.error("Error fetching auto suggestions:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: (0, errorUtils_1.getErrorMessage)(error) || "Something went wrong" });
            }
        });
    }
};
exports.UserController = UserController;
exports.UserController = UserController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.MarkNotificationAsReadUseCase)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.DeleteSingleNotificationUseCase)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.DeleteAllNotificationUseCase)),
    __param(3, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetNotificationUseCase)),
    __param(4, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.SignUpUseCase)),
    __param(5, (0, tsyringe_1.inject)(SignIn_usecase_1.SignIn)),
    __param(6, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.VerifyOtpUseCase)),
    __param(7, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.ResendOtpUseCase)),
    __param(8, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.TokenService)),
    __param(9, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetUserProfileUseCase)),
    __param(10, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.SendForgotPasswordOtpUseCase)),
    __param(11, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.VerifyForgotPasswordOtpUseCase)),
    __param(12, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.ResetPasswordUseCase)),
    __param(13, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.UserProfileUpdateUseCase)),
    __param(14, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.ProfileUpdateOtpUseCase)),
    __param(15, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetSingleServiceUseCase)),
    __param(16, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetAllActiveServiceUseCase)),
    __param(17, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetAddress)),
    __param(18, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.AddNewAddress)),
    __param(19, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.EditAddress)),
    __param(20, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.DeleteAddress)),
    __param(21, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.AddReviewUseCase)),
    __param(22, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetServiceProviderInfoUseCase)),
    __param(23, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.UserSiteSettings)),
    __param(24, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.FindFeaturedCouponsUseCase)),
    __param(25, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.RecommendAdsUseCase)),
    __param(26, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.IncreaseAdClicksUseCase)),
    __param(27, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GoogleAuthUseCase)),
    __param(28, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.FindAllActiveCouponsUseCase)),
    __param(29, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.ApplyCouponToBookingUseCase)),
    __param(30, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.RemoveCouponToBookingUseCase)),
    __param(31, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.AutoSuggestion)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, SignIn_usecase_1.SignIn, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], UserController);
