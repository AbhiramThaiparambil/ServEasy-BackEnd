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
exports.CreatePaymentSubscriptionOrderUseCase = void 0;
const RazorpayService_1 = require("../../../../services/payment/RazorpayService");
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../../constants/tokens");
let CreatePaymentSubscriptionOrderUseCase = class CreatePaymentSubscriptionOrderUseCase {
    constructor(razorpayService, subscriptionPlanRepository, redisService) {
        this.razorpayService = razorpayService;
        this.subscriptionPlanRepository = subscriptionPlanRepository;
        this.redisService = redisService;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, planId } = data;
            const lockKey = `order-lock:${planId}:${userId}`;
            const ttl = 60;
            const lockAcquired = yield this.redisService.setLock(lockKey, ttl);
            if (!lockAcquired) {
                return {
                    success: false,
                    message: "We’re processing your payment. Please wait...",
                };
            }
            console.log("planId:", planId);
            const plan = yield this.subscriptionPlanRepository.findSubscriptionPlanById(planId);
            console.log(plan);
            if (!plan) {
                return { success: false, message: "Subscription plan not found" };
            }
            const order = yield this.razorpayService.createOrder(plan.price, userId);
            if (!order) {
                return { success: false, message: "Failed to create order" };
            }
            return { success: true, order };
        });
    }
};
exports.CreatePaymentSubscriptionOrderUseCase = CreatePaymentSubscriptionOrderUseCase;
exports.CreatePaymentSubscriptionOrderUseCase = CreatePaymentSubscriptionOrderUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.RazorpayService)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.SubscriptionRepository)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.RedisService)),
    __metadata("design:paramtypes", [RazorpayService_1.RazorpayService, Object, Object])
], CreatePaymentSubscriptionOrderUseCase);
``;
