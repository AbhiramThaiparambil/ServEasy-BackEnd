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
exports.GetBookingPaymentSummaryUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../../../constants/tokens");
let GetBookingPaymentSummaryUseCase = class GetBookingPaymentSummaryUseCase {
    constructor(serviceBookingRepository) {
        this.serviceBookingRepository = serviceBookingRepository;
    }
    execute(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { serviceProviderId } = dto;
            const bookings = yield this.serviceBookingRepository.findCompletedByProvider(serviceProviderId);
            const serviceBookings = bookings.map((booking) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16;
                const materialCost = (_d = (_b = (_a = booking.payment) === null || _a === void 0 ? void 0 : _a.materialCost) !== null && _b !== void 0 ? _b : (_c = booking.payment) === null || _c === void 0 ? void 0 : _c.materialCost) !== null && _d !== void 0 ? _d : null;
                return {
                    _id: (_f = (_e = booking._id) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : "",
                    payment: {
                        convenienceFee: (_h = (_g = booking.payment) === null || _g === void 0 ? void 0 : _g.convenienceFee) !== null && _h !== void 0 ? _h : 0,
                        inspectionCost: (_k = (_j = booking.payment) === null || _j === void 0 ? void 0 : _j.inspectionCost) !== null && _k !== void 0 ? _k : 0,
                        materialCost: materialCost,
                        serviceCost: (_m = (_l = booking.payment) === null || _l === void 0 ? void 0 : _l.serviceCost) !== null && _m !== void 0 ? _m : 0,
                        total: (_p = (_o = booking.payment) === null || _o === void 0 ? void 0 : _o.total) !== null && _p !== void 0 ? _p : 0,
                        travelCost: (_r = (_q = booking.payment) === null || _q === void 0 ? void 0 : _q.travelCost) !== null && _r !== void 0 ? _r : 0,
                    },
                    paymentType: (_s = booking.paymentType) !== null && _s !== void 0 ? _s : "pending",
                    serviceBookedAddress: {
                        description: (_u = (_t = booking.address) === null || _t === void 0 ? void 0 : _t.description) !== null && _u !== void 0 ? _u : "",
                        houseName: (_w = (_v = booking.address) === null || _v === void 0 ? void 0 : _v.houseName) !== null && _w !== void 0 ? _w : "",
                        landmark: (_y = (_x = booking.address) === null || _x === void 0 ? void 0 : _x.landmark) !== null && _y !== void 0 ? _y : "",
                        name: (_0 = (_z = booking.address) === null || _z === void 0 ? void 0 : _z.name) !== null && _0 !== void 0 ? _0 : "",
                        phone: (_2 = (_1 = booking.address) === null || _1 === void 0 ? void 0 : _1.phone) !== null && _2 !== void 0 ? _2 : "",
                        pincode: (_4 = (_3 = booking.address) === null || _3 === void 0 ? void 0 : _3.pincode) !== null && _4 !== void 0 ? _4 : "",
                        state: (_6 = (_5 = booking.address) === null || _5 === void 0 ? void 0 : _5.state) !== null && _6 !== void 0 ? _6 : "",
                        _id: (_9 = (_8 = (_7 = booking.address) === null || _7 === void 0 ? void 0 : _7._id) === null || _8 === void 0 ? void 0 : _8.toString()) !== null && _9 !== void 0 ? _9 : "",
                    },
                    serviceImage: (_10 = booking.serviceImage) !== null && _10 !== void 0 ? _10 : "",
                    serviceName: (_11 = booking.serviceName) !== null && _11 !== void 0 ? _11 : "",
                    serviceStatus: (_12 = booking.serviceStatus) !== null && _12 !== void 0 ? _12 : "",
                    serviceType: (_13 = booking.serviceType) !== null && _13 !== void 0 ? _13 : "",
                    userEmail: (_14 = booking.userEmail) !== null && _14 !== void 0 ? _14 : "",
                    userName: (_15 = booking.userName) !== null && _15 !== void 0 ? _15 : "",
                    userProfile: (_16 = booking.userProfile) !== null && _16 !== void 0 ? _16 : "",
                };
            });
            return serviceBookings;
        });
    }
};
exports.GetBookingPaymentSummaryUseCase = GetBookingPaymentSummaryUseCase;
exports.GetBookingPaymentSummaryUseCase = GetBookingPaymentSummaryUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceBookingRepository)),
    __metadata("design:paramtypes", [Object])
], GetBookingPaymentSummaryUseCase);
