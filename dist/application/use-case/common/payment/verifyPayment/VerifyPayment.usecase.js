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
exports.VerifyPaymentUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const RazorpayService_1 = require("../../../../../services/payment/RazorpayService");
const tokens_1 = require("../../../../../constants/tokens");
const errorUtils_1 = require("../../../../../utils/errorUtils");
const SocketService_1 = require("../../../../../services/socket/SocketService");
let VerifyPaymentUseCase = class VerifyPaymentUseCase {
    constructor(razorpayService, serviceRepository, serviceBookingRepository, serviceProviderRepository, walletRepository, socketService) {
        this.razorpayService = razorpayService;
        this.serviceRepository = serviceRepository;
        this.serviceBookingRepository = serviceBookingRepository;
        this.serviceProviderRepository = serviceProviderRepository;
        this.walletRepository = walletRepository;
        this.socketService = socketService;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { serviceBookingId: id, razorpay_order_id, razorpay_payment_id, razorpay_signature, } = data;
            try {
                const bookedService = yield this.serviceBookingRepository.findBookedServiceById(id);
                if ((bookedService === null || bookedService === void 0 ? void 0 : bookedService.paymentStatus) === "completed") {
                    return { success: false, message: "Payment already verified" };
                }
                const result = yield this.razorpayService.verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
                const service = yield this.serviceBookingRepository.findBookedServiceById(id);
                if (service === null || service === void 0 ? void 0 : service.isOnlineService) {
                    this.serviceBookingRepository.updateServiceStatus(id, "in-progress");
                }
                else {
                    this.serviceBookingRepository.updateServiceStatus(id, "completed");
                }
                if (!service || !service.serviceProviderId || !service.payment)
                    return { success: false, message: "Service not found" };
                let wallet = yield this.walletRepository.findByProviderId(service === null || service === void 0 ? void 0 : service.serviceProviderId);
                if (!wallet) {
                    wallet = yield this.walletRepository.createWallet(service === null || service === void 0 ? void 0 : service.serviceProviderId);
                }
                const transaction = {
                    amount: ((_a = service.payment) === null || _a === void 0 ? void 0 : _a.total) - ((_b = service.payment) === null || _b === void 0 ? void 0 : _b.convenienceFee),
                    type: "credit",
                    refBookingId: service._id,
                    date: new Date(),
                };
                yield this.walletRepository.addTransaction(service.serviceProviderId, transaction);
                const userId = yield this.serviceProviderRepository.findUserIdByProviderId(service.serviceProviderId);
                const notification = {
                    type: "notification",
                    targetRole: "SERVICE_PROVIDER",
                    content: "Payment completed successfully. Service marked as completed.",
                    timestamp: new Date().toISOString(),
                };
                this.socketService.sendNotificationToUser(userId + "", userId + "", notification);
                this.socketService.refreshData(userId + "");
                const paymentStatus = result.status === "captured" ? "completed" : "failed";
                yield this.serviceBookingRepository.updatePaymentStatus(id, paymentStatus, result.method);
                return { success: true, message: "Payment verified successfully" };
            }
            catch (error) {
                console.error("VerifyPaymentUseCase Error:", (0, errorUtils_1.getErrorMessage)(error));
                return { success: false, message: "Failed to verify payment" };
            }
        });
    }
};
exports.VerifyPaymentUseCase = VerifyPaymentUseCase;
exports.VerifyPaymentUseCase = VerifyPaymentUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.RazorpayService)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceRepository)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceBookingRepository)),
    __param(3, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceProviderRepository)),
    __param(4, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.WalletRepository)),
    __param(5, (0, tsyringe_1.inject)(SocketService_1.SocketService)),
    __metadata("design:paramtypes", [RazorpayService_1.RazorpayService, Object, Object, Object, Object, SocketService_1.SocketService])
], VerifyPaymentUseCase);
