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
exports.VerifyServiceProvider = void 0;
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../../../constants/tokens");
const errorUtils_1 = require("../../../../../utils/errorUtils");
let VerifyServiceProvider = class VerifyServiceProvider {
    constructor(serviceProviderRepository, userRepository, tokenService) {
        this.serviceProviderRepository = serviceProviderRepository;
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this.userRepository.findById(data.userId);
                if (!userData) {
                    return {
                        success: false,
                        message: "User not found"
                    };
                }
                if (userData.serviceProvider) {
                    const serviceProvider = yield this.serviceProviderRepository.findById(userData.serviceProvider.toString());
                    if ((serviceProvider === null || serviceProvider === void 0 ? void 0 : serviceProvider.isVerified) == "pending" ||
                        (serviceProvider === null || serviceProvider === void 0 ? void 0 : serviceProvider.isVerified) == "rejected") {
                        return {
                            success: false,
                            message: "Service provider verification is pending or rejected"
                        };
                    }
                    if (serviceProvider && serviceProvider._id) {
                        const refreshToken = this.tokenService.generateRefreshToken(serviceProvider._id.toString(), "serviceProvider");
                        return {
                            success: true,
                            refreshToken,
                            message: "Service provider verified successfully"
                        };
                    }
                }
                return {
                    success: false,
                    message: "Service provider not found for this user"
                };
            }
            catch (error) {
                console.error("Error verifying service provider:", (0, errorUtils_1.getErrorMessage)(error));
                return {
                    success: false,
                    message: "Internal server error while verifying service provider"
                };
            }
        });
    }
};
exports.VerifyServiceProvider = VerifyServiceProvider;
exports.VerifyServiceProvider = VerifyServiceProvider = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceProviderRepository)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.UserRepository)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.TokenService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], VerifyServiceProvider);
