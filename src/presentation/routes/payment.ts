import { Router, Request, Response } from "express";
import { serviceProviderAuth } from "../Middlewares/serviceProviderMiddleware";
import { authMiddleware } from "../Middlewares/authMiddleware";
import { container } from "tsyringe";
import { PaymentController } from "../controllers/PaymentController";
const paymentRouter = Router();

const paymentController = container.resolve(PaymentController);

paymentRouter.post("/create-order", (req, res) => {
  paymentController.createServicePaymentOrder(req, res);
});

paymentRouter.post("/verify", (req, res) => {
  paymentController.verifyPayment(req, res);
});
paymentRouter.get(
  "/service-provider",
  authMiddleware("User"),
  serviceProviderAuth,
  (req, res) => {
    paymentController.getPaymentDetailsServiceProvider(req, res);
  },
);
// paymentRouter.get("/admin", getPaymentDetailsAdminHandler);

paymentRouter.post(
  "/subscription/verify",
  authMiddleware("User"),
  serviceProviderAuth,
  (req, res) => {
    paymentController.subscriptionVerifyPayment(req, res);
  },
);

paymentRouter.post(
  "/subscription/createOrder",
  authMiddleware("User"),
  serviceProviderAuth,
  (req, res) => {
    paymentController.createSubscriptionPaymentOrder(req, res);
  },
);

export default paymentRouter;
