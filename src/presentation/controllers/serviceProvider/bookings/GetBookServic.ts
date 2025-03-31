
import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetBookService } from "../../../../application/use-case/bookService/fetchBookedService";

export const GetServiceProviderBookServiceHandler  = async (req: Request, res: Response): Promise<void> => {
  try {
    
    console.log('009090909090909090907ugfhujkgdfhjkfghjkgfdhjikgdf');
    
    const serviceProviderId = res.locals.serviceProvider_id;
     console.log(serviceProviderId);
   
     console.log(serviceProviderId);

    if (!serviceProviderId) {
       res.status(400).json({ error: "Service provider ID is required." });
       return
    }

    const getBookService = container.resolve(GetBookService);
    const service = await getBookService.ServiceProviderBookedServices(serviceProviderId);

    res.status(200).json({ service });
  } catch (error) {
    console.error("Error in GetBookServiceHandler:", (error as Error).message, (error as Error).stack);
    res.status(500).json({ error: "Internal Server Error", details: (error as Error).message });
  }
};
