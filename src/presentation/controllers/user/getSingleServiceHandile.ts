import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetServics } from "../../../application/use-case/User/GetServics";
import { HttpStatus } from "../../../constants/HttpStatus";

export const getSingleServiceHandler = async (req: Request, res: Response) => {
  try {
    console.log("---------------------------------***888)))))))))");
    
    const { id } = req.params; 
      console.log(id);
      
    if (!id) {
       res.status(HttpStatus.BAD_REQUEST).json({ message: "Service ID is required" });
       return
    }

    const getService = container.resolve(GetServics);
    const data = await getService.execute(id);
 
    
    if (!data.services) {
       res.status(HttpStatus.NOT_FOUND).json({ message: "Service not found" });
       return
    }

    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};
