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
exports.ConfirmBookingUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const SocketService_1 = require("../../../../../services/socket/SocketService");
const formatDateTime_1 = require("../../../../../utils/formatDateTime");
const tokens_1 = require("../../../../../constants/tokens");
let ConfirmBookingUseCase = class ConfirmBookingUseCase {
    constructor(serviceBookingRepository, socketService) {
        this.serviceBookingRepository = serviceBookingRepository;
        this.socketService = socketService;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const isConflicting = yield this.serviceBookingRepository.isServiceTimeConflicting(data.serviceProviderId, data.estimatedServiceTime);
            if (isConflicting) {
                throw new Error("Time slot already allocated");
            }
            const booking = yield this.serviceBookingRepository.findBookedServiceById(data.bookingId);
            if (!booking)
                throw new Error("Booking not found");
            let notification;
            if (data.reschedule) {
                yield this.serviceBookingRepository.rescheduleBooking(data.bookingId, data.estimatedServiceTime);
                yield this.serviceBookingRepository.addBookingHistory(data.bookingId, "rescheduled", `Rescheduled to ${(0, formatDateTime_1.formatDateTime)(data.estimatedServiceTime)}`);
                notification = {
                    type: "notification",
                    targetRole: "USER",
                    content: `Your booking has been rescheduled to ${(0, formatDateTime_1.formatDateTime)(data.estimatedServiceTime)}`,
                    timestamp: new Date().toISOString(),
                };
                this.socketService.sendNotificationToUser(booking.userId.toString(), booking.userId.toString(), notification);
                return { success: true, message: "Booking rescheduled successfully" };
            }
            if (booking.serviceStatus === "confirmed") {
                throw new Error("Booking already confirmed");
            }
            yield this.serviceBookingRepository.confirmBooking(data.bookingId, data.status, data.estimatedServiceTime);
            yield this.serviceBookingRepository.addBookingHistory(data.bookingId, "confirmed", `Booking confirmed for ${(0, formatDateTime_1.formatDateTime)(data.estimatedServiceTime)}`);
            notification = {
                type: "notification",
                targetRole: "USER",
                content: "Your booking has been confirmed!",
                timestamp: new Date().toISOString(),
            };
            this.socketService.sendNotificationToUser(booking.userId.toString(), booking.userId.toString(), notification);
            return { success: true, message: "Booking confirmed successfully" };
        });
    }
};
exports.ConfirmBookingUseCase = ConfirmBookingUseCase;
exports.ConfirmBookingUseCase = ConfirmBookingUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceBookingRepository)),
    __param(1, (0, tsyringe_1.inject)(SocketService_1.SocketService)),
    __metadata("design:paramtypes", [Object, SocketService_1.SocketService])
], ConfirmBookingUseCase);
