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
const signin_1 = require("../../application/use-case/admin/auth/signin");
const TokenService_1 = require("../../services/auth/TokenService");
const profile_1 = require("../../application/use-case/admin/profile");
const getAllUsersUseCase_1 = require("../../application/use-case/admin/userManagement/getAllUsersUseCase");
const blockUnblockUsersUseCase_1 = require("../../application/use-case/admin/userManagement/blockUnblockUsersUseCase");
const getServiceProvidersUsercase_1 = require("../../application/use-case/admin/serviceProviderManagement/getServiceProvidersUsercase");
const getPaymentInfoUseCase_1 = require("../../application/use-case/admin/getPaymentInfoUseCase");
const AdminSiteSettingsUseCase_1 = require("../../application/use-case/siteSetting/AdminSiteSettingsUseCase");
const HttpStatus_1 = require("../../constants/HttpStatus");
const serviceProviderRejectUseCase_1 = require("../../application/use-case/admin/serviceProviderManagement/serviceProviderRejectUseCase");
const getAllServices_1 = require("../../application/use-case/admin/service-management/getAllServices");
const blockUnblock_1 = require("../../application/use-case/admin/service-management/blockUnblock");
const blockUnblockProvider_1 = require("../../application/use-case/admin/serviceProviderManagement/blockUnblockProvider");
const addCategory_1 = require("../../application/use-case/admin/category-management/addCategory");
const GetCategory_1 = require("../../application/use-case/admin/category-management/GetCategory");
const editCategory_1 = require("../../application/use-case/admin/category-management/editCategory");
const blockUnblockCategory_1 = require("../../application/use-case/admin/category-management/blockUnblockCategory");
const deleteCategory_1 = require("../../application/use-case/admin/category-management/deleteCategory");
const addService_1 = require("../../application/use-case/admin/category-management/addService");
const deleteService_1 = require("../../application/use-case/admin/category-management/deleteService");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const setAuthCookies_1 = require("../../utils/setAuthCookies");
let AdminController = class AdminController {
    constructor(signInUseCase, tokenService, getAdminProfileUseCase, getAllUsersUseCase, blockUnblockUsersUseCase, getServiceProvidersUseCase, getPaymentInfoUseCase, adminSiteSettingsUseCase, serviceProviderRejectVerify, getAllServicesUseCase, blockUnblockServiceUseCase, blockUnblockProviderUseCase, addCategoryUseCase, getCategoryUseCase, editCategoryUseCase, blockUnblockCategoryUseCase, deleteCategoryUseCase, addServiceUseCase, deleteServiceUseCase) {
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
        this.addCategoryUseCase = addCategoryUseCase;
        this.getCategoryUseCase = getCategoryUseCase;
        this.editCategoryUseCase = editCategoryUseCase;
        this.blockUnblockCategoryUseCase = blockUnblockCategoryUseCase;
        this.deleteCategoryUseCase = deleteCategoryUseCase;
        this.addServiceUseCase = addServiceUseCase;
        this.deleteServiceUseCase = deleteServiceUseCase;
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, phone, password } = req.body;
                if (!password || (!email && !phone)) {
                    res.status(400).json({ error: 'Email or phone and password are required' });
                    return;
                }
                let result;
                if (email) {
                    result = yield this.signInUseCase.signByEmail(email, password);
                }
                else {
                    result = yield this.signInUseCase.signByPhone(phone, password);
                }
                if (!result) {
                    res.status(401).json({ error: 'Invalid credentials' });
                    return;
                }
                const { accessToken, refreshToken, user } = result;
                (0, setAuthCookies_1.setAuthCookies)(res, 'adminToken', refreshToken);
                res.status(200).json({ accessToken, user });
                return;
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
        });
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!res.locals.adminId.adminId) {
                    res.status(401).json({ message: 'Unauthorized: No token provided' });
                    return;
                }
                const data = yield this.getAdminProfileUseCase.execute(res.locals.adminId.adminId);
                res.status(200).json({ data });
                return;
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = parseInt(req.query.limit) || 10;
                const page = parseInt(req.query.page) || 0;
                const skip = page * limit;
                const search = req.query.search || '';
                const { users, count } = yield this.getAllUsersUseCase.execute(skip, limit, search);
                res.status(200).json({ users, count });
                return;
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }
        });
    }
    getServiceProviders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = parseInt(req.query.limit) || 10;
                const page = parseInt(req.query.page) || 0;
                const skip = page * limit;
                const search = req.query.search || '';
                const verification = req.query.verification;
                const { data, count } = yield this.getServiceProvidersUseCase.execute(skip, limit, search, verification ? true : false);
                res.status(HttpStatus_1.HttpStatus.OK).json({ data, count });
                return;
            }
            catch (error) {
                console.error('AdminController::getServiceProviders error', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
                return;
            }
        });
    }
    getPaymentInfoForChart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const startDate = req.query.startDate ? new Date(req.query.startDate) : undefined;
                const endDate = req.query.endDate ? new Date(req.query.endDate) : undefined;
                const paymentData = yield this.getPaymentInfoUseCase.execute(startDate, endDate);
                res.status(200).json({ paymentData });
                return;
            }
            catch (error) {
                console.error('Failed to fetch payment info for chart:', error);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }
        });
    }
    addSiteSettings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Received request to add site settings:', req.body);
                if (req.body.type === 'addBanner') {
                    const banner = yield this.adminSiteSettingsUseCase.addHomeBanner(req.body);
                    res.status(HttpStatus_1.HttpStatus.CREATED).json({ banner });
                    return;
                }
                if (req.body.type === 'addTheme') {
                    const theme = yield this.adminSiteSettingsUseCase.addTheme(req.body);
                    res.status(HttpStatus_1.HttpStatus.CREATED).json({ theme });
                    return;
                }
                if (req.body.type === 'addFooterBanner') {
                    const footerBanner = yield this.adminSiteSettingsUseCase.addFooterBanner(req.body);
                    res.status(HttpStatus_1.HttpStatus.CREATED).json({ footerBanner });
                    return;
                }
                res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ error: 'Invalid type provided' });
                return;
            }
            catch (error) {
                console.error('Error in addSiteSettings:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
                return;
            }
        });
    }
    deleteSiteSettings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.type === 'deleteBanner') {
                    yield this.adminSiteSettingsUseCase.deleteHomeBanner(req.body.bannerId);
                    res.status(HttpStatus_1.HttpStatus.OK).json({ message: 'Banner deleted successfully' });
                    return;
                }
                if (req.body.type === 'deleteFooterBanner') {
                    yield this.adminSiteSettingsUseCase.deleteFooterBanner(req.body.footerBannerId);
                    res.status(HttpStatus_1.HttpStatus.OK).json({ message: 'Footer banner deleted successfully' });
                    return;
                }
                if (req.body.type === 'deleteTheme') {
                    yield this.adminSiteSettingsUseCase.deleteTheme(req.body.themeName);
                    res.status(HttpStatus_1.HttpStatus.OK).json({ message: 'Theme deleted successfully' });
                    return;
                }
                res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ error: 'Invalid type provided' });
                return;
            }
            catch (error) {
                console.error('Error in deleteSiteSettings:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
                return;
            }
        });
    }
    makeActiveSiteSettings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                if (req.body.type === 'makeActiveHomeBanner') {
                    const banner = yield this.adminSiteSettingsUseCase.makeHomeBannerActive(req.body.id);
                    res.status(HttpStatus_1.HttpStatus.OK).json({ banner });
                    return;
                }
                if (req.body.type === 'makeActiveFooterBanner') {
                    const footerBanner = yield this.adminSiteSettingsUseCase.makeFooterBannerActive(req.body.id);
                    res.status(HttpStatus_1.HttpStatus.OK).json({ footerBanner });
                    return;
                }
                res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ error: 'Invalid type provided' });
                return;
            }
            catch (error) {
                console.error('Error in makeActiveSiteSettings:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
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
                console.error('Error in getSiteSettings:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
            }
        });
    }
    blockUnblockUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, action } = req.body;
                let data;
                if (action === 'Block') {
                    data = yield this.blockUnblockUsersUseCase.blockUser(userId);
                }
                else {
                    data = yield this.blockUnblockUsersUseCase.unblockUser(userId);
                }
                if (data) {
                    res.status(HttpStatus_1.HttpStatus.OK).json({ data });
                    return;
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.NOT_FOUND).json({ message: 'User not found or update failed.' });
                    return;
                }
            }
            catch (error) {
                console.error('AdminController::blockUnblockUser error', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
                return;
            }
        });
    }
    serviceProviderReject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serviceProviderId, reason } = req.body;
                const data = yield this.serviceProviderRejectVerify.rejectServiceProvider(serviceProviderId, reason);
                if (data) {
                    res.status(HttpStatus_1.HttpStatus.OK).json({ data });
                    return;
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.NOT_FOUND).json({ message: 'User not found or update failed.' });
                    return;
                }
            }
            catch (error) {
                console.error('AdminController::serviceProviderReject error', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
                return;
            }
        });
    }
    serviceProviderVerify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serviceProviderId } = req.body;
                const data = yield this.serviceProviderRejectVerify.verifyServiceProvider(serviceProviderId);
                if (data) {
                    res.status(HttpStatus_1.HttpStatus.OK).json({ data });
                    return;
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.NOT_FOUND).json({ message: 'User not found or update failed.' });
                    return;
                }
            }
            catch (error) {
                console.error('AdminController::serviceProviderVerify error', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
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
                const search = req.query.search || "";
                const { allServices, count } = yield this.getAllServicesUseCase.execute(skip, limit, search);
                res.status(HttpStatus_1.HttpStatus.OK).json({ allServices, count });
                return;
            }
            catch (error) {
                console.error('AdminController::getAllServices error', error);
                res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json(error);
                return;
            }
        });
    }
    blockUnblockService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serviceId, action } = req.body;
                if (!serviceId || !action) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'serviceId and action are required' });
                    return;
                }
                let result;
                if (action === 'Block') {
                    result = yield this.blockUnblockServiceUseCase.blockService(serviceId);
                }
                else if (action === 'Unblock') {
                    result = yield this.blockUnblockServiceUseCase.unblockService(serviceId);
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
                console.error('AdminController::blockUnblockService error', error);
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: error.message || 'Internal server error' });
                return;
            }
        });
    }
    blockUnblockServiceProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { providerId, action } = req.body;
                if (!providerId || !action) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'providerId and action are required' });
                    return;
                }
                let result;
                if (action === 'Block') {
                    result = yield this.blockUnblockProviderUseCase.blockServiceProvider(providerId);
                }
                else if (action === 'Unblock') {
                    result = yield this.blockUnblockProviderUseCase.unblockServiceProvider(providerId);
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
                        .json({ message: `Service Provider ${action.toLowerCase()}ed successfully` });
                    return;
                }
                else {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: `Failed to ${action.toLowerCase()} service provider` });
                    return;
                }
            }
            catch (error) {
                console.error('AdminController::blockUnblockServiceProvider error', error);
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: error.message || 'Internal server error' });
                return;
            }
        });
    }
    addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { newCategory } = req.body;
                if (!newCategory) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'Category is required' });
                    return;
                }
                const data = yield this.addCategoryUseCase.execute({ category: newCategory });
                res.status(HttpStatus_1.HttpStatus.OK).json({ data });
                return;
            }
            catch (error) {
                console.error('AdminController::addCategory error', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
                return;
            }
        });
    }
    getCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.getCategoryUseCase.execute();
                console.log(categories);
                res.status(HttpStatus_1.HttpStatus.OK).json(categories);
                return;
            }
            catch (error) {
                console.error('AdminController::getCategory error', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error.' });
                return;
            }
        });
    }
    editCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId, categoryName } = req.body;
                if (!categoryId || !categoryName) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'Category ID and name are required' });
                    return;
                }
                const data = yield this.editCategoryUseCase.execute(categoryId, categoryName);
                res.status(HttpStatus_1.HttpStatus.OK).json({ message: 'Category updated successfully', data });
                return;
            }
            catch (error) {
                console.error('AdminController::editCategory error', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
                return;
            }
        });
    }
    blockUnblockCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId } = req.body;
                if (!categoryId) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'Category ID is required' });
                    return;
                }
                const message = yield this.blockUnblockCategoryUseCase.execute(categoryId);
                res.status(HttpStatus_1.HttpStatus.OK).json({ message });
                return;
            }
            catch (error) {
                console.error('AdminController::blockUnblockCategory error', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
                return;
            }
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'Category ID is required' });
                    return;
                }
                const message = yield this.deleteCategoryUseCase.execute(id);
                res.status(HttpStatus_1.HttpStatus.OK).json({ message });
                return;
            }
            catch (error) {
                console.error('AdminController::deleteCategory error', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
                return;
            }
        });
    }
    addService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId, newServiceName, newServiceDescription } = req.body;
                if (!categoryId || !newServiceName || !newServiceDescription) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'All fields are required' });
                    return;
                }
                const service = yield this.addServiceUseCase.execute(categoryId, {
                    serviceName: newServiceName,
                    serviceDescription: newServiceDescription,
                    isHidden: false,
                });
                res.status(HttpStatus_1.HttpStatus.OK).json({ message: service });
            }
            catch (error) {
                console.error('AdminController::addService error', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
            }
        });
    }
    deleteService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId, serviceId } = req.params;
                if (!categoryId || !serviceId) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: 'Category ID and Service ID are required' });
                    return;
                }
                const message = yield this.deleteServiceUseCase.execute(categoryId, serviceId);
                res.status(HttpStatus_1.HttpStatus.OK).json({ message });
            }
            catch (error) {
                console.error('AdminController::deleteService error', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
                return;
            }
        });
    }
    logoutAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie('adminToken', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                });
                res.status(HttpStatus_1.HttpStatus.OK).json({ message: 'Admin logged out successfully' });
            }
            catch (error) {
                console.error('AdminController::logoutAdmin error', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        });
    }
    getCurrentLog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const logFilePath = path_1.default.join(__dirname, '../../../logs/access.log');
            if (!fs_1.default.existsSync(logFilePath)) {
                res.status(404).json({ message: 'Log file not found' });
                return;
            }
            const logContent = fs_1.default.readFileSync(logFilePath, 'utf-8');
            const reversedLog = logContent
                .split('\n') // split into array by lines
                .filter(Boolean) // remove any empty lines
                .reverse() // reverse the order
                .join('\n'); // join back to string
            res.setHeader('Content-Type', 'text/plain');
            res.status(200).send(reversedLog);
            return;
        });
    }
    ;
};
exports.AdminController = AdminController;
exports.AdminController = AdminController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(signin_1.Signin)),
    __param(1, (0, tsyringe_1.inject)(TokenService_1.TokenService)),
    __param(2, (0, tsyringe_1.inject)(profile_1.GetAdminProfileUseCase)),
    __param(3, (0, tsyringe_1.inject)(getAllUsersUseCase_1.getAllUsersUseCase)),
    __param(4, (0, tsyringe_1.inject)(blockUnblockUsersUseCase_1.blockUnblockUsersUseCase)),
    __param(5, (0, tsyringe_1.inject)(getServiceProvidersUsercase_1.getServiceProvidersUseCase)),
    __param(6, (0, tsyringe_1.inject)(getPaymentInfoUseCase_1.GetPaymentInfoUseCase)),
    __param(7, (0, tsyringe_1.inject)(AdminSiteSettingsUseCase_1.AdminSiteSettingsUseCase)),
    __param(8, (0, tsyringe_1.inject)(serviceProviderRejectUseCase_1.ServiceProviderRejectVerify)),
    __param(9, (0, tsyringe_1.inject)(getAllServices_1.GetAllServics)),
    __param(10, (0, tsyringe_1.inject)(blockUnblock_1.BlockUnblockSericeAdmin)),
    __param(11, (0, tsyringe_1.inject)(blockUnblockProvider_1.BlockUnblockSericeProvider)),
    __param(12, (0, tsyringe_1.inject)(addCategory_1.AddCategory)),
    __param(13, (0, tsyringe_1.inject)(GetCategory_1.GetCategory)),
    __param(14, (0, tsyringe_1.inject)(editCategory_1.EditCategory)),
    __param(15, (0, tsyringe_1.inject)(blockUnblockCategory_1.BlockUnblockCategory)),
    __param(16, (0, tsyringe_1.inject)(deleteCategory_1.DeleteCategory)),
    __param(17, (0, tsyringe_1.inject)(addService_1.AddService)),
    __param(18, (0, tsyringe_1.inject)(deleteService_1.DeleteService)),
    __metadata("design:paramtypes", [signin_1.Signin,
        TokenService_1.TokenService,
        profile_1.GetAdminProfileUseCase,
        getAllUsersUseCase_1.getAllUsersUseCase,
        blockUnblockUsersUseCase_1.blockUnblockUsersUseCase,
        getServiceProvidersUsercase_1.getServiceProvidersUseCase,
        getPaymentInfoUseCase_1.GetPaymentInfoUseCase,
        AdminSiteSettingsUseCase_1.AdminSiteSettingsUseCase,
        serviceProviderRejectUseCase_1.ServiceProviderRejectVerify,
        getAllServices_1.GetAllServics,
        blockUnblock_1.BlockUnblockSericeAdmin,
        blockUnblockProvider_1.BlockUnblockSericeProvider,
        addCategory_1.AddCategory,
        GetCategory_1.GetCategory,
        editCategory_1.EditCategory,
        blockUnblockCategory_1.BlockUnblockCategory,
        deleteCategory_1.DeleteCategory,
        addService_1.AddService,
        deleteService_1.DeleteService])
], AdminController);
