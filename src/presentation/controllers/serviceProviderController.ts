import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { GetPaymentInfoServiceProviderUseCase } from "../../application/use-case/payment/getServiceProviderUseCase";
import { GetPaymentInfoUseCaseServiceProvider } from "../../application/use-case/serviceProvider/GetPaymentInfoUseCaseServiceProvider";
import { EditServiceProviderProfileUseCase } from "../../application/use-case/serviceProvider/EditProfile";
import { HttpStatus } from "../../constants/HttpStatus";

@injectable()
export class ServiceProviderController{
    constructor(@inject(GetPaymentInfoUseCaseServiceProvider)private getPaymentInfo:GetPaymentInfoUseCaseServiceProvider,@inject(EditServiceProviderProfileUseCase)private editServiceProviderProfileUseCase:EditServiceProviderProfileUseCase){}

  async getPaymentInfoForChartServiceProvider(req: Request, res: Response): Promise<void> {

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

      res.status(HttpStatus.OK).json({ paymentData });
      return;
    } catch (error) {
      console.error("Failed to fetch payment info for chart:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
      return;
    }
  }

    async updateServiceProvider(req: Request, res: Response): Promise<void> {
  try {
           console.log(req.body);

       
    const updated = await this.editServiceProviderProfileUseCase.execute(req.body);

    if (updated) {
      res.status(HttpStatus.OK).json({ message: "Service provider updated successfully" });
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Failed to update service provider" });
    }
  } catch (error) {
    console.error("Error updating service provider:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
}


}