"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceProviderMiddleware_1 = require("../Middlewares/serviceProviderMiddleware");
const authMiddleware_1 = require("../Middlewares/authMiddleware");
const tsyringe_1 = require("tsyringe");
const PaymentController_1 = require("../controllers/PaymentController");
const paymentRouter = (0, express_1.Router)();
const paymentController = tsyringe_1.container.resolve(PaymentController_1.PaymentController);
paymentRouter.post("/create-order", (req, res) => {
    paymentController.createServicePaymentOrder(req, res);
});
paymentRouter.post("/verify", (req, res) => {
    paymentController.verifyPayment(req, res);
});
paymentRouter.get("/service-provider", (0, authMiddleware_1.authMiddleware)("User"), serviceProviderMiddleware_1.serviceProviderAuth, (req, res) => {
    paymentController.getPaymentDetailsServiceProvider(req, res);
});
// paymentRouter.get("/admin", getPaymentDetailsAdminHandler);
paymentRouter.post("/subscription/verify", (0, authMiddleware_1.authMiddleware)("User"), serviceProviderMiddleware_1.serviceProviderAuth, (req, res) => {
    paymentController.subscriptionVerifyPayment(req, res);
});
paymentRouter.post("/subscription/createOrder", (0, authMiddleware_1.authMiddleware)("User"), serviceProviderMiddleware_1.serviceProviderAuth, (req, res) => {
    paymentController.createSubscriptionPaymentOrder(req, res);
});
exports.default = paymentRouter;
