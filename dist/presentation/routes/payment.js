"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateOrderHandiler_1 = require("../controllers/payment/CreateOrderHandiler");
const verifyPaymentHandler_1 = require("../controllers/payment/verifyPaymentHandler");
const getServiceProviderPayment_1 = require("../controllers/payment/getServiceProviderPayment");
const serviceProviderMiddleware_1 = require("../../Middlewares/serviceProviderMiddleware");
const authMiddleware_1 = require("../../Middlewares/authMiddleware");
const getPaymentDetailsAdminHandler_1 = require("../controllers/payment/getPaymentDetailsAdminHandler");
const paymentRouter = (0, express_1.Router)();
// verifyPaymentHandler
paymentRouter.post("/create-order", CreateOrderHandiler_1.createOrderHandler);
paymentRouter.post("/verify", verifyPaymentHandler_1.verifyPaymentHandler);
paymentRouter.get("/service-provider", (0, authMiddleware_1.authMiddleware)("User"), serviceProviderMiddleware_1.serviceProviderAuth, getServiceProviderPayment_1.getPaymentDetailsHandler);
paymentRouter.get("/admin", getPaymentDetailsAdminHandler_1.getPaymentDetailsAdminHandler);
exports.default = paymentRouter;
