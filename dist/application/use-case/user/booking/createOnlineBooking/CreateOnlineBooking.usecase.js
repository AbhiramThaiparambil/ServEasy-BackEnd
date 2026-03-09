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
exports.CreateOnlineBookingUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../../../constants/tokens");
let CreateOnlineBookingUseCase = class CreateOnlineBookingUseCase {
    constructor(serviceRepository, serviceBookingRepository, slotRepository) {
        this.serviceRepository = serviceRepository;
        this.serviceBookingRepository = serviceBookingRepository;
        this.slotRepository = slotRepository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, serviceId, slotId } = data;
            const service = yield this.serviceRepository.findById(serviceId);
            if (!service || !slotId) {
                throw new Error("Service not found or slot ID is missing");
            }
            const slot = yield this.slotRepository.getSlotById(slotId);
            if (!slot) {
                throw new Error("Slot not found");
            }
            if (slot.booked) {
                throw new Error("Slot is already booked");
            }
            const serviceSlot = {
                date: new Date(),
                startTime: slot.startTime,
                endTime: slot.endTime,
            };
            yield this.slotRepository.markSlotAsBooked(slotId);
            const result = yield this.serviceBookingRepository.createServiceBooking({
                serviceProviderId: service.serviceProviderId,
                serviceId,
                userId,
                serviceStatus: "confirmed",
                paymentType: "pending",
                paymentStatus: "pending",
                bookedTime: new Date(),
                isOnlineService: true,
                serviceSlot,
                payment: {
                    serviceCost: 0,
                    materialCost: 0,
                    travelCost: 0,
                    inspectionCost: 0,
                    total: service.estimatedPrice,
                    convenienceFee: +(service.estimatedPrice * 0.1).toFixed(2),
                    discountAmount: 0,
                    finalTotal: service.estimatedPrice,
                },
            });
            if (!result) {
                throw new Error("Failed to book online service");
            }
            return result;
        });
    }
};
exports.CreateOnlineBookingUseCase = CreateOnlineBookingUseCase;
exports.CreateOnlineBookingUseCase = CreateOnlineBookingUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceRepository)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceBookingRepository)),
    __param(2, (0, tsyringe_1.inject)("ISlotRepository")),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreateOnlineBookingUseCase);
