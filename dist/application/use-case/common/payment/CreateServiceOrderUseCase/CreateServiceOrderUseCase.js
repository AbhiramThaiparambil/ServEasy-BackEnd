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
exports.CreateServiceOrderUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../../../constants/tokens");
const RazorpayService_1 = require("../../../../../services/payment/RazorpayService");
const errorUtils_1 = require("../../../../../utils/errorUtils");
let CreateServiceOrderUseCase = class CreateServiceOrderUseCase {
    constructor(razorpayService, serviceBookingRepository, serviceProviderRepository, redisService) {
        this.razorpayService = razorpayService;
        this.serviceBookingRepository = serviceBookingRepository;
        this.serviceProviderRepository = serviceProviderRepository;
        this.redisService = redisService;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { serviceBookingId } = data;
            const lockKey = `order-lock:${serviceBookingId}`;
            const lockTTL = 60;
            const lockAcquired = yield this.redisService.setLock(lockKey, lockTTL);
            if (!lockAcquired) {
                return {
                    success: false,
                    message: "Order creation already in progress. Please wait...",
                };
            }
            try {
                const booking = yield this.serviceBookingRepository.findBookedServiceById(serviceBookingId);
                if (!booking || !booking.payment) {
                    return {
                        success: false,
                        message: "Service booking or payment details not found",
                    };
                }
                const serviceProvider = yield this.serviceProviderRepository.findById(booking.serviceProviderId);
                if (!serviceProvider) {
                    return {
                        success: false,
                        message: "Service provider payment details not available",
                    };
                }
                const finalAmount = this.calculateFinalAmount(booking.payment.total, (_a = booking.coupon) === null || _a === void 0 ? void 0 : _a.discountAmount);
                const order = yield this.razorpayService.createOrder(finalAmount, booking.userId.toString());
                return { success: true, order };
            }
            catch (error) {
                console.error("[CreateServiceOrderUseCase]", (0, errorUtils_1.getErrorMessage)(error));
                return {
                    success: false,
                    message: "Failed to create payment order",
                };
            }
        });
    }
    calculateFinalAmount(totalAmount, discountAmount) {
        if (!discountAmount)
            return totalAmount;
        return Math.max(totalAmount - discountAmount, 0);
    }
};
exports.CreateServiceOrderUseCase = CreateServiceOrderUseCase;
exports.CreateServiceOrderUseCase = CreateServiceOrderUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.RazorpayService)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceBookingRepository)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceProviderRepository)),
    __param(3, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.RedisService)),
    __metadata("design:paramtypes", [RazorpayService_1.RazorpayService, Object, Object, Object])
], CreateServiceOrderUseCase);
