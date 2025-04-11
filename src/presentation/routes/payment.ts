import { Router, Request, Response } from "express";
import { createOrderHandler } from "../controllers/payment/CreateOrderHandiler";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

import { verifyPaymentHandler } from "../controllers/payment/verifyPaymentHandler";
import { getPaymentDetailsHandler } from "../controllers/payment/getServiceProviderPayment";
import { serviceProviderAuth } from "../../Middlewares/serviceProviderMiddleware";
import { authMiddleware } from "../../Middlewares/authMiddleware";
import { getPaymentDetailsAdminHandler } from "../controllers/payment/getPaymentDetailsAdminHandler";
const paymentRouter = Router();
// verifyPaymentHandler

paymentRouter.post("/create-order", createOrderHandler);
paymentRouter.post("/verify",verifyPaymentHandler)
paymentRouter.get("/service-provider",authMiddleware("User"), serviceProviderAuth,getPaymentDetailsHandler)
paymentRouter.get("/admin",getPaymentDetailsAdminHandler)

export default paymentRouter;
