import { Request, Response } from "express";
import { container } from "tsyringe";
import mongoose from "mongoose";
import { GetBookSingleService } from "../../../application/use-case/bookService/GetBookedServiceById";

export const getServiceDetailsServiceProvider = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("----------------------------------------------------------------------------------------------------------------------------");

    const { id } = req.params;
console.log(id);
console.log("----------------------------------------------------------------------------------------------------------------------------");


    if (!mongoose.Types.ObjectId.isValid(id)) {
       res.status(400).json({ error: "Invalid service booking ID" });
       return
    }

  

    const bookService = container.resolve(GetBookSingleService);
    const service = await bookService.ServiceProviderBookedService(new mongoose.Types.ObjectId(id));
      
    res.status(200).json({ service });
  } catch (error) {
    console.error("Error in getSingleBookedServiceHandler:", error);
    res.status(500).json({ error: "Internal Server Error", details: (error as Error).message });
  }
};
