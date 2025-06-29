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
exports.UpdateServiceStatus = void 0;
const tsyringe_1 = require("tsyringe");
const ServiceBookingRepository_1 = require("../../../infrastructure/repositories/ServiceBookingRepository");
const mongoose_1 = __importDefault(require("mongoose"));
const socketService_1 = require("../../../services/socket/socketService");
const formatDateTime_1 = require("../../../utils/formatDateTime");
let UpdateServiceStatus = class UpdateServiceStatus {
    constructor(serviceBookingRepository, socketService) {
        this.serviceBookingRepository = serviceBookingRepository;
        this.socketService = socketService;
    }
    updateBookingStatus(serviceBookedId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookedServiceId = new mongoose_1.default.Types.ObjectId(serviceBookedId);
            const data = yield this.serviceBookingRepository.updateServiceStatus(bookedServiceId, status);
            this.serviceBookingRepository.addBookingHistory(bookedServiceId, "status-updated", "booking status has been updated to " + status);
            const notification = {
                type: "notfication",
                content: (data === null || data === void 0 ? void 0 : data.isOnlineService) ? "Your service has been confirmed. Please complete the payment to proceed" : `The status of your booked service has been updated to  ${status}`,
                timestamp: new Date().toISOString(),
            };
            this.socketService.sendNotificationToUser((data === null || data === void 0 ? void 0 : data.userId) + "", notification);
            return data;
        });
    }
    ConformBookingStatus(serviceBookedId, status, estimatedServiceTime, serviceProviderId, reschedule, reschedReason) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookedServiceId = new mongoose_1.default.Types.ObjectId(serviceBookedId);
            const providerId = new mongoose_1.default.Types.ObjectId(serviceProviderId);
            const isConflicting = yield this.serviceBookingRepository.isServiceTimeConflicting(providerId, estimatedServiceTime);
            console.log(isConflicting, "isConflicting");
            console.log(serviceBookedId, "serviceBookedId");
            console.log(serviceProviderId, "serviceProviderId");
            let notification = null;
            if (isConflicting) {
                return { error: "You have already allocated this time slot to a service." };
            }
            const bookedService = yield this.serviceBookingRepository.findBookedServiceById(bookedServiceId);
            if (reschedule) {
                yield this.serviceBookingRepository.rescheduleBooking(bookedServiceId, estimatedServiceTime);
                this.serviceBookingRepository.addBookingHistory(bookedServiceId, "rescheduled", `Your booking has been rescheduled to ${(0, formatDateTime_1.formatDateTime)(estimatedServiceTime)}. Reason: ${reschedReason}`);
                notification = {
                    type: "notfication",
                    content: `Your booking has been rescheduled to ${(0, formatDateTime_1.formatDateTime)(estimatedServiceTime)}.`,
                    timestamp: new Date().toISOString(),
                };
            }
            else {
                const data = yield this.serviceBookingRepository.confirmBooking(bookedServiceId, status, estimatedServiceTime);
                this.serviceBookingRepository.addBookingHistory(bookedServiceId, "confirmed", "booking has been confirmed by service provider.and is scheduled for " + (0, formatDateTime_1.formatDateTime)(estimatedServiceTime));
                notification = {
                    type: "notfication",
                    content: "Your booking has been confirmed!",
                    timestamp: new Date().toISOString(),
                };
                if (notification.content && notification.type) {
                    this.socketService.sendNotificationToUser((bookedService === null || bookedService === void 0 ? void 0 : bookedService.userId) + "", notification);
                }
                return data;
            }
            if (notification.content && notification.type) {
                this.socketService.sendNotificationToUser((bookedService === null || bookedService === void 0 ? void 0 : bookedService.userId) + "", notification);
            }
            return { success: true };
        });
    }
    bookingCancel(id, status, cancellationReason) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookedServiceId = new mongoose_1.default.Types.ObjectId(id);
            const data = yield this.serviceBookingRepository.cancelBooking(bookedServiceId, status, cancellationReason);
            this.serviceBookingRepository.addBookingHistory(bookedServiceId, "cancelled", "booking has been cancelled by service provider. Reason: " + cancellationReason);
            const notification = {
                type: "notfication",
                content: `Your booking has been cancelled.`,
                timestamp: new Date().toISOString(),
            };
            this.socketService.sendNotificationToUser((data === null || data === void 0 ? void 0 : data.userId) + "", notification);
            return data;
        });
    }
    requestPayment(id, paymentData, paymentStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            let convenienceFee = 0;
            if (paymentData.total > 100) {
                convenienceFee = paymentData.total * 0.1;
            }
            const payment = {
                inspectionCost: paymentData.inspectionCost,
                serviceCost: paymentData.serviceCost,
                metaialCost: paymentData.metaialCost,
                total: paymentData.total,
                travelCost: paymentData.travelCost,
                convenienceFee: convenienceFee,
            };
            const requestId = new mongoose_1.default.Types.ObjectId(id);
            const data = yield this.serviceBookingRepository.requestPayment(requestId, paymentStatus, payment);
            this.serviceBookingRepository.addBookingHistory(requestId, "payment-requested", "Payment requested for your service. Please complete the payment to proceed.");
            const notification = {
                type: "notfication",
                content: `Payment requested for your service. Please complete the payment to proceed.`,
                timestamp: new Date().toISOString(),
            };
            this.socketService.sendNotificationToUser((data === null || data === void 0 ? void 0 : data.userId) + "", notification);
            return data;
        });
    }
};
exports.UpdateServiceStatus = UpdateServiceStatus;
exports.UpdateServiceStatus = UpdateServiceStatus = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(ServiceBookingRepository_1.ServiceBookingRepository)),
    __param(1, (0, tsyringe_1.inject)(socketService_1.SocketService)),
    __metadata("design:paramtypes", [ServiceBookingRepository_1.ServiceBookingRepository,
        socketService_1.SocketService])
], UpdateServiceStatus);
