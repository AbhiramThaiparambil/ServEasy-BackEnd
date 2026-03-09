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
exports.UpdateBookingStatusUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const SocketService_1 = require("../../../../../services/socket/SocketService");
const tokens_1 = require("../../../../../constants/tokens");
let UpdateBookingStatusUseCase = class UpdateBookingStatusUseCase {
    constructor(serviceBookingRepository, socketService) {
        this.serviceBookingRepository = serviceBookingRepository;
        this.socketService = socketService;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.serviceBookingRepository.updateServiceStatus(data.bookingId, data.status);
            yield this.serviceBookingRepository.addBookingHistory(data.bookingId, "status-updated", `Booking status updated to ${data.status}`);
            const notification = {
                type: "notification",
                targetRole: "USER",
                content: (result === null || result === void 0 ? void 0 : result.isOnlineService)
                    ? "Your service has been confirmed. Please complete payment."
                    : `Your booking status has been updated to ${data.status}`,
                timestamp: new Date().toISOString(),
            };
            this.socketService.sendNotificationToUser((result === null || result === void 0 ? void 0 : result.userId) + "", (result === null || result === void 0 ? void 0 : result.userId) + "", notification);
            this.socketService.refreshData((result === null || result === void 0 ? void 0 : result.userId) + "");
            return result;
        });
    }
};
exports.UpdateBookingStatusUseCase = UpdateBookingStatusUseCase;
exports.UpdateBookingStatusUseCase = UpdateBookingStatusUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceBookingRepository)),
    __param(1, (0, tsyringe_1.inject)(SocketService_1.SocketService)),
    __metadata("design:paramtypes", [Object, SocketService_1.SocketService])
], UpdateBookingStatusUseCase);
