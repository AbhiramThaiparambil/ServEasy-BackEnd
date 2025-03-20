import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetService } from "../../../application/service-management/getServices";
import { GetAllActiveService } from "../../../application/use-case/User/getAllService";


export const getActiveServices = async (req: Request, res: Response) => {
  try {
    const getService = container.resolve(GetAllActiveService);
    
    
   
    
    const result = await getService.execute();
    
     res.status(200).json({ allServices: result });
     return
  } catch (e) {
    console.error(e); // Consider using a logging library
     res.status(500).json({ message: "An error occurred while fetching services." });
     return
   }
};
