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
exports.ServiceProviderController = void 0;
const requestUtils_1 = require("../../utils/requestUtils");
const errorUtils_1 = require("../../utils/errorUtils");
const tsyringe_1 = require("tsyringe");
const GetPaymentInfoUseCase_1 = require("../../application/use-case/serviceProvider/payments/getPaymentInfo/GetPaymentInfoUseCase");
const HttpStatus_1 = require("../../constants/HttpStatus");
const RegisterServiceProvider_1 = require("../../application/use-case/serviceProvider/auth/RegisterServiceProvider");
const UpdateUserWithServiceProvider_1 = require("../../application/use-case/serviceProvider/auth/UpdateUserWithServiceProvider");
const VerifyServiceProvider_1 = require("../../application/use-case/serviceProvider/verification/verifyServiceProvider/VerifyServiceProvider");
const CheckServiceProviderAvailabilityUseCase_1 = require("../../application/use-case/serviceProvider/availability/checkAvailability/CheckServiceProviderAvailabilityUseCase");
const setAuthCookies_1 = require("../../utils/setAuthCookies");
const tokens_1 = require("../../constants/tokens");
const GetServiceProvider_1 = require("../../application/use-case/serviceProvider/profile/getProfile/GetServiceProvider");
let ServiceProviderController = class ServiceProviderController {
    constructor(getPaymentInfo, getServiceProviderUseCase, editServiceProviderProfileUseCase, getSubscriptionPlanUseCase, registerServiceProviderUseCase, updateUserWithServiceProvider, verifyServiceProviderUseCase, getCategoryUseCase, manageAllServiceUseCase, checkServiceProviderAvailabilityUseCase, getWalletUseCase, withdrawPaymentUseCase, getSubscriptionPlansUseCase, editAdUseCase, createAdUseCase, getProviderAdsUseCase, getServiceNamesUseCase, changeAdStatusUseCase, getRegistrationDetailsUseCase, getServiceProviderStatusUseCase, reapplyServiceProviderUseCase, getNotificationUsecase, markAsRead, createAiChatUseCase, getAIChatByIdUseCase, getProviderAIChatsUseCase, addNewServiceUseCase, blockUnblockServiceUseCase, editServiceUseCase, getServicesUseCase, markSlotAsBookedUseCase) {
        this.getPaymentInfo = getPaymentInfo;
        this.getServiceProviderUseCase = getServiceProviderUseCase;
        this.editServiceProviderProfileUseCase = editServiceProviderProfileUseCase;
        this.getSubscriptionPlanUseCase = getSubscriptionPlanUseCase;
        this.registerServiceProviderUseCase = registerServiceProviderUseCase;
        this.updateUserWithServiceProvider = updateUserWithServiceProvider;
        this.verifyServiceProviderUseCase = verifyServiceProviderUseCase;
        this.getCategoryUseCase = getCategoryUseCase;
        this.manageAllServiceUseCase = manageAllServiceUseCase;
        this.checkServiceProviderAvailabilityUseCase = checkServiceProviderAvailabilityUseCase;
        this.getWalletUseCase = getWalletUseCase;
        this.withdrawPaymentUseCase = withdrawPaymentUseCase;
        this.getSubscriptionPlansUseCase = getSubscriptionPlansUseCase;
        this.editAdUseCase = editAdUseCase;
        this.createAdUseCase = createAdUseCase;
        this.getProviderAdsUseCase = getProviderAdsUseCase;
        this.getServiceNamesUseCase = getServiceNamesUseCase;
        this.changeAdStatusUseCase = changeAdStatusUseCase;
        this.getRegistrationDetailsUseCase = getRegistrationDetailsUseCase;
        this.getServiceProviderStatusUseCase = getServiceProviderStatusUseCase;
        this.reapplyServiceProviderUseCase = reapplyServiceProviderUseCase;
        this.getNotificationUsecase = getNotificationUsecase;
        this.markAsRead = markAsRead;
        this.createAiChatUseCase = createAiChatUseCase;
        this.getAIChatByIdUseCase = getAIChatByIdUseCase;
        this.getProviderAIChatsUseCase = getProviderAIChatsUseCase;
        this.addNewServiceUseCase = addNewServiceUseCase;
        this.blockUnblockServiceUseCase = blockUnblockServiceUseCase;
        this.editServiceUseCase = editServiceUseCase;
        this.getServicesUseCase = getServicesUseCase;
        this.markSlotAsBookedUseCase = markSlotAsBookedUseCase;
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
                console.log((0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
            }
        });
        this.withdrawPayment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceProviderId = res.locals.serviceProvider_id;
                const { amount } = req.body;
                if (!amount || !serviceProviderId) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Amount and Service Provider ID are required" });
                    return;
                }
                const dto = {
                    serviceProviderId,
                    amount
                };
                const result = yield this.withdrawPaymentUseCase.execute(dto);
                if (result.success) {
                    res.status(HttpStatus_1.HttpStatus.OK).json(result);
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json(result);
                }
            }
            catch (error) {
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: (0, errorUtils_1.getErrorMessage)(error) });
            }
        });
    }
    getRegistrationDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
                if (!userId) {
                    res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
                    return;
                }
                const dto = { userId };
                const provider = yield this.getRegistrationDetailsUseCase.execute(dto);
                console.log(provider);
                if (provider) {
                    res.status(200).json(provider);
                    return;
                }
                else {
                    res
                        .status(HttpStatus_1.HttpStatus.NOT_FOUND)
                        .json({ message: "No service provider registration found" });
                    return;
                }
            }
            catch (error) {
                res.status(404).json({
                    message: (0, errorUtils_1.getErrorMessage)(error) || "Unable to fetch registration details",
                });
                return;
            }
        });
    }
    getServiceProviderStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
                if (!userId) {
                    res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
                    return;
                }
                const dto = { userId };
                const result = yield this.getServiceProviderStatusUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json(result);
                return;
            }
            catch (error) {
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "Unable to fetch service provider status",
                });
            }
        });
    }
    getNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceProviderId = res.locals.serviceProvider_id;
                if (!serviceProviderId) {
                    res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: "User not found" });
                    return;
                }
                const dto = { userId: serviceProviderId };
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
    }
    getPaymentInfoForChartServiceProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getPaymentInfo is:", this.getPaymentInfo);
            try {
                const endDate = req.query.endDate
                    ? new Date((0, requestUtils_1.getString)(req.query.endDate))
                    : undefined;
                const startDate = req.query.startDate
                    ? new Date((0, requestUtils_1.getString)(req.query.startDate))
                    : undefined;
                const serviceProviderId = res.locals.serviceProvider_id;
                const dto = {
                    serviceProviderId,
                    startDate,
                    endDate,
                };
                const paymentData = yield this.getPaymentInfo.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({ paymentData });
                return;
            }
            catch (error) {
                console.error("Failed to fetch payment info for chart:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal Server Error" });
                return;
            }
        });
    }
    handleChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceProviderId = res.locals.serviceProvider_id;
                const { prompt, activeChatId } = req.body;
                const dto = {
                    serviceProviderId,
                    prompt,
                    activeChatId,
                };
                const result = yield this.createAiChatUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({ success: true, data: result });
            }
            catch (error) {
                console.error("Error in AI Assistance Controller:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: "Internal server error" });
            }
        });
    }
    getChatHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chatId = (0, requestUtils_1.getString)(req.params.chatId);
                const dto = { id: chatId };
                const chat = yield this.getAIChatByIdUseCase.execute(dto);
                if (!chat) {
                    res
                        .status(HttpStatus_1.HttpStatus.NOT_FOUND)
                        .json({ success: false, message: "Chat not found" });
                    return;
                }
                res.status(HttpStatus_1.HttpStatus.OK).json({ success: true, data: chat });
            }
            catch (error) {
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: "Internal server error" });
            }
        });
    }
    getProviderChats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const providerId = res.locals.serviceProvider_id;
                const dto = { providerId };
                const chats = yield this.getProviderAIChatsUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({ success: true, data: chats });
            }
            catch (error) {
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: "Internal server error" });
            }
        });
    }
    createAd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body.data;
                console.log(req.body);
                console.log("data", data);
                const createdAd = yield this.createAdUseCase.execute(data);
                if (createdAd) {
                    res.status(HttpStatus_1.HttpStatus.OK).json({
                        message: "Ad creation request submitted successfully. Waiting for admin approval.",
                        adObject: createdAd,
                    });
                }
                else {
                    res
                        .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                        .json({ message: "Failed to create ad." });
                }
            }
            catch (error) {
                console.error("Error creating ad:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error." });
            }
        });
    }
    updateServiceProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceProviderId = res.locals.serviceProvider_id;
                if (!serviceProviderId) {
                    res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
                    return;
                }
                const dto = Object.assign({ serviceProviderId }, req.body);
                const updated = yield this.editServiceProviderProfileUseCase.execute(dto);
                if (updated) {
                    res
                        .status(HttpStatus_1.HttpStatus.OK)
                        .json({ message: "Service provider updated successfully" });
                }
                else {
                    res
                        .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                        .json({ message: "Failed to update service provider" });
                }
            }
            catch (error) {
                console.error("Error updating service provider:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal Server Error" });
            }
        });
    }
    editAd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adId = (0, requestUtils_1.getString)(req.params.adId);
                const updateData = req.body;
                console.log(req.body);
                const dto = { adId, updateData };
                const updatedAd = yield this.editAdUseCase.execute(dto);
                if (updatedAd) {
                    res
                        .status(HttpStatus_1.HttpStatus.OK)
                        .json({ message: "Ad updated successfully.", adObject: updatedAd });
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.NOT_FOUND).json({ message: "Ad not found." });
                }
            }
            catch (error) {
                console.error("Error editing ad:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error." });
            }
        });
    }
    registerServiceProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, bankDetails } = req.body;
                const { serviceProviderName, serviceProviderEmail, serviceProviderPhone, businessType, category, subcategory, experience, location, serviceMode, services, skills, profileImage, documentImg, documentImg2, socialMedia, description, } = data;
                const serviceProviderData = {
                    serviceProviderName,
                    serviceProviderEmail,
                    serviceProviderPhone,
                    experience: parseInt(experience, 10),
                    location,
                    services,
                    skills,
                    serviceMode,
                    profileImage: "",
                    document: [],
                    businessType,
                    category,
                    subcategory,
                    socialMedia: socialMedia + "",
                    description: description || "",
                    userId: res.locals.user.userId,
                    bankDetails,
                };
                const registerDTO = {
                    serviceProviderData,
                    profileImageRow: profileImage || "",
                    documentRow: documentImg || "",
                    document2Row: documentImg2 || null,
                };
                const serviceProvider = yield this.registerServiceProviderUseCase.execute(registerDTO);
                const user = res.locals.user;
                if (user.userId && serviceProvider._id) {
                    const updateDTO = {
                        userId: user.userId,
                        serviceProviderId: serviceProvider._id.toString(),
                    };
                    yield this.updateUserWithServiceProvider.execute(updateDTO);
                }
                res.status(HttpStatus_1.HttpStatus.CREATED).json({
                    message: "Service provider registered successfully.",
                    serviceProvider,
                });
            }
            catch (error) {
                console.error("Registration error:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "An error occurred while registering the service provider.",
                });
            }
        });
    }
    reapplyServiceProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, bankDetails } = req.body;
                const { serviceProviderName, serviceProviderEmail, serviceProviderPhone, businessType, category, subcategory, experience, location, serviceMode, services, skills, profileImage, documentImg, documentImg2, socialMedia, description, } = data;
                const serviceProviderData = {
                    serviceProviderName,
                    serviceProviderEmail,
                    serviceProviderPhone,
                    experience: parseInt(experience, 10),
                    location,
                    services,
                    skills,
                    serviceMode,
                    profileImage: "",
                    document: [],
                    businessType,
                    category,
                    subcategory,
                    socialMedia: socialMedia + "",
                    description: description || "",
                    userId: res.locals.user.userId,
                    bankDetails,
                };
                const reapplyDTO = {
                    serviceProviderData,
                    profileImageRow: profileImage || null,
                    documentRow: documentImg || null,
                    document2Row: documentImg2 || null,
                };
                const serviceProvider = yield this.reapplyServiceProviderUseCase.execute(reapplyDTO);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    message: "Service provider reapplied successfully.",
                    serviceProvider,
                });
            }
            catch (error) {
                console.error("Reapply error:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "An error occurred while reapplying as a service provider.",
                });
            }
        });
    }
    verifyServiceProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = res.locals.user;
                if (!user || !user.userId) {
                    res
                        .status(HttpStatus_1.HttpStatus.UNAUTHORIZED)
                        .json({ message: "Unauthorized access" });
                    return;
                }
                const dto = {
                    userId: user.userId
                };
                const result = yield this.verifyServiceProviderUseCase.execute(dto);
                if (!result.success) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: result.message || "Not a valid service provider" });
                    return;
                }
                if (result.refreshToken) {
                    (0, setAuthCookies_1.setAuthCookies)(res, "serviceProviderToken", result.refreshToken);
                    res.status(HttpStatus_1.HttpStatus.OK).json({
                        message: result.message || "Service provider verified"
                    });
                }
                else {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Failed to generate refresh token" });
                }
            }
            catch (error) {
                console.error("Error verifying service provider:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
            }
        });
    }
    getActiveCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = {};
                const categories = yield this.getCategoryUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json(categories);
            }
            catch (error) {
                console.error("Error fetching categories:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error." });
            }
        });
    }
    markSlotAsBooked(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const slotId = (0, requestUtils_1.getString)(req.params.slotId);
                if (!slotId) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: "Slot ID is required" });
                    return;
                }
                const dto = { slotId };
                const updatedSlot = yield this.markSlotAsBookedUseCase.execute(dto);
                if (updatedSlot) {
                    res.status(HttpStatus_1.HttpStatus.OK).json({ message: "Slot marked as booked", slot: updatedSlot });
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.NOT_FOUND).json({ message: "Slot not found" });
                }
            }
            catch (error) {
                console.error("Error marking slot as booked:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
            }
        });
    }
    getServiceProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = res.locals.user;
                const dto = { userId: user.userId };
                const result = yield this.getServiceProviderUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({ serviceProvider: result });
            }
            catch (error) {
                console.error("Error fetching service provider:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error." });
            }
        });
    }
    makeItactiveAllService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceProviderId = (0, requestUtils_1.getString)(req.params.id);
                if (!serviceProviderId) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        message: "Service provider ID is required",
                    });
                    return;
                }
                yield this.manageAllServiceUseCase.makeActiveAllService(serviceProviderId);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    message: "All services have been activated successfully.",
                });
                return;
            }
            catch (error) {
                console.error("Error activating services:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "Something went wrong while activating services.",
                    error: (0, errorUtils_1.getErrorMessage)(error),
                });
                return;
            }
        });
    }
    makeInactiveAllService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceProviderId = (0, requestUtils_1.getString)(req.params.id);
                if (!serviceProviderId) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        message: "Service provider ID is required",
                    });
                    return;
                }
                yield this.manageAllServiceUseCase.makeActiveAllService(serviceProviderId);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    message: "All services have been marked as inactive successfully.",
                });
                return;
            }
            catch (error) {
                console.error("Error deactivating services:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "Something went wrong while deactivating services.",
                    error: (0, errorUtils_1.getErrorMessage)(error),
                });
                return;
            }
        });
    }
    // async rescheduleBookingHandler(req: Request, res: Response){
    //   try{
    //     const { bookingId, newDate } = req.body;
    //     if (!bookingId || !newDate ) {
    //       return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Booking ID, new date, and new time are required.' });
    //     }
    //     const updatedBooking = await this.manageAllServiceUseCase.rescheduleBooking(bookingId, newDate);
    //     if (!updatedBooking) {
    //       return res.status(HttpStatus.NOT_FOUND).json({ message: 'Booking not found or could not be rescheduled.' });
    //     }
    //     res.status(HttpStatus.OK).json({ message: 'Booking rescheduled successfully.', booking: updatedBooking });
    //   } catch (error) {
    //     console.error('Error rescheduling booking:', error);
    //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    // }
    // }
    checkServiceProviderAvailability(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceProviderId = res.locals.serviceProvider_id;
                const dto = { serviceProviderId };
                const availability = yield this.checkServiceProviderAvailabilityUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({ availability });
            }
            catch (error) {
                console.error("Error checking availability:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error." });
            }
        });
    }
    getWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceProviderId = res.locals.serviceProvider_id;
                const limit = parseInt((0, requestUtils_1.getString)(req.query.limit)) || 10;
                const page = parseInt((0, requestUtils_1.getString)(req.query.skip)) || 0;
                const skip = page * limit;
                const dto = {
                    serviceProviderId,
                    limit,
                    skip
                };
                const data = yield this.getWalletUseCase.execute(dto);
                if (!data) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ success: false, message: "Wallet not found" });
                    return;
                }
                res
                    .status(HttpStatus_1.HttpStatus.OK)
                    .json({
                    success: true,
                    data: {
                        wallet: {
                            balance: data.balance,
                            transactions: data.transactions
                        },
                        count: data.totalTransactions
                    }
                });
            }
            catch (error) {
                res
                    .status(HttpStatus_1.HttpStatus.OK)
                    .json({ success: false, message: (0, errorUtils_1.getErrorMessage)(error) });
            }
        });
    }
    getAvailableSubscriptionPlans(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const plans = yield this.getSubscriptionPlansUseCase.execute();
                res.status(HttpStatus_1.HttpStatus.OK).json(plans);
            }
            catch (error) {
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Error fetching subscription plans", error: (0, errorUtils_1.getErrorMessage)(error) });
            }
        });
    }
    getProviderAds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const providerId = (0, requestUtils_1.getString)(req.params.providerId);
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 5;
                const skip = (page - 1) * limit;
                console.log(providerId);
                console.log('get ads service provider called ');
                const dto = { providerId, skip, limit };
                const { ads, count } = yield this.getProviderAdsUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    ads,
                    total: count,
                    page,
                    totalPages: Math.ceil(count / limit),
                });
            }
            catch (error) {
                console.error("Error fetching ads:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error." });
            }
        });
    }
    changeAdStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adId = (0, requestUtils_1.getString)(req.params.adId);
                const { status } = req.body;
                if (!adId || !status) {
                    res.status(400).json({ message: "adId and status are required" });
                    return;
                }
                const dto = { adId, status };
                const updated = yield this.changeAdStatusUseCase.execute(dto);
                if (!updated) {
                    res.status(404).json({ message: "Ad not found or status unchanged" });
                    return;
                }
                res.status(200).json({
                    message: "Ad status updated successfully",
                    status,
                });
            }
            catch (error) {
                console.error("Error changing ad status:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(500).json({
                    message: "Internal server error",
                    error: (0, errorUtils_1.getErrorMessage)(error),
                });
            }
        });
    }
    getServiceNames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const providerId = (0, requestUtils_1.getString)(req.params.providerId);
                const dto = { providerId };
                const result = yield this.getServiceNamesUseCase.execute(dto);
                console.log(result);
                res.status(200).json({
                    success: true,
                    data: result,
                });
                return;
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: (0, errorUtils_1.getErrorMessage)(error) || "Something went wrong",
                });
                return;
            }
        });
    }
    addNewService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = req.body;
                const result = yield this.addNewServiceUseCase.execute(dto);
                res.status(200).json({ success: true, data: result });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: (0, errorUtils_1.getErrorMessage)(error) || "Something went wrong",
                });
            }
        });
    }
    blockService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serviceId } = req.body;
                const dto = { serviceId };
                const result = yield this.blockUnblockServiceUseCase.blockService(dto);
                res.status(200).json({ success: true, data: result });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: (0, errorUtils_1.getErrorMessage)(error) || "Something went wrong",
                });
            }
        });
    }
    unblockService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serviceId } = req.body;
                const dto = { serviceId };
                const result = yield this.blockUnblockServiceUseCase.unblockService(dto);
                res.status(200).json({ success: true, data: result });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: (0, errorUtils_1.getErrorMessage)(error) || "Something went wrong",
                });
            }
        });
    }
    editService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = req.body;
                const result = yield this.editServiceUseCase.execute(dto);
                res.status(200).json({ success: true, data: result });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: (0, errorUtils_1.getErrorMessage)(error) || "Something went wrong",
                });
            }
        });
    }
    getServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const providerId = (0, requestUtils_1.getString)(req.params.providerId);
                const dto = { providerId };
                const result = yield this.getServicesUseCase.execute(dto);
                res.status(200).json({ success: true, data: result });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: (0, errorUtils_1.getErrorMessage)(error) || "Something went wrong",
                });
            }
        });
    }
};
exports.ServiceProviderController = ServiceProviderController;
exports.ServiceProviderController = ServiceProviderController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(GetPaymentInfoUseCase_1.GetPaymentInfoUseCase)),
    __param(1, (0, tsyringe_1.inject)(GetServiceProvider_1.GetServiceProvider)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.EditServiceProviderProfileUseCase)),
    __param(3, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetSubscriptionPlansUseCase)),
    __param(4, (0, tsyringe_1.inject)(RegisterServiceProvider_1.RegisterServiceProviderUseCase)),
    __param(5, (0, tsyringe_1.inject)(UpdateUserWithServiceProvider_1.UpdateUserWithServiceProviderUseCase)),
    __param(6, (0, tsyringe_1.inject)(VerifyServiceProvider_1.VerifyServiceProvider)),
    __param(7, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetCategory)),
    __param(8, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.ManageAllServiceUseCase)),
    __param(9, (0, tsyringe_1.inject)(CheckServiceProviderAvailabilityUseCase_1.CheckServiceProviderAvailabilityUseCase)),
    __param(10, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetWalletUseCase)),
    __param(11, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.WithdrawPaymentUseCase)),
    __param(12, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetSubscriptionPlansUseCase)),
    __param(13, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.EditAdUseCase)),
    __param(14, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.CreateAdUseCase)),
    __param(15, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetProviderAdsUseCase)),
    __param(16, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetServiceNamesUseCase)),
    __param(17, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.ChangeAdStatusUseCase)),
    __param(18, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetServiceProviderRegistrationDetailsUseCase)),
    __param(19, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetServiceProviderStatusUseCase)),
    __param(20, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.ReapplyServiceProviderUseCase)),
    __param(21, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetNotificationUseCase)),
    __param(22, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.MarkNotificationAsReadUseCase)),
    __param(23, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.CreateAiChatUseCase)),
    __param(24, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetAIChatByIdUseCase)),
    __param(25, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetProviderAIChatsUseCase)),
    __param(26, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.AddNewService)),
    __param(27, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.BlockUnblockSericeUseCase)),
    __param(28, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.EditService)),
    __param(29, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetService)),
    __param(30, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.MarkSlotAsBookedUseCase)),
    __metadata("design:paramtypes", [GetPaymentInfoUseCase_1.GetPaymentInfoUseCase, Object, Object, Object, RegisterServiceProvider_1.RegisterServiceProviderUseCase,
        UpdateUserWithServiceProvider_1.UpdateUserWithServiceProviderUseCase,
        VerifyServiceProvider_1.VerifyServiceProvider, Object, Object, CheckServiceProviderAvailabilityUseCase_1.CheckServiceProviderAvailabilityUseCase, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], ServiceProviderController);
