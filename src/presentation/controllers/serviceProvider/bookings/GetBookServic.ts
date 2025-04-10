
import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetBookService } from "../../../../application/use-case/bookService/fetchBookedService";

export const GetServiceProviderBookServiceHandler  = async (req: Request, res: Response): Promise<void> => {
  try {
    
        
    const serviceProviderId = res.locals.serviceProvider_id;
  const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 0;
      const skip = page * limit;
    

    if (!serviceProviderId) {
       res.status(400).json({ error: "Service provider ID is required." });
       return
    }

    const getBookService = container.resolve(GetBookService);
    const {service,count} = await getBookService.ServiceProviderBookedServices(serviceProviderId,skip,limit);

    res.status(200).json({ service,count});
  } catch (error) {
    console.error("Error in GetBookServiceHandler:", (error as Error).message, (error as Error).stack);
    res.status(500).json({ error: "Internal Server Error", details: (error as Error).message });
  }
};
