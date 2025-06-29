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
exports.BookService = void 0;
const tsyringe_1 = require("tsyringe");
const ServiceBookingRepository_1 = require("../../../infrastructure/repositories/ServiceBookingRepository");
const ServiceRepositorie_1 = require("../../../infrastructure/repositories/ServiceRepositorie");
let BookService = class BookService {
    constructor(serviceRepository, serviceBookingRepository, slotRepository) {
        this.serviceRepository = serviceRepository;
        this.serviceBookingRepository = serviceBookingRepository;
        this.slotRepository = slotRepository;
    }
    execute(userId, serviceId, address, preferredServiceTime, liveLocation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const service = yield this.serviceRepository.findById(serviceId);
                if (!service) {
                    throw new Error("Service not found");
                }
                const data = {
                    serviceProviderId: service.serviceProviderId,
                    serviceId,
                    address,
                    userId,
                    serviceStatus: "pending",
                    paymentType: "pending",
                    paymentStatus: "pending",
                    bookedTime: new Date(),
                    preferredSlot: preferredServiceTime,
                };
                if (liveLocation) {
                    data.liveLocation = liveLocation;
                }
                const result = yield this.serviceBookingRepository.createServiceBooking(data);
                if (result && result._id) {
                    yield this.serviceBookingRepository.addBookingHistory(result._id, "booked", "Service has been booked");
                }
                if (!result) {
                    throw new Error("Failed to book service");
                }
                return result;
            }
            catch (error) {
                console.error("Error in bookService:", error);
                throw new Error("Failed to book service: " + error.message);
            }
        });
    }
    bookOnlineService(userId, serviceId, preferredServiceTime, slotId) {
        return __awaiter(this, void 0, void 0, function* () {
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
            this.slotRepository.markSlotAsBooked(slotId);
            const result = yield this.serviceBookingRepository.createServiceBooking({
                serviceProviderId: service.serviceProviderId,
                serviceId,
                userId,
                payment: {
                    serviceCost: 0,
                    metaialCost: 0,
                    travelCost: 0,
                    inspectionCost: 0,
                    total: service.estimatedPrice,
                    convenienceFee: +(service.estimatedPrice * 0.10).toFixed(2),
                },
                serviceStatus: "confirmed",
                paymentType: "pending",
                paymentStatus: "pending",
                bookedTime: new Date(),
                isOnlineService: true,
                preferredSlot: preferredServiceTime,
                serviceSlot: serviceSlot,
            });
            if (!result) {
                throw new Error("Failed to book service");
            }
            return result;
        });
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(ServiceRepositorie_1.ServiceRepository)),
    __param(1, (0, tsyringe_1.inject)(ServiceBookingRepository_1.ServiceBookingRepository)),
    __param(2, (0, tsyringe_1.inject)("ISlotRepository")),
    __metadata("design:paramtypes", [ServiceRepositorie_1.ServiceRepository,
        ServiceBookingRepository_1.ServiceBookingRepository, Object])
], BookService);
