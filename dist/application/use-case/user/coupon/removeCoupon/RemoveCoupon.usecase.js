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
exports.RemoveCouponToBookingUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../../../constants/tokens");
const errorUtils_1 = require("../../../../../utils/errorUtils");
let RemoveCouponToBookingUseCase = class RemoveCouponToBookingUseCase {
    constructor(bookingRepository, couponRepo) {
        this.bookingRepository = bookingRepository;
        this.couponRepo = couponRepo;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { bookingId } = data;
                const booking = yield this.bookingRepository.findById(bookingId);
                if (!booking) {
                    throw new Error("Booking not found");
                }
                if (!booking.coupon) {
                    throw new Error("No coupon applied to this booking");
                }
                yield this.couponRepo.removeCoupon(booking.userId, booking.coupon._id + "");
                const updatedBooking = yield this.bookingRepository.removeCouponAndUpdatePayment(bookingId);
                return {
                    success: true,
                    message: "Coupon removed successfully",
                    discountAmount: ((_a = updatedBooking === null || updatedBooking === void 0 ? void 0 : updatedBooking.payment) === null || _a === void 0 ? void 0 : _a.discountAmount) || 0,
                    finalAmount: ((_b = updatedBooking === null || updatedBooking === void 0 ? void 0 : updatedBooking.payment) === null || _b === void 0 ? void 0 : _b.finalTotal) || 0,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: (0, errorUtils_1.getErrorMessage)(error) || "Failed to remove coupon",
                };
            }
        });
    }
};
exports.RemoveCouponToBookingUseCase = RemoveCouponToBookingUseCase;
exports.RemoveCouponToBookingUseCase = RemoveCouponToBookingUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceBookingRepository)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.CouponRepository)),
    __metadata("design:paramtypes", [Object, Object])
], RemoveCouponToBookingUseCase);
