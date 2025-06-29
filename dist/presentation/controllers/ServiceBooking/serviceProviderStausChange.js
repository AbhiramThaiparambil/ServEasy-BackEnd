"use strict";
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
exports.serviceProviderStatusChange = void 0;
const tsyringe_1 = require("tsyringe");
const updateBookingStatus_1 = require("../../../application/use-case/bookService/updateBookingStatus");
// import { IPayment } from "../../../domain/entities/Ipayment";
const HttpStatus_1 = require("../../../constants/HttpStatus");
const serviceProviderStatusChange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, action } = req.params;
        const changeStatusContainer = tsyringe_1.container.resolve(updateBookingStatus_1.UpdateServiceStatus);
        if (!id) {
            res
                .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                .json({ error: "Bad Request: Missing required fields (id or action)" });
            return;
        }
        let updatedService;
        if (action === "accept") {
            const { estimatedServiceTime, serviceStatus, reschedule, reschedReason } = req.body;
            if (!estimatedServiceTime || !serviceStatus) {
                res
                    .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                    .json({
                    error: "Bad Request: Missing estimatedServiceTime or serviceStatus",
                });
                return;
            }
            const serviceProviderId = res.locals.serviceProvider_id;
            console.log(res.locals);
            updatedService = yield changeStatusContainer.ConformBookingStatus(id, serviceStatus, estimatedServiceTime, serviceProviderId, reschedule, reschedReason);
        }
        else if (action === "status") {
            const { serviceStatus } = req.body;
            if (!serviceStatus) {
                res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ error: "Bad Request: Missing serviceStatus" });
                return;
            }
            updatedService = yield changeStatusContainer.updateBookingStatus(id, serviceStatus);
        }
        else if (action === "cancel") {
            const { cancellationReason, serviceStatus } = req.body;
            if (!cancellationReason || !serviceStatus) {
                res
                    .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                    .json({
                    error: "Bad Request: Missing cancellationReason or serviceStatus",
                });
                return;
            }
            updatedService = yield changeStatusContainer.bookingCancel(id, serviceStatus, cancellationReason);
        }
        else if (action == "payment-request") {
            const { payment, paymentStatus } = req.body;
            console.log(payment);
            if (!payment || !paymentStatus) {
                res
                    .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                    .json({ error: "Bad Request: Missing payment or paymentStatus" });
                return;
            }
            updatedService = yield changeStatusContainer.requestPayment(id, payment, paymentStatus);
        }
        if (!updatedService) {
            res
                .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                .json({ error: "Service booking not found or update failed" });
            return;
        }
        if (updatedService === null || updatedService === void 0 ? void 0 : updatedService.error) {
            res.status(HttpStatus_1.HttpStatus.CONFLICT).json({ error: updatedService.error });
            return;
        }
        res.status(HttpStatus_1.HttpStatus.OK).json({
            message: "Booking status updated successfully",
            data: updatedService,
        });
    }
    catch (error) {
        console.error("Error in serviceProviderStatusChange:", error);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
});
exports.serviceProviderStatusChange = serviceProviderStatusChange;
