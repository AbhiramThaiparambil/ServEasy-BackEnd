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
exports.GetPaymentInfoServiceProviderUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const RazorpayService_1 = require("../../../../services/payment/RazorpayService");
const tokens_1 = require("../../../../constants/tokens");
let GetPaymentInfoServiceProviderUseCase = class GetPaymentInfoServiceProviderUseCase {
    constructor(razorpayService, serviceRepository, serviceBookingRepository) {
        this.razorpayService = razorpayService;
        this.serviceRepository = serviceRepository;
        this.serviceBookingRepository = serviceBookingRepository;
    }
    serviceProviderInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.serviceBookingRepository.findPaymentInfoServiceProvider(id);
            return data;
        });
    }
    adminPaymentInfo(skip_1, limit_1, search_1, status_1) {
        return __awaiter(this, arguments, void 0, function* (skip, limit, search, status, statusType = "serviceStatus") {
            const data = yield this.serviceBookingRepository.findPaymentInfoAdmin(skip, limit, search, status, statusType);
            const count = yield this.serviceBookingRepository.getBookedServiceCount();
            return { data, count };
        });
    }
};
exports.GetPaymentInfoServiceProviderUseCase = GetPaymentInfoServiceProviderUseCase;
exports.GetPaymentInfoServiceProviderUseCase = GetPaymentInfoServiceProviderUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.RazorpayService)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceRepository)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceBookingRepository)),
    __metadata("design:paramtypes", [RazorpayService_1.RazorpayService, Object, Object])
], GetPaymentInfoServiceProviderUseCase);
