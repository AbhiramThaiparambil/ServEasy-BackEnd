"use strict";
// import { inject, injectable } from "tsyringe";
// import { Types } from "mongoose";
// import { RazorpayService } from "../../../services/razorpayService";
// import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie";
// import { ServiceBookingRepository } from "../../../infrastructure/repositories/ServiceBookingRepository";
// import { ServiceProviderRepository } from "../../../infrastructure/repositories/ServiceProviderRepository";
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
exports.CreateOrderUseCase = void 0;
// @injectable()
// export class CreateOrderUseCase {
//   constructor(
//     @inject(RazorpayService) private razorpayService: RazorpayService,
//     @inject(ServiceRepository) private serviceRepository: ServiceRepository,
//     @inject(ServiceBookingRepository) private serviceBookingRepository: ServiceBookingRepository,
//     @inject(ServiceProviderRepository) private serviceProviderRepository: ServiceProviderRepository
//   ) {}
//   async execute(id: string) {
//     try {
//       const serviceObjId = new Types.ObjectId(id);
//       const service = await this.serviceBookingRepository.findBookedServiceById(serviceObjId);
//       if (!service || !service.payment) {
//         return { success: false, message: "Service or payment not found" };
//       }
//       const serviceProvider = await this.serviceProviderRepository.findById(service.serviceProviderId);
//      if(!serviceProvider){
//         return { success: false, message: "serviceProvider payment not found" };
//      }
//      let linkedAccountId =" "
//     //   linkedAccountId=await this.razorpayService.createLinkedAccountTest()
//       const order = await this.razorpayService.createOrder(service.payment,linkedAccountId );
//       return {  order };
//     } catch (error:any) {
//       // console.log(error.response.data);
//       console.error("CreateOrderUseCase Error:", error);
//       return { success: false, message: "Failed to create order" };
//     }
//   }
// }
const tsyringe_1 = require("tsyringe");
const mongoose_1 = require("mongoose");
const razorpayService_1 = require("../../../services/razorpayService");
const ServiceRepositorie_1 = require("../../../infrastructure/repositories/ServiceRepositorie");
const ServiceBookingRepository_1 = require("../../../infrastructure/repositories/ServiceBookingRepository");
const ServiceProviderRepository_1 = require("../../../infrastructure/repositories/ServiceProviderRepository");
const RedisService_1 = require("../../../services/RedisService");
let CreateOrderUseCase = class CreateOrderUseCase {
    constructor(razorpayService, serviceRepository, serviceBookingRepository, serviceProviderRepository, RedisService) {
        this.razorpayService = razorpayService;
        this.serviceRepository = serviceRepository;
        this.serviceBookingRepository = serviceBookingRepository;
        this.serviceProviderRepository = serviceProviderRepository;
        this.RedisService = RedisService;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const lockKey = `order-lock:${id}`;
            const ttl = 60;
            const lockAcquired = yield this.RedisService.setLock(lockKey, ttl);
            if (!lockAcquired) {
                return { success: false, message: "We’re processing your order. Please wait..." };
            }
            try {
                const serviceObjId = new mongoose_1.Types.ObjectId(id);
                const service = yield this.serviceBookingRepository.findBookedServiceById(serviceObjId);
                if (!service || !service.payment) {
                    return { success: false, message: "Service or payment not found" };
                }
                const serviceProvider = yield this.serviceProviderRepository.findById(service.serviceProviderId);
                if (!serviceProvider) {
                    return { success: false, message: "Service provider payment details not found" };
                }
                let linkedAccountId = ""; // Use your logic if needed
                const order = yield this.razorpayService.createOrder(service.payment, linkedAccountId);
                return { success: true, order };
            }
            catch (error) {
                console.error("CreateOrderUseCase Error:", error);
                return { success: false, message: "Failed to create order" };
            }
        });
    }
};
exports.CreateOrderUseCase = CreateOrderUseCase;
exports.CreateOrderUseCase = CreateOrderUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(razorpayService_1.RazorpayService)),
    __param(1, (0, tsyringe_1.inject)(ServiceRepositorie_1.ServiceRepository)),
    __param(2, (0, tsyringe_1.inject)(ServiceBookingRepository_1.ServiceBookingRepository)),
    __param(3, (0, tsyringe_1.inject)(ServiceProviderRepository_1.ServiceProviderRepository)),
    __param(4, (0, tsyringe_1.inject)(RedisService_1.RedisService)),
    __metadata("design:paramtypes", [razorpayService_1.RazorpayService,
        ServiceRepositorie_1.ServiceRepository,
        ServiceBookingRepository_1.ServiceBookingRepository,
        ServiceProviderRepository_1.ServiceProviderRepository,
        RedisService_1.RedisService])
], CreateOrderUseCase);
