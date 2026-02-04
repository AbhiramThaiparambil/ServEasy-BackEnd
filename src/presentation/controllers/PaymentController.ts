import { Request, Response } from "express";
import { HttpStatus } from "../../constants/HttpStatus";
import { USE_CASE_TOKENS } from "../../constants/tokens";
import { IVerifySubscriptionPaymentUseCase } from "../../application/use-case/common/payment/IVerifySubscriptionPaymentUseCase";
import { inject, injectable } from "tsyringe";
import { ICreatePaymentSubscriptionOrderUseCase } from "../../application/use-case/common/payment/ICreatePaymentSubscriptionOrderUseCase";
import { ICreateServiceOrderUseCase } from "../../application/use-case/common/payment/CreateServiceOrderUseCase/ICreateServiceOrderUseCase";
import { IGetPaymentInfoUseCaseServiceProvider } from "../../application/use-case/serviceProvider/IGetPaymentInfoServiceProvider";
import { IVerifyPaymentUseCase } from "../../application/use-case/common/payment/verifyPayment/IVerfypayment.usecase";
@injectable()
export class PaymentController {
  constructor(
    @inject(USE_CASE_TOKENS.VerifySubscriptionPaymentUseCase)
    private verifySubscriptionPaymentUseCase: IVerifySubscriptionPaymentUseCase,
    @inject(USE_CASE_TOKENS.CreatePaymentSubscriptionOrderUseCase)
    private createPaymentSubscriptionOrderUseCase: ICreatePaymentSubscriptionOrderUseCase,

    @inject(USE_CASE_TOKENS.CreateServiceOrderUseCase)
    private createServiceOrderUseCase: ICreateServiceOrderUseCase,
    @inject(USE_CASE_TOKENS.GetPaymentInfoUseCaseServiceProvider)
    private getPaymentInfoUseCaseServiceProvider: IGetPaymentInfoUseCaseServiceProvider,

    @inject(USE_CASE_TOKENS.VerifyPaymentUseCase)
    private verifyPaymentUseCase: IVerifyPaymentUseCase,
  ) {}

  async subscriptionVerifyPayment(req: Request, res: Response) {
    const serviceProviderId = res.locals.serviceProvider_id;
    const {
      planId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;
    console.log("Creating order for plan:", req.body);

    if (
      !planId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Missing required payment verification fields",
      });
    }

    try {
      const result = await this.verifySubscriptionPaymentUseCase.execute({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userId: serviceProviderId,
        planId,
      });

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error("Verify payment failed:", error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal server error during payment verification",
      });
    }
  }

  async createSubscriptionPaymentOrder(req: Request, res: Response) {
    const { planId } = req.body;
    console.log(req.body);
    console.log(planId);
    const serviceProviderId = res.locals.serviceProvider_id;

    if (!planId) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Missing or invalid plan ID",
      });
    }

    try {
      const result = await this.createPaymentSubscriptionOrderUseCase.execute(
        serviceProviderId,
        planId,
      );

      if (!result || result.success === false) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error("Order creation failed:", error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to create Razorpay order",
      });
    }
  }

  async createServicePaymentOrder(req: Request, res: Response): Promise<void> {
    const { serviceId } = req.body;
    console.log("called create service payment order");
    if (!serviceId) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Missing or invalid service ID",
      });
      return;
    }

    try {
      const result = await this.createServiceOrderUseCase.execute(serviceId);
      console.log(result);
      if (!result || result.success === false) {
        res.status(HttpStatus.BAD_REQUEST).json(result);
        return;
      }

      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error("Order creation failed:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to create Razorpay order",
      });
    }
  }

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

  verifyPayment = async (req: Request, res: Response) => {
    const {
      serviceId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;
    console.log(req.body);
    // Input validation
    if (
      !serviceId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Missing required payment verification fields",
      });
    }

    try {
      const result = await this.verifyPaymentUseCase.execute(
        serviceId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      );

      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.error("Verify payment failed:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal server error during payment verification",
      });
    }
  };

  getPaymentDetailsServiceProvider = async (req: Request, res: Response) => {
    try {
      const serviceProviderId = res.locals.serviceProvider_id;
      const data =
        await this.getPaymentInfoUseCaseServiceProvider.execute(
          serviceProviderId,
        );

      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal server error during payment verification",
      });
    }
  };
}
