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
exports.ApplyCouponToBookingUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../../../constants/tokens");
const errorUtils_1 = require("../../../../../utils/errorUtils");
let ApplyCouponToBookingUseCase = class ApplyCouponToBookingUseCase {
    constructor(bookingRepo, couponRepo) {
        this.bookingRepo = bookingRepo;
        this.couponRepo = couponRepo;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const { bookingId, couponCode } = data;
                const booking = yield this.bookingRepo.findById(bookingId);
                if (!booking)
                    throw new Error("Booking not found");
                if (!booking.payment)
                    throw new Error("Booking payment not found");
                const coupon = yield this.couponRepo.findByCode(couponCode);
                if (!coupon)
                    throw new Error("Coupon not found");
                if (!coupon.isActive)
                    throw new Error("Coupon is inactive");
                const now = new Date();
                if (coupon.validFrom > now || coupon.validTo < now)
                    throw new Error("Coupon expired or not yet valid");
                const orderTotal = booking.payment.total;
                const discountValue = coupon.discountValue;
                if (!discountValue || discountValue <= 0)
                    throw new Error("Invalid coupon discount");
                if (coupon.minOrderAmount &&
                    orderTotal < coupon.minOrderAmount)
                    throw new Error(`Minimum order amount is ₹${coupon.minOrderAmount}`);
                if (discountValue > orderTotal)
                    throw new Error("Discount cannot be greater than order total");
                const alreadyUsed = yield this.couponRepo.hasUserUsedCoupon(coupon.code, booking.userId.toString());
                if (alreadyUsed)
                    throw new Error("Coupon already used");
                const finalTotal = orderTotal - discountValue;
                booking.coupon = {
                    _id: coupon._id,
                    code: coupon.code,
                    discountAmount: discountValue,
                    appliedAt: new Date(),
                };
                booking.payment.discountAmount = discountValue;
                booking.payment.finalTotal = finalTotal;
                const updatedBooking = yield this.bookingRepo.update(bookingId, booking);
                yield this.couponRepo.markUsedByUser(coupon.code, booking.userId.toString());
                return {
                    success: true,
                    discountAmount: discountValue,
                    finalAmount: (_b = (_a = updatedBooking === null || updatedBooking === void 0 ? void 0 : updatedBooking.payment) === null || _a === void 0 ? void 0 : _a.finalTotal) !== null && _b !== void 0 ? _b : finalTotal,
                    couponId: (_c = coupon._id) === null || _c === void 0 ? void 0 : _c.toString(),
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: (0, errorUtils_1.getErrorMessage)(error) ||
                        "Failed to apply coupon",
                };
            }
        });
    }
};
exports.ApplyCouponToBookingUseCase = ApplyCouponToBookingUseCase;
exports.ApplyCouponToBookingUseCase = ApplyCouponToBookingUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceBookingRepository)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.CouponRepository)),
    __metadata("design:paramtypes", [Object, Object])
], ApplyCouponToBookingUseCase);
