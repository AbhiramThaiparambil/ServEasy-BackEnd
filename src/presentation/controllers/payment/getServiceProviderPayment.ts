import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetPaymentInfoServiceProviderUseCase } from "../../../application/use-case/payment/getServiceProviderUseCase";

export const getPaymentDetailsHandler = async (req: Request, res: Response) => {

try {
    console.log("--))--))--))");
    
    const getPaymentInfo= await container.resolve(GetPaymentInfoServiceProviderUseCase)
    const serviceProviderId = res.locals.serviceProvider_id;
    const data = await getPaymentInfo.serviceProviderInfo(serviceProviderId)
  res.status(200).json(data)
} catch (error) {
    
}

}