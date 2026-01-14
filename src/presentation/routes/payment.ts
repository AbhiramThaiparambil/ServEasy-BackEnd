import { Router, Request, Response } from "express";
import { createOrderHandler } from "../controllers/payment/CreateOrderHandiler";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

import { verifyPaymentHandler } from "../controllers/payment/verifyPaymentHandler";
import { getPaymentDetailsHandler } from "../controllers/payment/getServiceProviderPayment";
import { serviceProviderAuth } from "../Middlewares/serviceProviderMiddleware";
import { authMiddleware } from "../Middlewares/authMiddleware";
import { getPaymentDetailsAdminHandler } from "../controllers/payment/getPaymentDetailsAdminHandler";
import { container } from "tsyringe";
import { PaymentController } from "../controllers/PaymentController";
const paymentRouter = Router();
// verifyPaymentHandler
const paymentController = container.resolve(PaymentController);
paymentRouter.post("/create-order", createOrderHandler);
paymentRouter.post("/verify", verifyPaymentHandler);
paymentRouter.get(
  "/service-provider",
  authMiddleware("User"),
  serviceProviderAuth,
  getPaymentDetailsHandler
);
paymentRouter.get("/admin", getPaymentDetailsAdminHandler);

paymentRouter.post(
  "/subscription/verify",
  authMiddleware("User"),
  serviceProviderAuth,
  (req, res) => {
    paymentController.subscriptionVerifyPayment(req, res);
  }
);

paymentRouter.post(
  "/subscription/createOrder",
  authMiddleware("User"),
  serviceProviderAuth,
  (req, res) => {
    paymentController.createOrderHandler(req, res);
  }
);

export default paymentRouter;
