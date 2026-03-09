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
exports.ServiceController = void 0;
const requestUtils_1 = require("../../utils/requestUtils");
const errorUtils_1 = require("../../utils/errorUtils");
const tsyringe_1 = require("tsyringe");
const HttpStatus_1 = require("../../constants/HttpStatus");
const tokens_1 = require("../../constants/tokens");
let ServiceController = class ServiceController {
    constructor(getAllActiveService, cancelBookingUseCase, deleteSlotUseCase, createSlotUseCase, getServiceSlotUseCase, applyCouponUseCase, removeCouponUseCase, addNewServiceUseCase, getServiceUseCase, editServiceUseCase, blockUnblockServiceUseCase) {
        this.getAllActiveService = getAllActiveService;
        this.cancelBookingUseCase = cancelBookingUseCase;
        this.deleteSlotUseCase = deleteSlotUseCase;
        this.createSlotUseCase = createSlotUseCase;
        this.getServiceSlotUseCase = getServiceSlotUseCase;
        this.applyCouponUseCase = applyCouponUseCase;
        this.removeCouponUseCase = removeCouponUseCase;
        this.addNewServiceUseCase = addNewServiceUseCase;
        this.getServiceUseCase = getServiceUseCase;
        this.editServiceUseCase = editServiceUseCase;
        this.blockUnblockServiceUseCase = blockUnblockServiceUseCase;
    }
    cancelUserBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, requestUtils_1.getString)(req.params.id);
                const { cancellationReason } = req.body;
                if (!id || !cancellationReason) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        message: "Booking ID and cancellation reason are required.",
                    });
                    return;
                }
                const dto = {
                    bookingId: id,
                    status: "cancelled",
                    reason: cancellationReason,
                };
                const result = yield this.cancelBookingUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    message: "Booking cancelled successfully.",
                    data: result,
                });
            }
            catch (error) {
                console.error("Error cancelling user booking:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "Something went wrong while cancelling the booking.",
                });
            }
        });
    }
    getOnlineServiceWithSlotHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceId = (0, requestUtils_1.getString)(req.params.serviceId);
                if (!serviceId) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "serviceId is required" });
                    return;
                }
                const data = yield this.getAllActiveService.getOnlineServicesWithSlot(serviceId);
                res.status(HttpStatus_1.HttpStatus.OK).json(data);
            }
            catch (error) {
                console.error("Error fetching online services with slots:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
            }
        });
    }
    getOnlineServiceSlotsHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, requestUtils_1.getString)(req.params.id);
                const dto = { serviceId: id };
                const data = yield this.getServiceSlotUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json(data);
            }
            catch (error) {
                console.error("Error fetching online services with slots:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Internal server error" });
            }
        });
    }
    deleteSlotHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, requestUtils_1.getString)(req.params.id);
                if (!id) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        message: "Slot ID is required",
                    });
                    return;
                }
                const dto = { slotId: id };
                yield this.deleteSlotUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    message: "Slot deleted successfully",
                });
            }
            catch (error) {
                console.error("Error deleting slot:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "Internal Server Error",
                });
            }
        });
    }
    createSlotHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serviceId, startTime, endTime } = req.body;
                console.log(startTime, endTime);
                if (!serviceId || !startTime || !endTime) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        message: "Missing required fields: serviceId, startTime, endTime",
                    });
                    return;
                }
                const dto = {
                    serviceId,
                    startTime,
                    endTime,
                    booked: false,
                };
                const slot = yield this.createSlotUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.CREATED).json({
                    message: "Slot created successfully",
                    slot,
                });
            }
            catch (error) {
                console.error("Error creating slot:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "Internal Server Error",
                });
            }
        });
    }
    applyCoupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingId = (0, requestUtils_1.getString)(req.params.bookingId);
                const { couponCode } = req.body;
                const updatedBooking = yield this.applyCouponUseCase.execute({
                    bookingId,
                    couponCode,
                });
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    data: updatedBooking,
                });
                return;
            }
            catch (error) {
                console.log((0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                    .json({ message: (0, errorUtils_1.getErrorMessage)(error) || "Failed to apply coupon" });
                return;
            }
        });
    }
    removeCoupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingId = (0, requestUtils_1.getString)(req.params.bookingId);
                if (!bookingId) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        message: "Missing required fields: serviceId, startTime, endTime",
                    });
                    return;
                }
                const updatedBooking = yield this.removeCouponUseCase.execute({ bookingId });
                console.log(updatedBooking);
                res.status(200).json({
                    data: updatedBooking,
                });
                return;
            }
            catch (error) {
                console.log((0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(400)
                    .json({ message: (0, errorUtils_1.getErrorMessage)(error) || "Failed to remove coupon" });
                return;
            }
        });
    }
    addNewService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serviceName, description, serviceType, category, location, estimatedPrice, serviceImage, serviceProviderId, } = req.body;
                if (!serviceName ||
                    !description ||
                    !serviceType ||
                    !category ||
                    !location ||
                    !estimatedPrice ||
                    !serviceImage ||
                    !serviceProviderId) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ error: "Bad Request: Missing required fields" });
                    return;
                }
                const updateLocation = {
                    type: "Point",
                    coordinates: [location.longitude, location.latitude],
                    address: location.address,
                };
                const serviceData = {
                    serviceName,
                    description,
                    serviceType,
                    category,
                    location: updateLocation,
                    estimatedPrice,
                    serviceImage,
                    serviceProviderId,
                };
                const service = yield this.addNewServiceUseCase.execute(serviceData);
                res.status(HttpStatus_1.HttpStatus.CREATED).json({ data: service });
            }
            catch (error) {
                console.error((0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ error: "Internal Server Error" });
            }
        });
    }
    getServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceProviderId = res.locals.serviceProvider_id;
                if (!serviceProviderId) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Service Provider ID is required." });
                    return;
                }
                const dto = { providerId: serviceProviderId };
                const result = yield this.getServiceUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json({ allServices: result });
            }
            catch (e) {
                console.error((0, errorUtils_1.getErrorMessage)(e));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "An error occurred while fetching services.",
                });
            }
        });
    }
    updateService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceId = (0, requestUtils_1.getString)(req.params.serviceId);
                if (!serviceId) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ error: "Bad Request: Missing serviceId" });
                    return;
                }
                const { serviceName, description, serviceType, category, location, estimatedPrice, serviceImage, serviceProviderId, } = req.body;
                if (!serviceName ||
                    !description ||
                    !serviceType ||
                    !category ||
                    !location ||
                    !estimatedPrice ||
                    !serviceImage ||
                    !serviceProviderId) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ error: "Bad Request: Missing required fields" });
                    return;
                }
                const serviceData = {
                    serviceName,
                    description,
                    serviceType,
                    category,
                    location,
                    estimatedPrice,
                    serviceImage: "",
                    serviceProviderId,
                };
                const dto = {
                    serviceId,
                    serviceData,
                    serviceNewImg: serviceImage,
                };
                const updatedService = yield this.editServiceUseCase.execute(dto);
                if (!updatedService) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ error: "Service not found or not updated" });
                    return;
                }
                res
                    .status(HttpStatus_1.HttpStatus.OK)
                    .json({ message: "Service updated successfully", data: updatedService });
            }
            catch (error) {
                console.error((0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ error: "Internal Server Error" });
            }
        });
    }
    blockUnblockService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serviceId, action } = req.body;
                if (!serviceId || !action) {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "serviceId and action are required" });
                    return;
                }
                let result;
                const dto = { serviceId };
                if (action === "Block") {
                    result = yield this.blockUnblockServiceUseCase.blockService(dto);
                }
                else if (action === "Unblock") {
                    result = yield this.blockUnblockServiceUseCase.unblockService(dto);
                }
                else {
                    res
                        .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                        .json({ message: "Invalid action. Use 'Block' or 'Unblock'." });
                    return;
                }
                if (result) {
                    res.status(HttpStatus_1.HttpStatus.OK).json({
                        message: `Service ${action.toLowerCase()}ed successfully`,
                    });
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        message: `Failed to ${action.toLowerCase()} service`,
                    });
                }
            }
            catch (error) {
                console.error("Error in blockUnblockService:", (0, errorUtils_1.getErrorMessage)(error));
                res
                    .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: (0, errorUtils_1.getErrorMessage)(error) || "Internal server error" });
            }
        });
    }
};
exports.ServiceController = ServiceController;
exports.ServiceController = ServiceController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetAllActiveServiceUseCase)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.CancelBookingUseCase)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.DeleteSlotUseCase)),
    __param(3, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.CreateSlotUseCase)),
    __param(4, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetSlotUseCase)),
    __param(5, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.ApplyCouponToBookingUseCase)),
    __param(6, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.RemoveCouponToBookingUseCase)),
    __param(7, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.AddNewService)),
    __param(8, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.GetService)),
    __param(9, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.EditService)),
    __param(10, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.BlockUnblockSericeUseCase)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], ServiceController);
