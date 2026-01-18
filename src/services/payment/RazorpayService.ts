import Razorpay from "razorpay";
import { injectable } from "tsyringe";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

@injectable()
export class RazorpayService {
  private razorpay: Razorpay;

  constructor() {
    console.log(process.env.RAZORPAY_KEY_ID);
    console.log(process.env.RAZORPAY_KEY_SECRET);

    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
  }

  async createOrder(payment: number, userId: string) {
    const order = await this.razorpay.orders.create({
      amount: payment * 100,
      currency: "INR",
      payment_capture: true,
      receipt: userId,
    });

    return order;
  }

  async verifyPaymentSignature(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
  ) {
    const isValid = validatePaymentVerification(
      {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
      },
      razorpay_signature,
      process.env.RAZORPAY_KEY_SECRET!
    );

    if (!isValid) {
      throw new Error("Invalid Razorpay signature");
    }

    const paymentDetails = await this.razorpay.payments.fetch(
      razorpay_payment_id
    );

    return {
      id: paymentDetails.id,
      status: paymentDetails.status,
      method: paymentDetails.method,
      amount: paymentDetails.amount,
      currency: paymentDetails.currency,
      captured: paymentDetails.captured,
      email: paymentDetails.email,
      contact: paymentDetails.contact,
      created_at: paymentDetails.created_at,
      notes: paymentDetails.notes,
      fee: paymentDetails.fee,
      tax: paymentDetails.tax,
    };
  }
}
