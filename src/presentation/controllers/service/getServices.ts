import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetService } from "../../../application/service-management/getServices";

export const getServices = async (req: Request, res: Response) => {
  try {
    const getService = container.resolve(GetService);
    
    const serviceProviderId = res.locals.serviceProvider_id;
    
    if (!serviceProviderId) {
       res.status(400).json({ message: "Service Provider ID is required." });
       return
      }
    
    const result = await getService.execute(serviceProviderId);
    
     res.status(200).json({ allServices: result });
     return
  } catch (e) {
    console.error(e); // Consider using a logging library
     res.status(500).json({ message: "An error occurred while fetching services." });
     return
   }
};
