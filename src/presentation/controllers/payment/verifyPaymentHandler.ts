

import { Request, Response } from "express";
import { container } from "tsyringe";
import { VerifyPaymentUseCase } from "../../../application/use-case/payment/VerifyPayment";

export const verifyPaymentHandler = async (req: Request, res: Response) => {
  const {
    serviceid,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  // Input validation
  if (!serviceid || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
     res.status(400).json({
      success: false,
      message: "Missing required payment verification fields",
    });
  }

  try {
    const verifyPaymentUseCase = container.resolve(VerifyPaymentUseCase);
    const result = await verifyPaymentUseCase.execute(
      serviceid,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

   

     res.status(200).json(result);
  } catch (error) {
    console.error("Verify payment failed:", error);
     res.status(500).json({
      success: false,
      message: "Internal server error during payment verification",
    });
  }
};
