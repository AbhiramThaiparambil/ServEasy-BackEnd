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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookingUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = __importDefault(require("mongoose"));
const BookingQueueService_1 = require("../../../../../infrastructure/jobs/queue/BookingQueueService");
const tokens_1 = require("../../../../../constants/tokens");
const SocketService_1 = require("../../../../../services/socket/SocketService");
let CreateBookingUseCase = class CreateBookingUseCase {
    constructor(serviceRepository, serviceBookingRepository, socketService, serviceProviderRepo) {
        this.serviceRepository = serviceRepository;
        this.serviceBookingRepository = serviceBookingRepository;
        this.socketService = socketService;
        this.serviceProviderRepo = serviceProviderRepo;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, serviceId, address, preferredServiceTime, liveLocation } = data;
            // NOTE: mongoose.startSession() is used here for transaction support.
            // This is an infrastructure concern that will be abstracted in a future refactor.
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            try {
                const service = yield this.serviceRepository.findById(serviceId);
                if (!service) {
                    throw new Error("Service not found");
                }
                const hasActiveBooking = yield this.serviceBookingRepository.hasActiveBooking(userId, serviceId);
                if (hasActiveBooking) {
                    throw new Error("User already has an active booking");
                }
                const activeServices = yield this.serviceBookingRepository.countActiveServices(service.serviceProviderId);
                console.log(activeServices);
                if (activeServices >= 2) {
                    throw new Error("Service provider is busy");
                }
                const bookingData = Object.assign({ serviceProviderId: service.serviceProviderId, serviceId,
                    userId,
                    address, serviceStatus: "pending", paymentType: "pending", paymentStatus: "pending", bookedTime: new Date(), preferredSlot: preferredServiceTime }, (liveLocation && { liveLocation }));
                const result = yield this.serviceBookingRepository.createServiceBooking(bookingData, session);
                if (!result || !result._id) {
                    throw new Error("Failed to book service");
                }
                yield this.serviceBookingRepository.addBookingHistory(result._id, "booked", "Service has been booked", session);
                const notification = {
                    type: "notification",
                    targetRole: "SERVICE_PROVIDER",
                    content: `A customer booked your ${service.serviceName} service. View the booking details to proceed.`,
                    timestamp: new Date().toISOString(),
                };
                const providerUserId = yield this.serviceProviderRepo.findUserIdByProviderId(service.serviceProviderId);
                yield this.socketService.sendNotificationToUser(providerUserId, service.serviceProviderId.toString(), notification);
                yield session.commitTransaction();
                session.endSession();
                const bookingQueueService = tsyringe_1.container.resolve(BookingQueueService_1.BookingQueueService);
                yield bookingQueueService.addAutoCancelJob(result._id.toString());
                return result;
            }
            catch (error) {
                console.log(error);
                yield session.abortTransaction();
                session.endSession();
                throw error;
            }
        });
    }
};
exports.CreateBookingUseCase = CreateBookingUseCase;
exports.CreateBookingUseCase = CreateBookingUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceRepository)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceBookingRepository)),
    __param(2, (0, tsyringe_1.inject)(SocketService_1.SocketService)),
    __param(3, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceProviderRepository)),
    __metadata("design:paramtypes", [Object, Object, SocketService_1.SocketService, Object])
], CreateBookingUseCase);
