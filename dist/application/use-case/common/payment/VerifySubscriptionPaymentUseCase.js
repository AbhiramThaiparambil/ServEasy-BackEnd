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
exports.VerifySubscriptionPaymentUseCase = void 0;
const RazorpayService_1 = require("../../../../services/payment/RazorpayService");
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../../constants/tokens");
let VerifySubscriptionPaymentUseCase = class VerifySubscriptionPaymentUseCase {
    constructor(razorpayService, serviceProviderRepository, subscriptionPlanRepository) {
        this.razorpayService = razorpayService;
        this.serviceProviderRepository = serviceProviderRepository;
        this.subscriptionPlanRepository = subscriptionPlanRepository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, planId, } = data;
            const isValid = this.razorpayService.verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
            if (!isValid) {
                return { success: false, message: "Payment verification failed" };
            }
            const subscriptionPlan = yield this.subscriptionPlanRepository.findSubscriptionPlanById(planId);
            if (!subscriptionPlan) {
                return { success: false, message: "Subscription plan not found" };
            }
            const existingSub = yield this.serviceProviderRepository.findLatestSubscription(userId);
            let startDate = new Date();
            let endDate = new Date(Date.now() + subscriptionPlan.validityDays * 24 * 60 * 60 * 1000);
            let status = "active";
            let message = "Payment verified and subscription activated successfully";
            if (existingSub && existingSub.endDate > new Date()) {
                startDate = existingSub.endDate;
                endDate = new Date(existingSub.endDate.getTime() +
                    subscriptionPlan.validityDays * 24 * 60 * 60 * 1000);
                endDate = new Date(startDate.getTime() +
                    subscriptionPlan.validityDays * 24 * 60 * 60 * 1000);
                status = "pending";
                message =
                    "Payment verified. A new subscription has been created and will activate once your current subscription ends.";
            }
            const newSubscription = {
                planId,
                startDate,
                endDate,
                status,
                createdAt: new Date(),
                paymentId: razorpay_payment_id,
            };
            yield this.serviceProviderRepository.addSubscription(userId, newSubscription);
            return { success: true, message };
        });
    }
};
exports.VerifySubscriptionPaymentUseCase = VerifySubscriptionPaymentUseCase;
exports.VerifySubscriptionPaymentUseCase = VerifySubscriptionPaymentUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.RazorpayService)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceProviderRepository)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.SubscriptionRepository)),
    __metadata("design:paramtypes", [RazorpayService_1.RazorpayService, Object, Object])
], VerifySubscriptionPaymentUseCase);
