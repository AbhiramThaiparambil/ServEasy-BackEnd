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
const tsyringe_1 = require("tsyringe");
const GetProfile_1 = require("../../application/use-case/User/GetProfile");
const TokenService_1 = require("../../services/auth/TokenService");
const HttpStatus_1 = require("../../constants/HttpStatus");
const updateProfile_1 = require("../../application/use-case/User/updateProfile");
const RegisterUser_1 = require("../../application/use-case/User/auth/RegisterUser");
const setAuthCookies_1 = require("../../utils/setAuthCookies");
const SignIn_1 = require("../../application/use-case/User/auth/SignIn");
const VerifyOtp_1 = require("../../application/use-case/User/auth/VerifyOtp");
const ResendOtp_1 = require("../../application/use-case/User/auth/ResendOtp");
const sendOtp_1 = require("../../application/use-case/User/auth/forgotPassword/sendOtp");
const forgotVerifyOtp_1 = require("../../application/use-case/User/auth/forgotPassword/forgotVerifyOtp");
const NotificationUseCase_1 = require("../../application/use-case/notification/NotificationUseCase ");
const resetPassword_1 = require("../../application/use-case/User/auth/forgotPassword/resetPassword");
const profileUpdateOtp_1 = require("../../application/use-case/User/profileUpdateOtp");
const GetServics_1 = require("../../application/use-case/User/GetServics");
const getAllService_1 = require("../../application/use-case/User/getAllService");
const GetAddress_1 = require("../../application/use-case/User/Address/GetAddress");
const AddNewAddress_1 = require("../../application/use-case/User/Address/AddNewAddress");
const EditAddress_1 = require("../../application/use-case/User/Address/EditAddress");
const DeleteAddress_1 = require("../../application/use-case/User/Address/DeleteAddress");
const AddReviewUseCase_1 = require("../../application/use-case/bookService/AddReviewUseCase");
const getServiceProviderInfoUseCase_1 = require("../../application/use-case/User/getServiceProviderInfoUseCase");
const UserSiteSettingsUseCase_1 = require("../../application/use-case/siteSetting/UserSiteSettingsUseCase");
let UserController = class UserController {
    constructor(notificationUseCase, registerUser, signInUseCase, verifyOtpUseCase, resendOtpUseCase, tokenService, getUserProfileUseCase, sendOtpUseCase, forgotVerifyOtpUseCase, resetPasswordUseCase, userProfileUpdate, profileUpdateOtp, getServics, getAllActiveService, getAddressUseCase, addNewAddressUseCase, editAddressUseCase, deleteAddressUseCase, addReviewUseCase, getServiceProviderInfoUseCase, userSiteSettings) {
        this.notificationUseCase = notificationUseCase;
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
        this.getNotification = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
                if (!userId) {
                    res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: 'User not found' });
                    return;
                }
                const notification = yield this.notificationUseCase.getNotification(userId);
                res.status(HttpStatus_1.HttpStatus.OK).json(notification);
            }
            catch (error) {
                console.error(error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        });
        this.deleteNotification = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
                const { id } = req.params;
                if (!userId || !id) {
                    res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: 'User not found or missing ID' });
                    return;
                }
                if (id === 'deleteAll') {
                    yield this.notificationUseCase.delteAllNotification(userId);
                    res.status(HttpStatus_1.HttpStatus.OK).json({ message: 'All notifications deleted' });
                }
                else {
                    yield this.notificationUseCase.deleteSingleNotification(id);
                    res.status(HttpStatus_1.HttpStatus.OK).json({ message: 'Notification deleted' });
                }
            }
            catch (error) {
                console.error(error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        });
        this.markAsReadNotification = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'Notification ID is required' });
                    return;
                }
                yield this.notificationUseCase.markAsRead(id);
                res.status(HttpStatus_1.HttpStatus.OK).json({ message: 'Notification marked as read' });
            }
            catch (error) {
                console.error(error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        });
        this.registerUserController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName, email, password, phone } = req.body;
                if (!userName || !password) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'Username and password are required' });
                    return;
                }
                const data = {
                    userName,
                    password,
                };
                if (phone) {
                    data.phone = phone;
                }
                else if (email) {
                    data.email = email;
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'Either phone or email is required' });
                    return;
                }
                const result = yield this.registerUser.execute(data);
                if (result.user) {
                    const regInfo = result.user.phone ? result.user.phone : result.user.email;
                    const message = result.user.phone
                        ? 'OTP sent to phone'
                        : 'Your account has been successfully created';
                    res.status(HttpStatus_1.HttpStatus.CREATED).json({ message, regInfo });
                }
                else if (result.errorMessage) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: result.errorMessage });
                }
            }
            catch (error) {
                let errorMessage = '';
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                console.error('Registration error:', errorMessage);
                res
                    .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                    .json({ message: errorMessage || 'An unexpected error occurred' });
            }
        });
        this.signInUserController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { method } = req.params;
            try {
                if (method === 'email') {
                    const { email, password } = req.body;
                    if (!email || !password) {
                        res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ error: 'Email and password are required' });
                        return;
                    }
                    const result = yield this.signInUseCase.signInWithEmail(email, password);
                    if (result === null || result === void 0 ? void 0 : result.errorOtp) {
                        res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ errorOtp: result.errorOtp });
                        return;
                    }
                    if (result === null || result === void 0 ? void 0 : result.errorMessage) {
                        res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ error: result.errorMessage });
                        return;
                    }
                    if (result === null || result === void 0 ? void 0 : result.refreshToken) {
                        (0, setAuthCookies_1.setAuthCookies)(res, result.refreshToken);
                    }
                    res.status(HttpStatus_1.HttpStatus.OK).json({ accessToken: result === null || result === void 0 ? void 0 : result.accessToken });
                    return;
                }
                if (method === 'phone') {
                    const { phone, password } = req.body;
                    if (!phone || !password) {
                        res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ error: 'Phone and password are required' });
                        return;
                    }
                    const result = yield this.signInUseCase.signInWithPhone(phone, password);
                    if (result === null || result === void 0 ? void 0 : result.errorOtp) {
                        res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ errorOtp: result.errorOtp });
                        return;
                    }
                    if (result === null || result === void 0 ? void 0 : result.errorMessage) {
                        res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ error: result.errorMessage });
                        return;
                    }
                    if (result === null || result === void 0 ? void 0 : result.refreshToken) {
                        (0, setAuthCookies_1.setAuthCookies)(res, result.refreshToken);
                    }
                    res.status(HttpStatus_1.HttpStatus.OK).json({ accessToken: result === null || result === void 0 ? void 0 : result.accessToken });
                    return;
                }
                res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ error: 'Invalid login method' });
            }
            catch (error) {
                console.error(error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
            }
        });
        this.verifyOtpController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp, sender } = req.body;
                const result = yield this.verifyOtpUseCase.execute(sender, otp);
                console.log(result);
                if (result.success) {
                    res.status(HttpStatus_1.HttpStatus.OK).json({ message: result.success });
                }
                else if (result.errorMessage) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ errorMessage: result.errorMessage });
                }
            }
            catch (error) {
                console.error(error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
            }
        });
        this.resendOtpController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.email) {
                    const result = yield this.resendOtpUseCase.sendEmailOtp(req.body.email);
                    console.log(result);
                    res.status(HttpStatus_1.HttpStatus.OK).json({ message: result });
                    return;
                }
                else if (req.body.phone) {
                    const result = yield this.resendOtpUseCase.sendSmsOtp(req.body.phone);
                    res.status(HttpStatus_1.HttpStatus.OK).json({ message: result });
                    return;
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ errorMessage: 'Email or phone is required' });
                }
            }
            catch (error) {
                console.error(error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
            }
        });
        this.userProfileController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id) {
                    const user = yield this.getUserProfileUseCase.execute(req.params.id);
                    res.status(HttpStatus_1.HttpStatus.OK).json({
                        userAvatar: user === null || user === void 0 ? void 0 : user.profileImage,
                        userName: user === null || user === void 0 ? void 0 : user.userName,
                    });
                    return;
                }
                const authHeader = req.headers.authorization;
                if (!authHeader) {
                    res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized: No token provided' });
                    return;
                }
                const token = authHeader.split(' ')[1];
                const decoded = yield this.tokenService.verifyAccessToken(token);
                if (!decoded || !decoded.userId) {
                    res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: 'User not found' });
                    return;
                }
                const user = yield this.getUserProfileUseCase.execute(decoded.userId);
                res.status(HttpStatus_1.HttpStatus.OK).json({ user });
            }
            catch (error) {
                console.error('Error in userProfile:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        });
        this.sendOtpController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, phone } = req.body;
                if (!email && !phone) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'Email or phone number is required' });
                    return;
                }
                if (email) {
                    const message = yield this.sendOtpUseCase.sendEmailOtp(email);
                    if (message.successMessage) {
                        res.status(HttpStatus_1.HttpStatus.OK).json({ message });
                        return;
                    }
                    if (message.errorMessage) {
                        res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: message.errorMessage });
                        return;
                    }
                }
                if (phone) {
                    const message = yield this.sendOtpUseCase.sendSmsOtp(phone);
                    if (message.successMessage) {
                        res.status(HttpStatus_1.HttpStatus.OK).json({ message });
                        return;
                    }
                    if (message.errorMessage) {
                        res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: message.errorMessage });
                        return;
                    }
                }
            }
            catch (error) {
                console.error('sendOtp error:', error);
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Something went wrong. Please try again later.' });
            }
        });
        this.forgotVerifyOtp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp, key } = req.body;
                if (!otp || !key) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'OTP and key are required.' });
                    return;
                }
                const result = yield this.forgotVerifyOtpUseCase.execute(otp, key);
                if (result === true) {
                    res.status(HttpStatus_1.HttpStatus.OK).json({ message: 'OTP verified successfully.' });
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: 'OTP expired or invalid.' });
                }
            }
            catch (error) {
                console.error('Error in verifyOtp:', error);
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: 'Something went wrong. Please try again later.' });
            }
        });
        this.userProfileUpdateController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Request Body:', req.body);
                console.log('User ID:', req.params.userid);
                const { newEmail, newPhone, newUserName, NewProfileImage } = req.body;
                const userId = req.params.userid;
                if (!userId) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'User ID is required' });
                    return;
                }
                if (newUserName || NewProfileImage) {
                    yield this.userProfileUpdate.updateProfile(userId, newUserName, NewProfileImage);
                }
                let otpResponse;
                if (newEmail) {
                    otpResponse = yield this.userProfileUpdate.sendEmailOtp(newEmail);
                    if (otpResponse.errorMessage) {
                        res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: otpResponse.errorMessage });
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
                        res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: otpResponse.errorMessage });
                        return;
                    }
                    res.status(HttpStatus_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({
                        message: otpResponse.successMessage,
                        auth: otpResponse.auth,
                    });
                    return;
                }
                res.status(HttpStatus_1.HttpStatus.OK).json({ message: 'Profile updated successfully' });
                return;
            }
            catch (error) {
                console.error('Error updating profile:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
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
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ errorMessage: result.errorMessage });
                }
                else {
                    res
                        .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                        .json({ errorMessage: 'Internal server error' });
                }
            }
            catch (error) {
                console.error('Error in profileUpdateOtp:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ errorMessage: 'Internal server error' });
            }
        });
        this.logoutUserController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie('refreshToken', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                });
                if (req.cookies.serviceProviderToken) {
                    res.clearCookie('serviceProviderToken', {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                    });
                }
                res.status(HttpStatus_1.HttpStatus.OK).json({ message: 'User logged out successfully' });
            }
            catch (error) {
                console.error('Logout error:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        });
        this.getSingleServiceHandler = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log(id);
                if (!id) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'Service ID is required' });
                    return;
                }
                const data = yield this.getServics.execute(id);
                if (!data.services) {
                    res.status(HttpStatus_1.HttpStatus.NOT_FOUND).json({ message: 'Service not found' });
                    return;
                }
                res.status(HttpStatus_1.HttpStatus.OK).json(data);
            }
            catch (error) {
                console.error('Error fetching service:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        });
        this.userProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id) {
                    const user = yield this.getUserProfileUseCase.execute(req.params.id);
                    res.status(HttpStatus_1.HttpStatus.OK).json({
                        userAvatar: user === null || user === void 0 ? void 0 : user.profileImage,
                        userName: user === null || user === void 0 ? void 0 : user.userName,
                    });
                    return;
                }
                else {
                    const authHeader = req.headers.authorization;
                    if (!authHeader) {
                        res.status(401).json({ message: 'Unauthorized: No token provided' });
                        return;
                    }
                    const token = authHeader.split(' ')[1];
                    const decoded = yield this.tokenService.verifyAccessToken(token);
                    if (!decoded || !decoded.userId) {
                        res.status(401).json({ message: 'User not found' });
                        return;
                    }
                    const user = yield this.getUserProfileUseCase.execute(decoded.userId);
                    res.status(200).json({ user });
                }
            }
            catch (error) {
                console.error('Error in userProfile:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        });
        this.getActiveServices = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = parseInt(req.query.limit) || 10;
                const cursor = req.query.cursor;
                const result = yield this.getAllActiveService.execute({
                    limit,
                    cursor,
                });
                res.status(HttpStatus_1.HttpStatus.OK).json(result);
                return;
            }
            catch (e) {
                console.error(e);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'An error occurred while fetching services.',
                });
                return;
            }
        });
        this.getActiveNearbyServices = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const filters = req.query.filters;
                const { limit = 10, cursor = null } = req.query;
                console.log(req.query);
                const longitude = Number(req.query.longitude);
                const latitude = Number(req.query.latitude);
                const parsedFilters = {
                    category: filters === null || filters === void 0 ? void 0 : filters.category,
                    experience: (filters === null || filters === void 0 ? void 0 : filters.experience) ? parseInt(filters.experience) : undefined,
                    priceSort: filters === null || filters === void 0 ? void 0 : filters.priceSort,
                    searchQuery: filters === null || filters === void 0 ? void 0 : filters.searchQuery,
                };
                if (isNaN(longitude) || isNaN(latitude)) {
                    const result = yield this.getAllActiveService.getNearByservices(null, null, parsedFilters, Number(limit), cursor);
                    res.status(HttpStatus_1.HttpStatus.OK).json(result);
                    return;
                }
                const result = yield this.getAllActiveService.getNearByservices(longitude, latitude, parsedFilters, Number(limit), cursor);
                res.status(HttpStatus_1.HttpStatus.OK).json(result);
                return;
            }
            catch (e) {
                console.error(e);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'An error occurred while fetching services.',
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
                console.log('User ID:', userId);
                if (!userId) {
                    res.status(401).json({ message: 'Unauthorized: User ID missing' });
                    return;
                }
                const allAddress = yield this.getAddressUseCase.execute(userId);
                res.status(200).json({ allAddress });
                return;
            }
            catch (error) {
                console.error('Error fetching address:', error.message || error);
                res.status(500).json({ message: 'Failed to fetch address' });
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
                    res.status(401).json({ message: 'Unauthorized: User ID missing' });
                    return;
                }
                if (!address) {
                    res.status(400).json({ message: 'Address is required' });
                    return;
                }
                const result = yield this.addNewAddressUseCase.execute(userId, address);
                console.log(result);
                res.status(200).json({ message: 'Address added successfully' });
                return;
            }
            catch (error) {
                console.error('Error adding new address:', error);
                res.status(500).json({ message: 'Failed to add new address' });
                return;
            }
        });
        this.editAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                console.log('-9-0-0-0-0-0-0-0-0');
                console.log(req.body);
                const { address } = req.body;
                const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
                console.log('User ID:', userId, 'Updated Address:', address);
                if (!userId) {
                    res.status(401).json({ message: 'Unauthorized: User ID missing' });
                    return;
                }
                if (!address) {
                    res.status(400).json({ message: 'Updated address data is required' });
                    return;
                }
                yield this.editAddressUseCase.execute(userId, address);
                res.status(200).json({ message: 'Address updated successfully' });
                return;
            }
            catch (error) {
                console.error('Error updating address:', error);
                res.status(500).json({ message: 'Failed to update address' });
                return;
            }
        });
        this.deleteAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { id } = req.params;
                const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
                console.log('User ID:', userId, 'Address ID:', id);
                if (!userId) {
                    res.status(401).json({ message: 'Unauthorized: User ID missing' });
                    return;
                }
                if (!id) {
                    res.status(400).json({ message: 'Address ID is required' });
                    return;
                }
                yield this.deleteAddressUseCase.execute(userId, id);
                res.status(200).json({ message: 'Address deleted successfully' });
                return;
            }
            catch (error) {
                console.error('Error deleting address:', error);
                res.status(500).json({ message: 'Failed to delete address' });
                return;
            }
        });
        this.addReview = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { bookedServiceId, serviceId, rating, comment } = req.body;
                console.log(req.body);
                if (!bookedServiceId || !serviceId || rating === undefined) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        message: 'bookedServiceId, serviceId, and rating are required.',
                    });
                    return;
                }
                if (comment && typeof comment !== 'string') {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        message: 'Comment must be a string.',
                    });
                    return;
                }
                yield this.addReviewUseCase.execute(bookedServiceId, serviceId, rating, comment);
                res.status(HttpStatus_1.HttpStatus.CREATED).json({ message: 'Review added successfully!' });
            }
            catch (error) {
                console.error('Error adding review:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to add review.' });
            }
        });
        this.getServiceProviderInfoChat = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id) {
                    const user = yield this.getServiceProviderInfoUseCase.execute(req.params.id);
                    res.status(HttpStatus_1.HttpStatus.OK).json({
                        userAvatar: user === null || user === void 0 ? void 0 : user.profileImage,
                        userName: user === null || user === void 0 ? void 0 : user.serviceProviderName,
                    });
                    return;
                }
                res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'Service provider ID is required' });
            }
            catch (error) {
                console.error('Error in getServiceProviderInfoChat:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        });
        this.getSiteThemes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const themes = yield this.userSiteSettings.getThemes();
                console.log(themes);
                res.status(HttpStatus_1.HttpStatus.OK).json({ themes });
                return;
            }
            catch (error) {
                console.error('Error in getServiceProviderInfoChat:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        });
        this.getSiteBanners = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const banners = yield this.userSiteSettings.getBanners();
                res.status(HttpStatus_1.HttpStatus.OK).json(banners);
                return;
            }
            catch (error) {
                console.error('Error in getServiceProviderInfoChat:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, email, phone } = req.body;
                if (!password) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ Message: 'Password is required' });
                    return;
                }
                if (!email && !phone) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ Message: 'Email or phone is required' });
                    return;
                }
                let result;
                if (email) {
                    result = yield this.resetPasswordUseCase.resetPasswordEmail(password, email);
                }
                else {
                    result = yield this.resetPasswordUseCase.resetPasswordPhone(password, phone);
                }
                res.status(HttpStatus_1.HttpStatus.OK).json({ Message: result });
            }
            catch (error) {
                console.error('Error in resetPassword:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    Message: 'Something went wrong. Please try again later.',
                });
            }
        });
    }
};
exports.UserController = UserController;
exports.UserController = UserController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(NotificationUseCase_1.NotificationUseCase)),
    __param(1, (0, tsyringe_1.inject)(RegisterUser_1.RegisterUser)),
    __param(2, (0, tsyringe_1.inject)(SignIn_1.SignIn)),
    __param(3, (0, tsyringe_1.inject)(VerifyOtp_1.VerifyOtp)),
    __param(4, (0, tsyringe_1.inject)(ResendOtp_1.ResendOtp)),
    __param(5, (0, tsyringe_1.inject)(TokenService_1.TokenService)),
    __param(6, (0, tsyringe_1.inject)(GetProfile_1.GetUserProfileUseCase)),
    __param(7, (0, tsyringe_1.inject)(sendOtp_1.SendOtp)),
    __param(8, (0, tsyringe_1.inject)(forgotVerifyOtp_1.ForgotVerifyOtp)),
    __param(9, (0, tsyringe_1.inject)(resetPassword_1.ResetPassword)),
    __param(10, (0, tsyringe_1.inject)(updateProfile_1.UserProfileUpdate)),
    __param(11, (0, tsyringe_1.inject)(profileUpdateOtp_1.ProfileUpdateOtp)),
    __param(12, (0, tsyringe_1.inject)(GetServics_1.GetServics)),
    __param(13, (0, tsyringe_1.inject)(getAllService_1.GetAllActiveService)),
    __param(14, (0, tsyringe_1.inject)(GetAddress_1.GetAddress)),
    __param(15, (0, tsyringe_1.inject)(AddNewAddress_1.AddNewAddress)),
    __param(16, (0, tsyringe_1.inject)(EditAddress_1.EditAddress)),
    __param(17, (0, tsyringe_1.inject)(DeleteAddress_1.DeleteAddress)),
    __param(18, (0, tsyringe_1.inject)(AddReviewUseCase_1.AddReviewUseCase)),
    __param(19, (0, tsyringe_1.inject)(getServiceProviderInfoUseCase_1.GetServiceProviderInfoUseCase)),
    __param(20, (0, tsyringe_1.inject)(UserSiteSettingsUseCase_1.UserSiteSettings)),
    __metadata("design:paramtypes", [NotificationUseCase_1.NotificationUseCase,
        RegisterUser_1.RegisterUser,
        SignIn_1.SignIn,
        VerifyOtp_1.VerifyOtp,
        ResendOtp_1.ResendOtp,
        TokenService_1.TokenService,
        GetProfile_1.GetUserProfileUseCase,
        sendOtp_1.SendOtp,
        forgotVerifyOtp_1.ForgotVerifyOtp,
        resetPassword_1.ResetPassword,
        updateProfile_1.UserProfileUpdate,
        profileUpdateOtp_1.ProfileUpdateOtp,
        GetServics_1.GetServics,
        getAllService_1.GetAllActiveService,
        GetAddress_1.GetAddress,
        AddNewAddress_1.AddNewAddress,
        EditAddress_1.EditAddress,
        DeleteAddress_1.DeleteAddress,
        AddReviewUseCase_1.AddReviewUseCase,
        getServiceProviderInfoUseCase_1.GetServiceProviderInfoUseCase,
        UserSiteSettingsUseCase_1.UserSiteSettings])
], UserController);
