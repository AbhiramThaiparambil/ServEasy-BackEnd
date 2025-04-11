import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetServics } from "../../../application/use-case/User/GetServics";
import { HttpStatus } from "../../../constants/HttpStatus";

export const getSingleServiceHandler = async (req: Request, res: Response) => {
  try {
    console.log("_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_");
    
    const { id } = req.params; 
      console.log(id);
      
    if (!id) {
       res.status(HttpStatus.BAD_REQUEST).json({ message: "Service ID is required" });
       return
    }

    const getService = container.resolve(GetServics);
    const service = await getService.execute(id);
 
    console.log(service);
    
    if (!service) {
       res.status(HttpStatus.NOT_FOUND).json({ message: "Service not found" });
       return
    }

    res.status(HttpStatus.OK).json({ service });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};
