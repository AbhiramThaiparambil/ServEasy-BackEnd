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
exports.verifyPaymentHandler = void 0;
const tsyringe_1 = require("tsyringe");
const VerifyPayment_1 = require("../../../application/use-case/payment/VerifyPayment");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const verifyPaymentHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceid, razorpay_order_id, razorpay_payment_id, razorpay_signature, } = req.body;
    // Input validation
    if (!serviceid || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
            success: false,
            message: "Missing required payment verification fields",
        });
    }
    try {
        const verifyPaymentUseCase = tsyringe_1.container.resolve(VerifyPayment_1.VerifyPaymentUseCase);
        const result = yield verifyPaymentUseCase.execute(serviceid, razorpay_order_id, razorpay_payment_id, razorpay_signature);
        res.status(HttpStatus_1.HttpStatus.OK).json(result);
    }
    catch (error) {
        console.error("Verify payment failed:", error);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error during payment verification",
        });
    }
});
exports.verifyPaymentHandler = verifyPaymentHandler;
