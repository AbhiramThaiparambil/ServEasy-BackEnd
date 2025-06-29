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
const tsyringe_1 = require("tsyringe");
const GetPaymentInfoUseCaseServiceProvider_1 = require("../../application/use-case/serviceProvider/GetPaymentInfoUseCaseServiceProvider");
const EditProfile_1 = require("../../application/use-case/serviceProvider/EditProfile");
const HttpStatus_1 = require("../../constants/HttpStatus");
const RegisterServiceProvider_1 = require("../../application/use-case/serviceProvider/auth/RegisterServiceProvider");
const UpdateUserWithServiceProvider_1 = require("../../application/use-case/serviceProvider/auth/UpdateUserWithServiceProvider");
const VerifyServiceProvider_1 = require("../../application/use-case/serviceProvider/VerifyServiceProvider");
const GetCategory_1 = require("../../application/use-case/admin/category-management/GetCategory");
const getServiceProvider_1 = require("../../application/use-case/serviceProvider/auth/getServiceProvider");
const mangageAllserviceUseCase_1 = require("../../application/use-case/admin/mangageAllserviceUseCase");
let ServiceProviderController = class ServiceProviderController {
    constructor(getPaymentInfo, getServiceProviderUseCase, editServiceProviderProfileUseCase, registerServiceProviderUseCase, updateUserWithServiceProviderUseCase, verifyServiceProviderUseCase, getCategoryUseCase, manageAllServiceUseCase) {
        this.getPaymentInfo = getPaymentInfo;
        this.getServiceProviderUseCase = getServiceProviderUseCase;
        this.editServiceProviderProfileUseCase = editServiceProviderProfileUseCase;
        this.registerServiceProviderUseCase = registerServiceProviderUseCase;
        this.updateUserWithServiceProviderUseCase = updateUserWithServiceProviderUseCase;
        this.verifyServiceProviderUseCase = verifyServiceProviderUseCase;
        this.getCategoryUseCase = getCategoryUseCase;
        this.manageAllServiceUseCase = manageAllServiceUseCase;
    }
    getPaymentInfoForChartServiceProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('getPaymentInfo is:', this.getPaymentInfo);
            try {
                const startDate = req.query.startDate ? new Date(req.query.startDate) : undefined;
                const endDate = req.query.endDate ? new Date(req.query.endDate) : undefined;
                const serviceProviderId = res.locals.serviceProvider_id;
                console.log('getPaymentInfo is:', this.getPaymentInfo);
                const paymentData = yield this.getPaymentInfo.execute(serviceProviderId, startDate, endDate);
                res.status(HttpStatus_1.HttpStatus.OK).json({ paymentData });
                return;
            }
            catch (error) {
                console.error('Failed to fetch payment info for chart:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
                return;
            }
        });
    }
    updateServiceProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const updated = yield this.editServiceProviderProfileUseCase.execute(req.body);
                if (updated) {
                    res.status(HttpStatus_1.HttpStatus.OK).json({ message: 'Service provider updated successfully' });
                }
                else {
                    res
                        .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                        .json({ message: 'Failed to update service provider' });
                }
            }
            catch (error) {
                console.error('Error updating service provider:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
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
                    profileImage: '',
                    document: [],
                    businessType,
                    category,
                    subcategory,
                    socialMedia: '',
                    description: description || '',
                    userId: res.locals.user.userId,
                    bankDetails,
                };
                const serviceProvider = yield this.registerServiceProviderUseCase.execute(serviceProviderData, profileImage, documentImg, documentImg2);
                const user = res.locals.user;
                if (user.userId && serviceProvider._id) {
                    yield this.updateUserWithServiceProviderUseCase.execute(user.userId, serviceProvider._id.toString());
                }
                res.status(HttpStatus_1.HttpStatus.CREATED).json({
                    message: 'Service provider registered successfully.',
                    serviceProvider,
                });
            }
            catch (error) {
                console.error('Registration error:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'An error occurred while registering the service provider.',
                });
            }
        });
    }
    verifyServiceProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = res.locals.user;
                if (!user || !user.userId) {
                    res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized access' });
                    return;
                }
                const refreshToken = yield this.verifyServiceProviderUseCase.execute(user.userId);
                if (!refreshToken) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: 'Not a valid service provider' });
                    return;
                }
                res.cookie('serviceProviderToken', refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                res.status(HttpStatus_1.HttpStatus.OK).json({ message: 'Service provider verified' });
            }
            catch (error) {
                console.error('Error verifying service provider:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        });
    }
    getActiveCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.getCategoryUseCase.getActiveCategory();
                res.status(HttpStatus_1.HttpStatus.OK).json(categories);
            }
            catch (error) {
                console.error('Error fetching categories:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error.' });
            }
        });
    }
    getServiceProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = res.locals.user;
                const result = yield this.getServiceProviderUseCase.execute(user.userId);
                res.status(HttpStatus_1.HttpStatus.CREATED).json({ serviceProvider: result });
            }
            catch (error) {
                console.error('Error fetching service provider:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error.' });
            }
        });
    }
    makeItactiveAllService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceProviderId = req.params.id;
                if (!serviceProviderId) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        message: 'Service provider ID is required',
                    });
                    return;
                }
                yield this.manageAllServiceUseCase.makeActiveAllService(serviceProviderId);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    message: 'All services have been activated successfully.',
                });
                return;
            }
            catch (error) {
                console.error('Error activating services:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'Something went wrong while activating services.',
                    error,
                });
                return;
            }
        });
    }
    makeInactiveAllService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceProviderId = req.params.id;
                if (!serviceProviderId) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        message: 'Service provider ID is required',
                    });
                    return;
                }
                yield this.manageAllServiceUseCase.makeActiveAllService(serviceProviderId);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    message: 'All services have been marked as inactive successfully.',
                });
                return;
            }
            catch (error) {
                console.error('Error deactivating services:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'Something went wrong while deactivating services.',
                    error,
                });
                return;
            }
        });
    }
};
exports.ServiceProviderController = ServiceProviderController;
exports.ServiceProviderController = ServiceProviderController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(GetPaymentInfoUseCaseServiceProvider_1.GetPaymentInfoUseCaseServiceProvider)),
    __param(1, (0, tsyringe_1.inject)(getServiceProvider_1.GetServiceProvider)),
    __param(2, (0, tsyringe_1.inject)(EditProfile_1.EditServiceProviderProfileUseCase)),
    __param(3, (0, tsyringe_1.inject)(RegisterServiceProvider_1.RegisterServiceProviderUseCase)),
    __param(4, (0, tsyringe_1.inject)(UpdateUserWithServiceProvider_1.UpdateUserWithServiceProviderUseCase)),
    __param(5, (0, tsyringe_1.inject)(VerifyServiceProvider_1.VerifyServiceProvider)),
    __param(6, (0, tsyringe_1.inject)(GetCategory_1.GetCategory)),
    __param(7, (0, tsyringe_1.inject)(mangageAllserviceUseCase_1.ManageAllServiceUseCase)),
    __metadata("design:paramtypes", [GetPaymentInfoUseCaseServiceProvider_1.GetPaymentInfoUseCaseServiceProvider,
        getServiceProvider_1.GetServiceProvider,
        EditProfile_1.EditServiceProviderProfileUseCase,
        RegisterServiceProvider_1.RegisterServiceProviderUseCase,
        UpdateUserWithServiceProvider_1.UpdateUserWithServiceProviderUseCase,
        VerifyServiceProvider_1.VerifyServiceProvider,
        GetCategory_1.GetCategory,
        mangageAllserviceUseCase_1.ManageAllServiceUseCase])
], ServiceProviderController);
