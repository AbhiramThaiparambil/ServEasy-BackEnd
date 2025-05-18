import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { GetAllActiveService } from "../../application/use-case/User/getAllService"; 
import { HttpStatus } from "../../constants/HttpStatus";

@injectable()
export class ServiceController {
  constructor(
    @inject(GetAllActiveService)
    private getAllActiveService: GetAllActiveService
  ) {}

  async getActiveServices(req: Request, res: Response): Promise<void> {
    try {
      const userLongitude = Number(req.query.userLongitude);
      const userLatitude = Number(req.query.userLatitude);

      let result;

      if (!isNaN(userLongitude) && !isNaN(userLatitude)) {
        result = await this.getAllActiveService.getNearByservices(userLongitude, userLatitude);
      } else {
        result = await this.getAllActiveService.execute();
      }

      res.status(HttpStatus.OK).json({ allServices: result });
    } catch (e) {
      console.error("Error in getActiveServices:", e);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "An error occurred while fetching services." });
    }
  }
}
