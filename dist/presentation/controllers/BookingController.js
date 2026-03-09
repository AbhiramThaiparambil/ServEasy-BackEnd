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
exports.BookingController = void 0;
const requestUtils_1 = require("../../utils/requestUtils");
const errorUtils_1 = require("../../utils/errorUtils");
const tsyringe_1 = require("tsyringe");
const mongoose_1 = __importDefault(require("mongoose"));
const HttpStatus_1 = require("../../constants/HttpStatus");
const tokens_1 = require("../../constants/tokens");
let BookingController = class BookingController {
    constructor(createBookingUseCase, createOnlineBookingUseCase, updateBookingStatusUseCase, confirmBookingUseCase, cancelBookingUseCase, requestPaymentUseCase, getBookedServicesUseCase, getBookedServiceByIdUseCase, rescheduleOnlineServiceSlotUseCase, uploadBillsUseCase, getBookingPaymentSummaryUseCase) {
        this.createBookingUseCase = createBookingUseCase;
        this.createOnlineBookingUseCase = createOnlineBookingUseCase;
        this.updateBookingStatusUseCase = updateBookingStatusUseCase;
        this.confirmBookingUseCase = confirmBookingUseCase;
        this.cancelBookingUseCase = cancelBookingUseCase;
        this.requestPaymentUseCase = requestPaymentUseCase;
        this.getBookedServicesUseCase = getBookedServicesUseCase;
        this.getBookedServiceByIdUseCase = getBookedServiceByIdUseCase;
        this.rescheduleOnlineServiceSlotUseCase = rescheduleOnlineServiceSlotUseCase;
        this.uploadBillsUseCase = uploadBillsUseCase;
        this.getBookingPaymentSummaryUseCase = getBookingPaymentSummaryUseCase;
        this.uploadBills = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, requestUtils_1.getString)(req.params.id);
                const { invoices } = req.body;
                if (!Array.isArray(invoices) || invoices.length === 0) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "No invoice images provided." });
                    return;
                }
                const dto = {
                    bookingId: id,
                    images: invoices,
                };
                yield this.uploadBillsUseCase.execute(dto);
                res
                    .status(HttpStatus_1.HttpStatus.CREATED)
                    .json({ message: "Invoice images uploaded successfully." });
            }
            catch (error) {
                console.error("Error uploading invoice bills:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Failed to upload invoice images." });
            }
        });
    }
    createBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
                const { serviceId, address, preferredServiceTime, liveLocation } = req.body;
                console.log(serviceId, address, preferredServiceTime, liveLocation);
                const dto = {
                    userId,
                    serviceId,
                    address,
                    preferredServiceTime,
                    liveLocation,
                };
                const booking = yield this.createBookingUseCase.execute(dto);
                res.status(201).json({
                    success: true,
                    message: "Service booked successfully",
                    data: booking,
                });
            }
            catch (error) {
                console.log("error message ");
                console.log((0, errorUtils_1.getErrorMessage)(error));
                res.status(409).json({
                    success: false,
                    message: (0, errorUtils_1.getErrorMessage)(error),
                });
            }
        });
    }
    createOnlineBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
                const { serviceId, slotId } = req.body;
                const dto = {
                    userId,
                    serviceId,
                    slotId,
                };
                const booking = yield this.createOnlineBookingUseCase.execute(dto);
                res.status(201).json({
                    success: true,
                    message: "Online service booked successfully",
                    data: booking,
                });
            }
            catch (error) {
                res.status(409).json({
                    success: false,
                    message: (0, errorUtils_1.getErrorMessage)(error),
                });
            }
        });
    }
    updateBookingStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, requestUtils_1.getString)(req.params.id);
                const { serviceStatus } = req.body;
                if (!id || !serviceStatus) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        error: "Missing booking id or serviceStatus",
                    });
                    return;
                }
                const dto = {
                    bookingId: id,
                    status: serviceStatus,
                };
                const data = yield this.updateBookingStatusUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    message: "Booking status updated successfully",
                    data,
                });
            }
            catch (error) {
                res.status(HttpStatus_1.HttpStatus.CONFLICT).json({
                    error: (0, errorUtils_1.getErrorMessage)(error),
                });
            }
        });
    }
    confirmBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, requestUtils_1.getString)(req.params.id);
                const { serviceStatus, estimatedServiceTime, reschedule, reschedReason } = req.body;
                const serviceProviderId = res.locals.serviceProvider_id;
                if (!id || !serviceStatus || !estimatedServiceTime) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        error: "Missing required fields",
                    });
                    return;
                }
                const dto = {
                    bookingId: id,
                    status: serviceStatus,
                    estimatedServiceTime,
                    serviceProviderId,
                    reschedule: Boolean(reschedule),
                    rescheduleReason: reschedReason,
                };
                const data = yield this.confirmBookingUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    message: data.message || "Booking confirmed successfully",
                    success: data.success,
                });
            }
            catch (error) {
                res.status(HttpStatus_1.HttpStatus.CONFLICT).json({
                    error: (0, errorUtils_1.getErrorMessage)(error),
                });
            }
        });
    }
    RescheduleOnlineService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { bookingId, date, startTime, endTime } = req.body;
                if (!bookingId || !date || !startTime || !endTime) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        error: "Missing required fields",
                    });
                    return;
                }
                const dto = {
                    bookingId,
                    date,
                    startTime,
                    endTime,
                };
                const data = yield this.rescheduleOnlineServiceSlotUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    message: "Booking rescheduled successfully",
                    data,
                });
            }
            catch (error) {
                console.log((0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.CONFLICT).json({
                    error: (0, errorUtils_1.getErrorMessage)(error),
                });
            }
        });
    }
    cancelBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, requestUtils_1.getString)(req.params.id);
                const { serviceStatus, cancellationReason } = req.body;
                if (!id || !serviceStatus || !cancellationReason) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        error: "Missing cancellation details",
                    });
                }
                const dto = {
                    bookingId: id,
                    status: serviceStatus,
                    reason: cancellationReason,
                };
                const data = yield this.cancelBookingUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    message: "Booking cancelled successfully",
                    data,
                });
            }
            catch (error) {
                res.status(HttpStatus_1.HttpStatus.CONFLICT).json({
                    error: (0, errorUtils_1.getErrorMessage)(error),
                });
            }
        });
    }
    requestPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, requestUtils_1.getString)(req.params.id);
                const { payment, paymentStatus } = req.body;
                if (!id || !payment || !paymentStatus) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        error: "Missing payment data",
                    });
                    return;
                }
                const dto = {
                    bookingId: id,
                    payment,
                    paymentStatus,
                };
                const data = yield this.requestPaymentUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    message: "Payment requested successfully",
                    data,
                });
            }
            catch (error) {
                res.status(HttpStatus_1.HttpStatus.CONFLICT).json({
                    error: (0, errorUtils_1.getErrorMessage)(error),
                });
            }
        });
    }
    getUserBookedServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("hello");
                const userId = new mongoose_1.default.Types.ObjectId(res.locals.user.userId);
                if (req.query.count) {
                    const dto = {
                        userId: userId.toString(),
                    };
                    const count = yield this.getBookedServicesUseCase.getUserBookedServiceCount(dto);
                    res.status(HttpStatus_1.HttpStatus.OK).json({ count });
                    return;
                }
                const limit = Number((0, requestUtils_1.getString)(req.query.limit) || 10);
                const page = Number((0, requestUtils_1.getString)(req.query.page) || 0);
                const skip = page * limit;
                const dto = {
                    userId: userId.toString(),
                    skip,
                    limit,
                };
                const services = yield this.getBookedServicesUseCase.getUserBookedServices(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({ services });
            }
            catch (error) {
                console.error("Error in getUserBookedServices:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: "Internal Server Error",
                    details: (0, errorUtils_1.getErrorMessage)(error),
                });
            }
        });
    }
    getBookedServiceDetailsForProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, requestUtils_1.getString)(req.params.id);
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        error: "Invalid service booking ID",
                    });
                }
                const dto = { bookingId: id };
                const service = yield this.getBookedServiceByIdUseCase.getForServiceProvider(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({ service });
            }
            catch (error) {
                console.error("Error in getForServiceProvider:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: "Internal Server Error",
                    details: (0, errorUtils_1.getErrorMessage)(error),
                });
            }
        });
    }
    getBookedServiceDetailsForUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, requestUtils_1.getString)(req.params.id);
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        error: "Invalid service booking ID",
                    });
                }
                const dto = { bookingId: id };
                const service = yield this.getBookedServiceByIdUseCase.getForUser(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({ service });
            }
            catch (error) {
                console.error("Error in getForServiceProvider:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: "Internal Server Error",
                    details: (0, errorUtils_1.getErrorMessage)(error),
                });
            }
        });
    }
    getBookedServicesForProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceProviderId = res.locals.serviceProvider_id;
                if (!serviceProviderId) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        error: "Service provider ID is required.",
                    });
                }
                const limit = Number((0, requestUtils_1.getString)(req.query.limit) || 10);
                const page = Number((0, requestUtils_1.getString)(req.query.page) || 0);
                const skip = page * limit;
                const dto = {
                    serviceProviderId,
                    skip,
                    limit,
                };
                const { services, count } = yield this.getBookedServicesUseCase.getServiceProviderBookedServices(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    services,
                    count,
                });
            }
            catch (error) {
                console.error("Error in getBookedServicesForProvider:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: "Internal Server Error",
                    details: (0, errorUtils_1.getErrorMessage)(error),
                });
            }
        });
    }
    getBookingPaymentSummary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(res.locals);
                console.log(req.params.id);
                console.log(res.locals.serviceProvider_id);
                console.log("serviceProviderId:" + res.locals.serviceProvider_id);
                const serviceProviderId = (0, requestUtils_1.getString)(req.params.id);
                console.log("serviceProviderId:" + serviceProviderId);
                const dto = {
                    serviceProviderId: serviceProviderId,
                };
                const data = yield this.getBookingPaymentSummaryUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    success: true,
                    data,
                });
            }
            catch (error) {
                console.error("Error in getBookingPaymentSummary:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    error: "Internal Server Error",
                    details: (0, errorUtils_1.getErrorMessage)(error),
                });
            }
        });
    }
};
exports.BookingController = BookingController;
exports.BookingController = BookingController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.CreateBookingUseCase)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.CreateOnlineBookingUseCase)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.UpdateBookingStatusUseCase)),
    __param(3, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.ConfirmBookingUseCase)),
    __param(4, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.CancelBookingUseCase)),
    __param(5, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.RequestPaymentUseCase)),
    __param(6, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetBookedServicesUseCase)),
    __param(7, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetBookedServiceByIdUseCase)),
    __param(8, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.RescheduleOnlineServiceSlotUseCase)),
    __param(9, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.UploadBillsUseCase)),
    __param(10, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetBookingPaymentSummaryUseCase)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], BookingController);
