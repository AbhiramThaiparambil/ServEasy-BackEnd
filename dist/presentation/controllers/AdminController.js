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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const tsyringe_1 = require("tsyringe");
const requestUtils_1 = require("../../utils/requestUtils");
const errorUtils_1 = require("../../utils/errorUtils");
const HttpStatus_1 = require("../../constants/HttpStatus");
const fs_1 = __importDefault(require("fs"));
const setAuthCookies_1 = require("../../utils/setAuthCookies");
const tokens_1 = require("../../constants/tokens");
const path_1 = __importDefault(require("path"));
let AdminController = class AdminController {
    constructor(signInUseCase, tokenService, getAdminProfileUseCase, getAllUsersUseCase, blockUnblockUsersUseCase, getServiceProvidersUseCase, getPaymentInfoUseCase, adminSiteSettingsUseCase, serviceProviderRejectVerify, getAllServicesUseCase, blockUnblockServiceUseCase, blockUnblockProviderUseCase, getProviderVerificationDetailsUseCase, addCategoryUseCase, getCategoryUseCase, editCategoryUseCase, blockUnblockCategoryUseCase, deleteCategoryUseCase, addServiceUseCase, deleteServiceUseCase, blockUnblockCategoryServiceUseCase, createCouponUseCase, findAllCouponsUseCase, makeActiveInActiveCouponUseCase, showInBannerUseCase, getWalletUseCase, getWalletByIdUseCase, withDrawProviderWallet, getAllSubscriptionPlans, createSubscriptionPlan, updateSubscriptionPlan, getAdsUseCase, changeAdStatusUseCase, getAdminBookingHistoryUseCase) {
        this.signInUseCase = signInUseCase;
        this.tokenService = tokenService;
        this.getAdminProfileUseCase = getAdminProfileUseCase;
        this.getAllUsersUseCase = getAllUsersUseCase;
        this.blockUnblockUsersUseCase = blockUnblockUsersUseCase;
        this.getServiceProvidersUseCase = getServiceProvidersUseCase;
        this.getPaymentInfoUseCase = getPaymentInfoUseCase;
        this.adminSiteSettingsUseCase = adminSiteSettingsUseCase;
        this.serviceProviderRejectVerify = serviceProviderRejectVerify;
        this.getAllServicesUseCase = getAllServicesUseCase;
        this.blockUnblockServiceUseCase = blockUnblockServiceUseCase;
        this.blockUnblockProviderUseCase = blockUnblockProviderUseCase;
        this.getProviderVerificationDetailsUseCase = getProviderVerificationDetailsUseCase;
        this.addCategoryUseCase = addCategoryUseCase;
        this.getCategoryUseCase = getCategoryUseCase;
        this.editCategoryUseCase = editCategoryUseCase;
        this.blockUnblockCategoryUseCase = blockUnblockCategoryUseCase;
        this.deleteCategoryUseCase = deleteCategoryUseCase;
        this.addServiceUseCase = addServiceUseCase;
        this.deleteServiceUseCase = deleteServiceUseCase;
        this.blockUnblockCategoryServiceUseCase = blockUnblockCategoryServiceUseCase;
        this.createCouponUseCase = createCouponUseCase;
        this.findAllCouponsUseCase = findAllCouponsUseCase;
        this.makeActiveInActiveCouponUseCase = makeActiveInActiveCouponUseCase;
        this.showInBannerUseCase = showInBannerUseCase;
        this.getWalletUseCase = getWalletUseCase;
        this.getWalletByIdUseCase = getWalletByIdUseCase;
        this.withDrawProviderWallet = withDrawProviderWallet;
        this.getAllSubscriptionPlans = getAllSubscriptionPlans;
        this.createSubscriptionPlan = createSubscriptionPlan;
        this.updateSubscriptionPlan = updateSubscriptionPlan;
        this.getAdsUseCase = getAdsUseCase;
        this.changeAdStatusUseCase = changeAdStatusUseCase;
        this.getAdminBookingHistoryUseCase = getAdminBookingHistoryUseCase;
        this.refreshToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const adminTokenData = req.cookies.adminToken;
                if (!adminTokenData) {
                    res
                        .status(HttpStatus_1.HttpStatus.UNAUTHORIZED)
                        .json({ error: "Refresh token is missing" });
                    return;
                }
                const decoded = this.tokenService.verifyRefreshToken(adminTokenData);
                if (!decoded) {
                    res
                        .status(HttpStatus_1.HttpStatus.UNAUTHORIZED)
                        .json({ error: "Invalid refresh token" });
                    return;
                }
                const user = yield this.getAdminProfileUseCase.execute(decoded.adminId);
                if (!user || !user.isAdmin) {
                    res.status(HttpStatus_1.HttpStatus.NOT_FOUND).json({ error: "Admin not found" });
                    return;
                }
                const newAccessToken = yield this.tokenService.generateAccessToken(user._id + "", "adminId");
                res.status(HttpStatus_1.HttpStatus.OK).json({ adminToken: newAccessToken });
            }
            catch (error) {
                console.error("AdminController::refreshToken error", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ error: "Internal server error" });
            }
        });
    }
    getAdminProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminId = (0, requestUtils_1.getString)(req.params.adminId);
                const data = yield this.getAdminProfileUseCase.execute(adminId);
                if (!data) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST);
                    return;
                }
                res.status(HttpStatus_1.HttpStatus.OK).json(data);
            }
            catch (error) {
                console.error("AdminController::getAdminProfile error", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal Server Error" });
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, phone, password } = req.body;
                if (!password || (!email && !phone)) {
                    res
                        .status(400)
                        .json({ error: "Email or phone and password are required" });
                    return;
                }
                let result;
                if (email) {
                    result = yield this.signInUseCase.execute({ email, password });
                }
                else {
                    result = yield this.signInUseCase.execute({ phone, password });
                }
                if (!result) {
                    res.status(401).json({ error: "Invalid credentials" });
                    return;
                }
                const { accessToken, refreshToken, user } = result;
                (0, setAuthCookies_1.setAuthCookies)(res, "adminToken", refreshToken);
                res.status(200).json({ accessToken, user });
                return;
            }
            catch (error) {
                console.error((0, errorUtils_1.getErrorMessage)(error));
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
        });
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!res.locals.adminId.adminId) {
                    res.status(401).json({ message: "Unauthorized: No token provided" });
                    return;
                }
                const data = yield this.getAdminProfileUseCase.execute(res.locals.adminId.adminId);
                res.status(200).json({ data });
                return;
            }
            catch (error) {
                console.error((0, errorUtils_1.getErrorMessage)(error));
                res.status(500).json({ message: "Internal Server Error" });
                return;
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = parseInt((0, requestUtils_1.getString)(req.query.limit)) || 10;
                const page = parseInt((0, requestUtils_1.getString)(req.query.page)) || 0;
                const skip = page * limit;
                const search = (0, requestUtils_1.getString)(req.query.search);
                const dto = {
                    skip,
                    limit,
                    search,
                };
                const { users, count } = yield this.getAllUsersUseCase.execute(dto);
                res.status(200).json({ users, count });
                return;
            }
            catch (error) {
                console.error((0, errorUtils_1.getErrorMessage)(error));
                res.status(500).json({ message: "Internal Server Error" });
                return;
            }
        });
    }
    allServiceProviders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt((0, requestUtils_1.getString)(req.query.page)) || 1;
                const limit = parseInt((0, requestUtils_1.getString)(req.query.limit)) || 10;
                const search = (0, requestUtils_1.getString)(req.query.search);
                const serviceProviderVerfication = req.query.serviceProviderVerfication === "true";
                const skip = (page - 1) * limit;
                const dto = {
                    skip,
                    limit,
                    search,
                    serviceProviderVerfication,
                };
                const data = yield this.getServiceProvidersUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({ data: data.data, count: data.count });
                return;
            }
            catch (error) {
                console.error("AdminController::getServiceProviders error", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal Server Error" });
                return;
            }
        });
    }
    getPaymentInfoForChart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startDate = req.query.startDate
                    ? new Date((0, requestUtils_1.getString)(req.query.startDate))
                    : undefined;
                const endDate = req.query.endDate
                    ? new Date((0, requestUtils_1.getString)(req.query.endDate))
                    : undefined;
                const paymentData = yield this.getPaymentInfoUseCase.execute(startDate, endDate);
                res.status(200).json({ paymentData });
                return;
            }
            catch (error) {
                console.error("Failed to fetch payment info for chart:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(500).json({ message: "Internal Server Error" });
                return;
            }
        });
    }
    addSiteSettings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Received request to add site settings:", req.body);
                if (req.body.type === "addBanner") {
                    const dto = {
                        image: req.body.image,
                        title: req.body.title,
                        subtitle: req.body.subtitle,
                        imageUrl: req.body.imageUrl,
                    };
                    const banner = yield this.adminSiteSettingsUseCase.addHomeBanner(dto);
                    res.status(HttpStatus_1.HttpStatus.CREATED).json({ banner });
                    return;
                }
                if (req.body.type === "addTheme") {
                    const dto = {
                        name: req.body.name,
                        isActive: req.body.isActive,
                    };
                    const theme = yield this.adminSiteSettingsUseCase.addTheme(dto);
                    res.status(HttpStatus_1.HttpStatus.CREATED).json({ theme });
                    return;
                }
                if (req.body.type === "addFooterBanner") {
                    const dto = {
                        image: req.body.image,
                        title: req.body.title,
                        subtitle: req.body.subtitle,
                        imageUrl: req.body.imageUrl,
                    };
                    const footerBanner = yield this.adminSiteSettingsUseCase.addFooterBanner(dto);
                    res.status(HttpStatus_1.HttpStatus.CREATED).json({ footerBanner });
                    return;
                }
                res
                    .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                    .json({ error: "Invalid type provided" });
                return;
            }
            catch (error) {
                console.error("Error in addSiteSettings:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ error: "Internal Server Error" });
                return;
            }
        });
    }
    deleteSiteSettings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.type === "deleteBanner") {
                    yield this.adminSiteSettingsUseCase.deleteHomeBanner(req.body.bannerId);
                    res
                        .status(HttpStatus_1.HttpStatus.OK)
                        .json({ message: "Banner deleted successfully" });
                    return;
                }
                if (req.body.type === "deleteFooterBanner") {
                    yield this.adminSiteSettingsUseCase.deleteFooterBanner(req.body.footerBannerId);
                    res
                        .status(HttpStatus_1.HttpStatus.OK)
                        .json({ message: "Footer banner deleted successfully" });
                    return;
                }
                if (req.body.type === "deleteTheme") {
                    yield this.adminSiteSettingsUseCase.deleteTheme(req.body.themeName);
                    res
                        .status(HttpStatus_1.HttpStatus.OK)
                        .json({ message: "Theme deleted successfully" });
                    return;
                }
                res
                    .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                    .json({ error: "Invalid type provided" });
                return;
            }
            catch (error) {
                console.error("Error in deleteSiteSettings:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ error: "Internal Server Error" });
                return;
            }
        });
    }
    makeActiveSiteSettings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                if (req.body.type === "makeActiveHomeBanner") {
                    const banner = yield this.adminSiteSettingsUseCase.makeHomeBannerActive(req.body.id);
                    res.status(HttpStatus_1.HttpStatus.OK).json({ banner });
                    return;
                }
                if (req.body.type === "makeActiveFooterBanner") {
                    const footerBanner = yield this.adminSiteSettingsUseCase.makeFooterBannerActive(req.body.id);
                    res.status(HttpStatus_1.HttpStatus.OK).json({ footerBanner });
                    return;
                }
                res
                    .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                    .json({ error: "Invalid type provided" });
                return;
            }
            catch (error) {
                console.error("Error in makeActiveSiteSettings:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ error: "Internal Server Error" });
                return;
            }
        });
    }
    getSiteSettings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const homeBanners = yield this.adminSiteSettingsUseCase.findAllHomeBanners();
                const footerBanners = yield this.adminSiteSettingsUseCase.findAllFooterBanners();
                const themes = yield this.adminSiteSettingsUseCase.findAllThemes();
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    homeBanners,
                    footerBanners,
                    themes,
                });
            }
            catch (error) {
                console.error("Error in getSiteSettings:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ error: "Internal Server Error" });
            }
        });
    }
    blockUnblockUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, action } = req.body;
                const dto = {
                    userId,
                    action,
                };
                const data = yield this.blockUnblockUsersUseCase.execute(dto);
                if (data) {
                    res.status(HttpStatus_1.HttpStatus.OK).json({ data });
                    return;
                }
                else {
                    res
                        .status(HttpStatus_1.HttpStatus.NOT_FOUND)
                        .json({ message: "User not found or update failed." });
                    return;
                }
            }
            catch (error) {
                console.error("AdminController::blockUnblockUser error", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal Server Error" });
                return;
            }
        });
    }
    serviceProviderVerify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serviceProviderId } = req.body;
                const reqData = {
                    providerId: serviceProviderId,
                };
                const data = yield this.serviceProviderRejectVerify.verifyServiceProvider(reqData);
                console.log(data);
                if (data) {
                    res.status(HttpStatus_1.HttpStatus.OK).json({ data });
                    return;
                }
                else {
                    res
                        .status(HttpStatus_1.HttpStatus.NOT_FOUND)
                        .json({ message: "User not found or update failed." });
                    return;
                }
            }
            catch (error) {
                console.error("AdminController::serviceProviderVerify error", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal Server Error" });
                return;
            }
        });
    }
    getAllServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = parseInt(req.query.limit) || 10;
                const page = parseInt(req.query.page) || 0;
                const skip = page * limit;
                const search = (0, requestUtils_1.getString)(req.query.search);
                const dto = {
                    skip,
                    limit,
                    search,
                };
                const { allServices, count } = yield this.getAllServicesUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({ allServices, count });
                return;
            }
            catch (error) {
                console.error("AdminController::getAllServices error", (0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: (0, errorUtils_1.getErrorMessage)(error) });
                return;
            }
        });
    }
    blockUnblockService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serviceId, action } = req.body;
                if (!serviceId || !action) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "serviceId and action are required" });
                    return;
                }
                const dto = {
                    serviceId,
                };
                let result;
                if (action === "Block") {
                    result = yield this.blockUnblockServiceUseCase.blockService(dto);
                }
                else if (action === "Unblock") {
                    result = yield this.blockUnblockServiceUseCase.unblockService(dto);
                }
                else {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Invalid action. Use 'Block' or 'Unblock'." });
                    return;
                }
                if (result) {
                    res
                        .status(HttpStatus_1.HttpStatus.OK)
                        .json({ message: `Service ${action.toLowerCase()}ed successfully` });
                    return;
                }
                else {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: `Failed to ${action.toLowerCase()} service` });
                    return;
                }
            }
            catch (error) {
                console.error("AdminController::blockUnblockService error", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: (0, errorUtils_1.getErrorMessage)(error) || "Internal server error" });
                return;
            }
        });
    }
    blockUnblockServiceProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { action, providerId } = req.body;
                if (!providerId || !action) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "providerId and action are required" });
                    return;
                }
                const dto = {
                    serviceProviderId: providerId,
                    action: action === "Block",
                };
                let result;
                if (action === "Block") {
                    result =
                        yield this.blockUnblockProviderUseCase.blockServiceProvider(dto);
                }
                else if (action === "Unblock") {
                    result =
                        yield this.blockUnblockProviderUseCase.unblockServiceProvider(dto);
                }
                else {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Invalid action. Use 'Block' or 'Unblock'." });
                    return;
                }
                if (result) {
                    res.status(HttpStatus_1.HttpStatus.OK).json({
                        message: `Service Provider ${action.toLowerCase()}ed successfully`,
                    });
                    return;
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        message: `Failed to ${action.toLowerCase()} service provider`,
                    });
                    return;
                }
            }
            catch (error) {
                console.error("AdminController::blockUnblockServiceProvider error", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: (0, errorUtils_1.getErrorMessage)(error) || "Internal server error" });
                return;
            }
        });
    }
    addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { newCategory } = req.body;
                console.log(newCategory);
                const dto = { category: newCategory };
                console.log(dto);
                console.log(dto.category);
                if (!dto.category) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Category is required" });
                    return;
                }
                const data = yield this.addCategoryUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({ data });
                return;
            }
            catch (error) {
                console.error("AdminController:: addCategory error", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
                return;
            }
        });
    }
    getCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = {};
                const categories = yield this.getCategoryUseCase.execute(dto);
                console.log(categories);
                res.status(HttpStatus_1.HttpStatus.OK).json(categories);
                return;
            }
            catch (error) {
                console.error("AdminController::getCategory error", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error." });
                return;
            }
        });
    }
    editCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    categoryId: req.body.categoryId,
                    newName: req.body.categoryName,
                };
                if (!data.categoryId || !data.newName) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Category ID and name are required" });
                    return;
                }
                const result = yield this.editCategoryUseCase.execute(data);
                res
                    .status(HttpStatus_1.HttpStatus.OK)
                    .json({ message: "Category updated successfully", data: result });
                return;
            }
            catch (error) {
                console.error("AdminController::editCategory error", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
                return;
            }
        });
    }
    blockUnblockCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = { categoryId: req.body.categoryId };
                if (!data.categoryId) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Category ID is required" });
                    return;
                }
                const result = yield this.blockUnblockCategoryUseCase.execute(data);
                res.status(HttpStatus_1.HttpStatus.OK).json({ message: result });
                return;
            }
            catch (error) {
                console.error("AdminController::blockUnblockCategory error", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
                return;
            }
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = { categoryId: (0, requestUtils_1.getString)(req.params.id) };
                if (!data.categoryId) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Category ID is required" });
                    return;
                }
                const result = yield this.deleteCategoryUseCase.execute(data);
                res.status(HttpStatus_1.HttpStatus.OK).json({ message: result });
                return;
            }
            catch (error) {
                console.error("AdminController::deleteCategory error", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
                return;
            }
        });
    }
    addService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId, newServiceName, newServiceDescription } = req.body;
                if (!categoryId || !newServiceName || !newServiceDescription) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "All fields are required" });
                    return;
                }
                const dto = {
                    categoryId,
                    service: {
                        serviceName: newServiceName,
                        serviceDescription: newServiceDescription,
                        isHidden: false,
                    },
                };
                const data = yield this.addServiceUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({ message: data });
            }
            catch (error) {
                console.error("AdminController::addService error", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal Server Error" });
            }
        });
    }
    deleteService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    categoryId: (0, requestUtils_1.getString)(req.params.categoryId),
                    serviceId: (0, requestUtils_1.getString)(req.params.serviceId),
                };
                if (!data.categoryId || !data.serviceId) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Category ID and Service ID are required" });
                    return;
                }
                const result = yield this.deleteServiceUseCase.execute(data);
                res.status(HttpStatus_1.HttpStatus.OK).json({ message: result });
            }
            catch (error) {
                console.error("AdminController::deleteService error", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
                return;
            }
        });
    }
    blockUnblockCategoryService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    categoryId: req.body.categoryId,
                    serviceId: req.body.serviceId,
                };
                if (!data.categoryId || !data.serviceId) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Category ID and Service ID are required" });
                    return;
                }
                const result = yield this.blockUnblockCategoryServiceUseCase.execute(data);
                res.status(HttpStatus_1.HttpStatus.OK).json({ message: result });
            }
            catch (error) {
                console.error("AdminController::blockUnblockCategoryService error", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
                return;
            }
        });
    }
    logoutAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("adminToken", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                });
                res
                    .status(HttpStatus_1.HttpStatus.OK)
                    .json({ message: "Admin logged out successfully" });
            }
            catch (error) {
                console.error("AdminController::logoutAdmin error", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
            }
        });
    }
    getCurrentLog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const logFilePath = path_1.default.join(__dirname, "../../../logs/access.log");
            if (!fs_1.default.existsSync(logFilePath)) {
                res.status(HttpStatus_1.HttpStatus.NOT_FOUND).json({ message: "Log file not found" });
                return;
            }
            const logContent = fs_1.default.readFileSync(logFilePath, "utf-8");
            const reversedLog = logContent
                .split("\n")
                .filter(Boolean)
                .reverse()
                .join("\n");
            res.setHeader("Content-Type", "text/plain");
            res.status(200).send(reversedLog);
            return;
        });
    }
    createCoupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = req.body;
                console.log("createCoupon input:", data);
                const inputData = data;
                if (!inputData) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Coupon data required" });
                    return;
                }
                const resdata = yield this.createCouponUseCase.execute(inputData);
                console.log(resdata);
                res.status(HttpStatus_1.HttpStatus.CREATED).json(resdata);
                return;
            }
            catch (e) {
                console.log((0, errorUtils_1.getErrorMessage)(e));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
            }
        });
    }
    getAllCoupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coupons = yield this.findAllCouponsUseCase.execute();
                console.log(coupons);
                res.status(HttpStatus_1.HttpStatus.CREATED).json(coupons);
                return;
            }
            catch (e) {
                console.log((0, errorUtils_1.getErrorMessage)(e));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
            }
        });
    }
    activeInActiveCoupons(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = {
                    id: (0, requestUtils_1.getString)(req.params.id),
                    action: req.body.action,
                };
                if (!dto.id) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: "ID is required" });
                    return;
                }
                yield this.makeActiveInActiveCouponUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    message: `Coupon ${dto.action ? "activated" : "deactivated"} successfully`,
                });
            }
            catch (error) {
                console.error("Error toggling coupon status:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Something went wrong" });
            }
        });
    }
    showCouponsInBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params);
                const dto = {
                    id: (0, requestUtils_1.getString)(req.params.id),
                    show: req.body.action,
                };
                if (!dto.id) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Coupon ID is required" });
                    return;
                }
                yield this.showInBannerUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    message: `Coupon ${dto.show ? "shown in" : "removed from"} banner successfully`,
                });
            }
            catch (error) {
                console.error("Error toggling coupon banner status:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Something went wrong" });
            }
        });
    }
    getAllWallets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = parseInt(req.query.limit) || 10;
                const page = parseInt(req.query.page) || 0;
                const skip = page * limit;
                const dto = { skip, limit };
                const data = yield this.getWalletUseCase.execute(dto);
                console.log(data);
                res.status(HttpStatus_1.HttpStatus.OK).json({ data: data.wallets });
            }
            catch (_a) { }
        });
    }
    rejectServiceProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { reason, serviceProviderId } = req.body;
            const dto = { providerId: serviceProviderId, reason };
            yield this.serviceProviderRejectVerify.rejectServiceProvider(dto);
            res
                .status(HttpStatus_1.HttpStatus.OK)
                .json({ success: true, message: "Provider rejected successfully" });
        });
    }
    verifyServiceProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, requestUtils_1.getString)(req.params.id);
            const dto = { providerId: id };
            yield this.serviceProviderRejectVerify.verifyServiceProvider(dto);
            res
                .status(HttpStatus_1.HttpStatus.OK)
                .json({ success: true, message: "Verification success" });
        });
    }
    getProviderVerificationDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, requestUtils_1.getString)(req.params.id);
            const provider = yield this.getProviderVerificationDetailsUseCase.execute(id);
            if (!provider) {
                res.status(HttpStatus_1.HttpStatus.NOT_FOUND).json({ message: "Provider not found" });
                return;
            }
            res.status(HttpStatus_1.HttpStatus.OK).json({ success: true, data: provider });
        });
    }
    getWalletById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "provider Id is missing" });
                    return;
                }
                const dto = {
                    providerId: (0, requestUtils_1.getString)(req.params.id),
                };
                const data = yield this.getWalletByIdUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json(data);
            }
            catch (_a) { }
        });
    }
    withdrawFromWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { transactionId, newStatus, reason } = req.body;
                const walletId = (0, requestUtils_1.getString)(req.params.walletId);
                if (!walletId || !transactionId || !newStatus) {
                    res
                        .status(400)
                        .json({ success: false, message: "Missing required fields" });
                    return;
                }
                const dto = {
                    walletId,
                    transactionId,
                    newStatus,
                    reason,
                };
                const success = yield this.withDrawProviderWallet.execute(dto);
                if (!success) {
                    res.status(404).json({
                        success: false,
                        message: "Transaction not found or not updated",
                    });
                    return;
                }
                res.status(200).json({
                    success: true,
                    message: "Transaction status updated successfully",
                });
            }
            catch (error) {
                console.error((0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(500)
                    .json({ success: false, message: "Internal server error" });
            }
        });
    }
    getAllSubscriptions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subscriptions = yield this.getAllSubscriptionPlans.execute();
                if (!subscriptions || subscriptions.length === 0) {
                    res.status(404).json({
                        success: false,
                        message: "No subscription plans found",
                        data: [],
                    });
                    return;
                }
                res.status(200).json({
                    success: true,
                    message: "Subscriptions fetched successfully",
                    data: subscriptions,
                });
            }
            catch (error) {
                console.error("Error fetching subscriptions:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }
        });
    }
    createSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, validityDays, features, adLimitPerMonth, payoutSpeedDays, description, } = req.body;
                if (!name || !price || !validityDays) {
                    res.status(400).json({
                        success: false,
                        message: "Required fields are missing",
                    });
                    return;
                }
                const dto = {
                    name,
                    price,
                    validityDays,
                    features: features || [],
                    adLimitPerMonth: adLimitPerMonth || 0,
                    payoutSpeedDays: payoutSpeedDays || 0,
                    description: description || "",
                };
                const newPlan = yield this.createSubscriptionPlan.execute(dto);
                res.status(201).json({
                    success: true,
                    message: "Subscription created successfully",
                    data: newPlan,
                });
            }
            catch (error) {
                console.error("Create subscription error:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }
        });
    }
    updateSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, requestUtils_1.getString)(req.params.id);
                const { name, price, validityDays, features, adLimitPerMonth, payoutSpeedDays, description, } = req.body;
                if (!id) {
                    res.status(400).json({
                        success: false,
                        message: "Subscription ID is required",
                    });
                    return;
                }
                const dto = {
                    name,
                    price,
                    validityDays,
                    features,
                    adLimitPerMonth,
                    payoutSpeedDays,
                    description,
                };
                const updatedPlan = yield this.updateSubscriptionPlan.execute(id, dto);
                if (!updatedPlan) {
                    res.status(404).json({
                        success: false,
                        message: "Subscription plan not found",
                    });
                    return;
                }
                res.status(200).json({
                    success: true,
                    message: "Subscription updated successfully",
                    data: updatedPlan,
                });
            }
            catch (error) {
                console.error("Update subscription error:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }
        });
    }
    getAds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = parseInt((0, requestUtils_1.getString)(req.query.limit)) || 10;
                const page = parseInt((0, requestUtils_1.getString)(req.query.page)) || 0;
                const skip = page * limit;
                const data = yield this.getAdsUseCase.execute({ skip, limit });
                console.log(data);
                res.status(HttpStatus_1.HttpStatus.OK).json(data);
            }
            catch (error) {
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "Error fetching provider ads",
                    error: (0, errorUtils_1.getErrorMessage)(error),
                });
            }
        });
    }
    changeAdStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adId = (0, requestUtils_1.getString)(req.params.adId);
                const { status } = req.body;
                console.log("called");
                if (!adId || !status) {
                    res.status(400).json({ message: "adId and status are required" });
                    return;
                }
                console.log("called");
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
    getAllBookings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = Number(req.query.limit) || 10;
                const page = Number(req.query.page) || 0;
                const skip = page * limit;
                const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
                const status = typeof req.query.status === "string" ? req.query.status.trim() : "";
                const statusField = req.query.statusType === "paymentStatus"
                    ? "paymentStatus"
                    : "serviceStatus";
                const dto = {
                    limit,
                    skip,
                    search,
                    status,
                    statusField,
                };
                const bookings = yield this.getAdminBookingHistoryUseCase.execute(dto);
                return res.status(HttpStatus_1.HttpStatus.OK).json(bookings);
            }
            catch (error) {
                console.log((0, errorUtils_1.getErrorMessage)(error));
                return res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "Error fetching bookings",
                    error: (0, errorUtils_1.getErrorMessage)(error),
                });
            }
        });
    }
};
exports.AdminController = AdminController;
exports.AdminController = AdminController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.AdminSignin)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.TokenService)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetAdminProfileUseCase)),
    __param(3, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetAllUsers)),
    __param(4, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.BlockUnblockUsers)),
    __param(5, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetServiceProviders)),
    __param(6, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetPaymentInfoUseCase)),
    __param(7, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.AdminSiteSettingsUseCase)),
    __param(8, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.ServiceProviderRejectVerify)),
    __param(9, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetAllServices)),
    __param(10, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.BlockUnblockService)),
    __param(11, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.BlockUnblockSericeProvider)),
    __param(12, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetProviderVerificationDetailsUseCase)),
    __param(13, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.AddCategory)),
    __param(14, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetCategory)),
    __param(15, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.EditCategory)),
    __param(16, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.BlockUnblockCategory)),
    __param(17, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.DeleteCategory)),
    __param(18, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.AddService)),
    __param(19, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.DeleteService)),
    __param(20, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.BlockUnblockCategoryService)),
    __param(21, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.CreateCouponUseCase)),
    __param(22, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.FindAllCouponsUseCase)),
    __param(23, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.MakeCouponInactiveUseCase)),
    __param(24, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.CouponshowInBanner)),
    __param(25, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetAllProvidersWallets)),
    __param(26, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetProviderWalletByIdUseCase)),
    __param(27, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.WithdrawFromProviderWalletUseCase)),
    __param(28, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetAllSubscriptionPlansUseCase)),
    __param(29, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.CreateSubscriptionPlanUseCase)),
    __param(30, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.UpdateSubscriptionPlanUseCase)),
    __param(31, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.AdminGetAdsUseCase)),
    __param(32, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.ChangeAdStatusUseCase)),
    __param(33, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetAdminBookingHistoryUseCase)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], AdminController);
