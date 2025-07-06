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
const mongoose_1 = require("mongoose");
const razorpayService_1 = require("../../../services/razorpayService");
const ServiceRepositorie_1 = require("../../../infrastructure/repositories/ServiceRepositorie");
const ServiceBookingRepository_1 = require("../../../infrastructure/repositories/ServiceBookingRepository");
const ServiceProviderRepository_1 = require("../../../infrastructure/repositories/ServiceProviderRepository");
let VerifyPaymentUseCase = class VerifyPaymentUseCase {
    constructor(razorpayService, serviceRepository, serviceBookingRepository, serviceProviderRepository) {
        this.razorpayService = razorpayService;
        this.serviceRepository = serviceRepository;
        this.serviceBookingRepository = serviceBookingRepository;
        this.serviceProviderRepository = serviceProviderRepository;
    }
    execute(id, razorpay_order_id, razorpay_payment_id, razorpay_signature) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceObjId = new mongoose_1.Types.ObjectId(id);
                const bookedService = yield this.serviceBookingRepository.findBookedServiceById(serviceObjId);
                if ((bookedService === null || bookedService === void 0 ? void 0 : bookedService.paymentStatus) === 'completed') {
                    return { success: false, message: 'Payment already verified' };
                }
                const result = yield this.razorpayService.verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
                const service = yield this.serviceBookingRepository.findBookedServiceById(serviceObjId);
                if (service === null || service === void 0 ? void 0 : service.isOnlineService) {
                    this.serviceBookingRepository.updateServiceStatus(serviceObjId, 'in-progress');
                }
                else {
                    this.serviceBookingRepository.updateServiceStatus(serviceObjId, 'completed');
                }
                const paymentStatus = result.status === 'captured' ? 'completed' : 'failed';
                yield this.serviceBookingRepository.updatePaymentStatus(serviceObjId, paymentStatus, result.method);
                return { success: true, message: 'Payment verified successfully' };
            }
            catch (error) {
                console.error('VerifyPaymentUseCase Error:', error);
                return { success: false, message: 'Failed to verify payment' };
            }
        });
    }
};
exports.VerifyPaymentUseCase = VerifyPaymentUseCase;
exports.VerifyPaymentUseCase = VerifyPaymentUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(razorpayService_1.RazorpayService)),
    __param(1, (0, tsyringe_1.inject)(ServiceRepositorie_1.ServiceRepository)),
    __param(2, (0, tsyringe_1.inject)(ServiceBookingRepository_1.ServiceBookingRepository)),
    __param(3, (0, tsyringe_1.inject)(ServiceProviderRepository_1.ServiceProviderRepository)),
    __metadata("design:paramtypes", [razorpayService_1.RazorpayService,
        ServiceRepositorie_1.ServiceRepository,
        ServiceBookingRepository_1.ServiceBookingRepository,
        ServiceProviderRepository_1.ServiceProviderRepository])
], VerifyPaymentUseCase);
