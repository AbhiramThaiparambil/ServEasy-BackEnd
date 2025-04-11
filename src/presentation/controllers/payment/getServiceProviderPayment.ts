import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetPaymentInfoServiceProviderUseCase } from "../../../application/use-case/payment/getServiceProviderUseCase";
import { HttpStatus } from "../../../constants/HttpStatus";

export const getPaymentDetailsHandler = async (req: Request, res: Response) => {

try {
    
    const getPaymentInfo= await container.resolve(GetPaymentInfoServiceProviderUseCase)
    const serviceProviderId = res.locals.serviceProvider_id;
    const data = await getPaymentInfo.serviceProviderInfo(serviceProviderId)
  res.status(HttpStatus.OK).json(data)
} catch (error) {
    
}

}