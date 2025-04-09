import { Request, Response } from "express";
import { container } from "tsyringe";

import { getServiceProvidersUseCase } from "../../../../application/use-case/admin/serviceProviderManagement/getServiceProvidersUsercase";
export const getServiceProviders = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 0;
    const skip = page * limit;

    const getserviceProvidersUseCase = container.resolve(
      getServiceProvidersUseCase
    );

    const {data,count} = await getserviceProvidersUseCase.execute(skip,limit);

    
    res.status(200).json({data,count});
  } catch (error) {}
};
