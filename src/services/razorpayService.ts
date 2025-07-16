import Razorpay from "razorpay";
import { injectable } from "tsyringe";
import { IPayment } from "../domain/entities/IPayment"; 
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
// import { IBankDetails } from "../domain/entities/IServiceProvider";

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



  // async createLinkedAccountTest(bankInfo:IBankDetails): Promise<string> {
  //   const serviceProvider = {
  //     name: bankInfo.accountHolderName,
  //     ifsc: bankInfo.ifscCode,
  //     accountNumber: bankInfo.accountNumber,
  //   };

  //   const response = await axios.post(
  //     "https://api.razorpay.com/v1/accounts",
  //     {
  //       type: "individual",
  //       legal_business_name: serviceProvider.name,
  //       business_type: "individual",
  //       contact_name: serviceProvider.name,
  //       bank_account: {
  //         name: serviceProvider.name,
  //         ifsc: serviceProvider.ifsc,
  //         account_number: serviceProvider.accountNumber,
  //       },
  //     },
  //     {
  //       auth: {
  //         username: process.env.RAZORPAY_KEY_ID!,
  //         password: process.env.RAZORPAY_KEY_SECRET!,
  //       },
  //     }
  //   );

  //   console.log("✅ Linked Account Created:", response.data);
  //   return response.data.id; 
  // }




  async createOrder(payment: IPayment, linkedAccountId: string) {
    const providerShare = Math.round(payment.total-payment.convenienceFee)

    const order = await this.razorpay.orders.create({
      amount: payment.finalTotal * 100,
      currency: "INR",
      payment_capture: true,
      receipt: `receipt_${Date.now()}`,
      // transfers: [
      //   {
      //     account: linkedAccountId, 
      //     amount: providerShare,
      //     currency: "INR",
      //     notes: {
      //       description: "90% to service provider",
      //     },
      //     on_hold: false,
      //   },
      // ],
    });

    return order;
  }

  async verifyPaymentSignature(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string) {
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
  
    const paymentDetails = await this.razorpay.payments.fetch(razorpay_payment_id);
  
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


