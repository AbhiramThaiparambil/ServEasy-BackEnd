import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { GetAllActiveService } from "../../application/use-case/User/getAllService"; 
import { HttpStatus } from "../../constants/HttpStatus";
import { UpdateServiceStatus } from "../../application/use-case/bookService/updateBookingStatus";

@injectable()
export class ServiceController {
  constructor(
    @inject(GetAllActiveService)
    private getAllActiveService: GetAllActiveService,
    @inject(UpdateServiceStatus) private updateServiceStatus:UpdateServiceStatus,
  ) {}

  // async getActiveServices(req: Request, res: Response): Promise<void> {
  //   try {
  //     const userLongitude = Number(req.query.userLongitude);
  //     const userLatitude = Number(req.query.userLatitude);

  //     let result;

  //     if (!isNaN(userLongitude) && !isNaN(userLatitude)) {
  //       result = await this.getAllActiveService.getNearByservices(userLongitude, userLatitude);
  //     } else {
  //       result = await this.getAllActiveService.execute();
  //     }

  //     res.status(HttpStatus.OK).json({ allServices: result });
  //   } catch (e) {
  //     console.error("Error in getActiveServices:", e);
  //     res
  //       .status(HttpStatus.INTERNAL_SERVER_ERROR)
  //       .json({ message: "An error occurred while fetching services." });
  //   }
  // }


async cancelUserBooking(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { cancellationReason } = req.body;

    if (!id || !cancellationReason) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: "Booking ID and cancellation reason are required.",
      });
      return;
    }

    const result = await this.updateServiceStatus.bookingCancel(
      id,
      "cancelled",
      cancellationReason,
    );

    res.status(HttpStatus.OK).json({
      message: "Booking cancelled successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Error cancelling user booking:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong while cancelling the booking.",
    });
  }
}


}
