import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetServics } from "../../../application/use-case/User/GetServics";

export const getSingleServiceHandler = async (req: Request, res: Response) => {
  try {
    console.log("_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_");
    
    const { id } = req.params; 
      console.log(id);
      
    if (!id) {
       res.status(400).json({ message: "Service ID is required" });
       return
    }

    const getService = container.resolve(GetServics);
    const service = await getService.execute(id);
 
    console.log(service);
    
    if (!service) {
       res.status(404).json({ message: "Service not found" });
       return
    }

    res.status(200).json({ service });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
