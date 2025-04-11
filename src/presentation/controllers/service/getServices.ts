import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetService } from "../../../application/service-management/getServices";
import { HttpStatus } from "../../../constants/HttpStatus";

export const getServices = async (req: Request, res: Response) => {
  try {
    const getService = container.resolve(GetService);
    
    const serviceProviderId = res.locals.serviceProvider_id;
    
    if (!serviceProviderId) {
       res.status(HttpStatus.BAD_REQUEST).json({ message: "Service Provider ID is required." });
       return
      }
    
    const result = await getService.execute(serviceProviderId);
    
     res.status(HttpStatus.OK).json({ allServices: result });
     return
  } catch (e) {
    console.error(e);
     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred while fetching services." });
     return
   }
};
