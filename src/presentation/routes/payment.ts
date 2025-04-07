import { Router, Request, Response } from "express";
import { createOrderHandler } from "../controllers/payment/CreateOrderHandiler";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import  Crypto  from "crypto";
import axios from "axios";
import Razorpay from "razorpay";
import { verifyPaymentHandler } from "../controllers/payment/verifyPaymentHandler";
const paymentRouter = Router();
// verifyPaymentHandler

paymentRouter.post("/create-order", createOrderHandler);
paymentRouter.post("/verify",verifyPaymentHandler)

export default paymentRouter;
