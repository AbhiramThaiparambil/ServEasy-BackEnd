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
exports.PaymentController = void 0;
const HttpStatus_1 = require("../../constants/HttpStatus");
const errorUtils_1 = require("../../utils/errorUtils");
const tokens_1 = require("../../constants/tokens");
const tsyringe_1 = require("tsyringe");
let PaymentController = class PaymentController {
    constructor(verifySubscriptionPaymentUseCase, createPaymentSubscriptionOrderUseCase, createServiceOrderUseCase, getPaymentInfoUseCase, verifyPaymentUseCase) {
        this.verifySubscriptionPaymentUseCase = verifySubscriptionPaymentUseCase;
        this.createPaymentSubscriptionOrderUseCase = createPaymentSubscriptionOrderUseCase;
        this.createServiceOrderUseCase = createServiceOrderUseCase;
        this.getPaymentInfoUseCase = getPaymentInfoUseCase;
        this.verifyPaymentUseCase = verifyPaymentUseCase;
        //     getPaymentDetailsAdminHandler = async (
        //   req: Request,
        //   res: Response
        // ) => {
        //   try {
        //     const limit = parseInt(req.query.limit as string) || 10;
        //     const page = parseInt(req.query.page as string) || 0;
        //     const skip = page * limit;
        //     const search= req.query.search || '';
        //     const status = req.query.status || '';
        //     const statusType=req.query.statusType || 'serviceStatus';
        //     const getPaymentInfo = await this.getPaymentInfoUseCaseServiceProvider.execute(
        //       skip,limit,search as string,status as string,statusType as 'serviceStatus' | 'paymentStatus'
        //     );
        //     res.status(HttpStatus.OK).json(data);
        //   } catch (error) {}
        // };
        this.verifyPayment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { serviceId, razorpay_order_id, razorpay_payment_id, razorpay_signature, } = req.body;
            console.log(req.body);
            if (!serviceId ||
                !razorpay_order_id ||
                !razorpay_payment_id ||
                !razorpay_signature) {
                res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "Missing required payment verification fields",
                });
            }
            try {
                const dto = {
                    serviceBookingId: serviceId,
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature,
                };
                const result = yield this.verifyPaymentUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json(result);
            }
            catch (error) {
                console.error("Verify payment failed:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Internal server error during payment verification",
                });
            }
        });
        this.getPaymentDetailsServiceProvider = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const serviceProviderId = res.locals.serviceProvider_id;
                const dto = {
                    serviceProviderId
                };
                const data = yield this.getPaymentInfoUseCase.execute(dto);
                res.status(HttpStatus_1.HttpStatus.OK).json(data);
            }
            catch (error) {
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Internal server error during payment verification",
                });
            }
        });
    }
    subscriptionVerifyPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceProviderId = res.locals.serviceProvider_id;
            const { planId, razorpay_order_id, razorpay_payment_id, razorpay_signature, } = req.body;
            console.log("Creating order for plan:", req.body);
            if (!planId ||
                !razorpay_order_id ||
                !razorpay_payment_id ||
                !razorpay_signature) {
                return res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "Missing required payment verification fields",
                });
            }
            try {
                const dto = {
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature,
                    userId: serviceProviderId,
                    planId,
                };
                const result = yield this.verifySubscriptionPaymentUseCase.execute(dto);
                return res.status(HttpStatus_1.HttpStatus.OK).json(result);
            }
            catch (error) {
                console.error("Verify payment failed:", (0, errorUtils_1.getErrorMessage)(error));
                return res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Internal server error during payment verification",
                });
            }
        });
    }
    createSubscriptionPaymentOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { planId } = req.body;
            console.log(req.body);
            console.log(planId);
            const serviceProviderId = res.locals.serviceProvider_id;
            if (!planId) {
                return res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "Missing or invalid plan ID",
                });
            }
            try {
                const dto = {
                    userId: serviceProviderId,
                    planId,
                };
                const result = yield this.createPaymentSubscriptionOrderUseCase.execute(dto);
                if (!result || result.success === false) {
                    return res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json(result);
                }
                return res.status(HttpStatus_1.HttpStatus.OK).json(result);
            }
            catch (error) {
                console.error("Order creation failed:", (0, errorUtils_1.getErrorMessage)(error));
                return res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Failed to create Razorpay order",
                });
            }
        });
    }
    createServicePaymentOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { serviceId } = req.body;
            console.log("called create service payment order");
            if (!serviceId) {
                res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "Missing or invalid service ID",
                });
                return;
            }
            try {
                const dto = { serviceBookingId: serviceId };
                const result = yield this.createServiceOrderUseCase.execute(dto);
                console.log(result);
                if (!result || result.success === false) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json(result);
                    return;
                }
                res.status(HttpStatus_1.HttpStatus.OK).json(result);
            }
            catch (error) {
                console.error("Order creation failed:", (0, errorUtils_1.getErrorMessage)(error));
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Failed to create Razorpay order",
                });
            }
        });
    }
};
exports.PaymentController = PaymentController;
exports.PaymentController = PaymentController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.VerifySubscriptionPaymentUseCase)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.CreatePaymentSubscriptionOrderUseCase)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.CreateServiceOrderUseCase)),
    __param(3, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.ServiceProviderGetPaymentInfo)),
    __param(4, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.VerifyPaymentUseCase)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], PaymentController);
