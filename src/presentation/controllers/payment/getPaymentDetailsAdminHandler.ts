import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetPaymentInfoServiceProviderUseCase } from "../../../application/use-case/payment/getServiceProviderUseCase";
import { HttpStatus } from "../../../constants/HttpStatus";

export const getPaymentDetailsAdminHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 0;
    const skip = page * limit;
    const search= req.query.search || '';
    const status = req.query.status || '';
    const statusType=req.query.statusType || 'serviceStatus';
    const getPaymentInfo = await container.resolve(
      GetPaymentInfoServiceProviderUseCase
    );
    const data = await getPaymentInfo.adminPaymentInfo(skip,limit,search as string,status as string,statusType as 'serviceStatus' | 'paymentStatus');
    res.status(HttpStatus.OK).json(data);
  } catch (error) {}
};
