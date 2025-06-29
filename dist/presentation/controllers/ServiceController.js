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
const tsyringe_1 = require("tsyringe");
const getAllService_1 = require("../../application/use-case/User/getAllService");
const HttpStatus_1 = require("../../constants/HttpStatus");
const updateBookingStatus_1 = require("../../application/use-case/bookService/updateBookingStatus");
const DeleteSlotUseCase_1 = require("../../application/use-case/admin/slot/DeleteSlotUseCase");
const CreateSlotUseCase_1 = require("../../application/use-case/admin/slot/CreateSlotUseCase");
const getSlot_1 = require("../../application/use-case/admin/slot/getSlot");
let ServiceController = class ServiceController {
    constructor(getAllActiveService, updateServiceStatus, deleteSlotUseCase, createSlot, getServiceSlot) {
        this.getAllActiveService = getAllActiveService;
        this.updateServiceStatus = updateServiceStatus;
        this.deleteSlotUseCase = deleteSlotUseCase;
        this.createSlot = createSlot;
        this.getServiceSlot = getServiceSlot;
    }
    cancelUserBooking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { cancellationReason } = req.body;
                if (!id || !cancellationReason) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        message: 'Booking ID and cancellation reason are required.',
                    });
                    return;
                }
                const result = yield this.updateServiceStatus.bookingCancel(id, 'cancelled', cancellationReason);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    message: 'Booking cancelled successfully.',
                    data: result,
                });
            }
            catch (error) {
                console.error('Error cancelling user booking:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'Something went wrong while cancelling the booking.',
                });
            }
        });
    }
    getOnlineServiceWithSlotHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.getAllActiveService.getOnlineServicesWithSlot();
                res.status(HttpStatus_1.HttpStatus.OK).json(data);
            }
            catch (error) {
                console.error('Error fetching online services with slots:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        });
    }
    getOnlineServiceSlotsHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const data = yield this.getServiceSlot.execute(id);
                res.status(HttpStatus_1.HttpStatus.OK).json(data);
            }
            catch (error) {
                console.error('Error fetching online services with slots:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }
        });
    }
    deleteSlotHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        message: 'Slot ID is required',
                    });
                    return;
                }
                yield this.deleteSlotUseCase.execute(id);
                res.status(HttpStatus_1.HttpStatus.OK).json({
                    message: 'Slot deleted successfully',
                });
            }
            catch (error) {
                console.error('Error deleting slot:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'Internal Server Error',
                });
            }
        });
    }
    createSlotHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serviceId, startTime, endTime } = req.body;
                if (!serviceId || !startTime || !endTime) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                        message: 'Missing required fields: serviceId, startTime, endTime',
                    });
                    return;
                }
                const slot = yield this.createSlot.execute({
                    serviceId,
                    startTime,
                    endTime,
                    booked: false,
                });
                res.status(HttpStatus_1.HttpStatus.CREATED).json({
                    message: 'Slot created successfully',
                    slot,
                });
            }
            catch (error) {
                console.error('Error creating slot:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    message: 'Internal Server Error',
                });
            }
        });
    }
};
exports.ServiceController = ServiceController;
exports.ServiceController = ServiceController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(getAllService_1.GetAllActiveService)),
    __param(1, (0, tsyringe_1.inject)(updateBookingStatus_1.UpdateServiceStatus)),
    __param(2, (0, tsyringe_1.inject)(DeleteSlotUseCase_1.DeleteSlotUseCase)),
    __param(3, (0, tsyringe_1.inject)(CreateSlotUseCase_1.CreateSlotUseCase)),
    __param(4, (0, tsyringe_1.inject)(getSlot_1.GetServiceSlot)),
    __metadata("design:paramtypes", [getAllService_1.GetAllActiveService,
        updateBookingStatus_1.UpdateServiceStatus,
        DeleteSlotUseCase_1.DeleteSlotUseCase,
        CreateSlotUseCase_1.CreateSlotUseCase,
        getSlot_1.GetServiceSlot])
], ServiceController);
