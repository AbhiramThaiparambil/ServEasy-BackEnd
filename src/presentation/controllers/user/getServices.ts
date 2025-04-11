import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAllActiveService } from "../../../application/use-case/User/getAllService";

export const getActiveServices = async (req: Request, res: Response) => {
  try {
    const getService = container.resolve(GetAllActiveService);
console.log(req.query);

    const userLongitude = Number( req.query.userLongitude);
    const userLatitude = Number( req.query.userLatitude);

    let result;

    if (!isNaN(userLongitude) && !isNaN(userLatitude)) {
      console.log('hey jey heyhbkjh');
      
      result = await getService.getNearByservices(userLongitude, userLatitude);
    } else {
      result = await getService.execute();
    }

     res.status(200).json({ allServices: result });
     return
  } catch (e) {
    console.error(e);
     res.status(500).json({ message: "An error occurred while fetching services." });
     return
    }
};
