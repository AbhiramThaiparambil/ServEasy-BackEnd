import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAllActiveService } from "../../../application/use-case/User/getAllService";
import { HttpStatus } from "../../../constants/HttpStatus";

export const getActiveServices = async (req: Request, res: Response) => {
  try {
    const getService = container.resolve(GetAllActiveService);
console.log(req.query);

    const userLongitude = Number( req.query.userLongitude);
    const userLatitude = Number( req.query.userLatitude);

    let result;

    if (!isNaN(userLongitude) && !isNaN(userLatitude)) {
      
      result = await getService.getNearByservices(userLongitude, userLatitude);
    } else {
      result = await getService.execute();
    }

     res.status(HttpStatus.OK).json({ allServices: result });
     return
  } catch (e) {
    console.error(e);
     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred while fetching services." });
     return
    }
};
