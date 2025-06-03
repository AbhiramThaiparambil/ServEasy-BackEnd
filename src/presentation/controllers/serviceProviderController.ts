import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { GetPaymentInfoServiceProviderUseCase } from "../../application/use-case/payment/getServiceProviderUseCase";
import { GetPaymentInfoUseCaseServiceProvider } from "../../application/use-case/serviceProvider/GetPaymentInfoUseCaseServiceProvider";

@injectable()
export class ServiceProviderController{
    constructor(@inject(GetPaymentInfoUseCaseServiceProvider)private getPaymentInfo:GetPaymentInfoUseCaseServiceProvider){}

  async getPaymentInfoForChartServiceProvider(req: Request, res: Response): Promise<void> {
        console.log("--------------------------------------------------");

    console.log("getPaymentInfo is:", this.getPaymentInfo);

    try {
      const startDate = req.query.startDate
        ? new Date(req.query.startDate as string)
        : undefined;
      const endDate = req.query.endDate
        ? new Date(req.query.endDate as string)
        : undefined;
    const serviceProviderId = res.locals.serviceProvider_id;
console.log("getPaymentInfo is:", this.getPaymentInfo);
      const paymentData = await this.getPaymentInfo.execute(serviceProviderId,
        startDate,
        endDate
      );

      res.status(200).json({ paymentData });
      return;
    } catch (error) {
      console.error("Failed to fetch payment info for chart:", error);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }

}