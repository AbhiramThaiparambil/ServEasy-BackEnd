import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { GetAllActiveService } from "../../application/use-case/User/getAllService";
import { HttpStatus } from "../../constants/HttpStatus";
// import { UpdateServiceStatus } from "../../application/use-case/booking/updateBookingStatus/UpdateBookingStatusUseCase";
import { DeleteSlotUseCase } from "../../application/use-case/admin/slot/DeleteSlotUseCase";
import { CreateSlotUseCase } from "../../application/use-case/admin/slot/CreateSlotUseCase";
import { GetServiceSlot } from "../../application/use-case/admin/slot/getSlot";
import { USE_CASE_TOKENS } from "../../utils/constants/tokens";
import { IApplyCouponToBookingUseCase } from "../../application/use-case/coupon/applyCoupon/IApplyCouponToBookingUseCase";
import { IRemoveCouponToBookingUseCase } from "../../application/use-case/coupon/applyCoupon/IRemoveCoupon";
import { IUpdateBookingStatusUseCase } from "../../application/use-case/booking/updateBookingStatus/IUpdateBookingStatusUseCase";
import { ICancelBookingUseCase } from "../../application/use-case/booking/cancelBooking/ICancelBookingUseCase";

@injectable()
export class ServiceController {
  constructor(
    @inject(GetAllActiveService)
    private getAllActiveService: GetAllActiveService,
    @inject("ICancelBookingUseCase")
    private cancelBookingUseCase: ICancelBookingUseCase,
    @inject(DeleteSlotUseCase) private deleteSlotUseCase: DeleteSlotUseCase,
    @inject(CreateSlotUseCase) private createSlot: CreateSlotUseCase,
    @inject(GetServiceSlot) private getServiceSlot: GetServiceSlot,
    @inject(USE_CASE_TOKENS.ApplyCouponToBookingUseCase)
    private applyCouponUseCase: IApplyCouponToBookingUseCase,
    @inject(USE_CASE_TOKENS.RemoveCouponToBookingUseCase)
    private removeCouponUseCase: IRemoveCouponToBookingUseCase
  ) {}

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

      const result = await this.cancelBookingUseCase.execute(
        id,
        "cancelled",
        cancellationReason
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

  async getOnlineServiceWithSlotHandler(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const data = await this.getAllActiveService.getOnlineServicesWithSlot();
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      console.error("Error fetching online services with slots:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }

  async getOnlineServiceSlotsHandler(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const id = req.params.id;

      const data = await this.getServiceSlot.execute(id);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      console.error("Error fetching online services with slots:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }

  async deleteSlotHandler(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "Slot ID is required",
        });
        return;
      }

      await this.deleteSlotUseCase!.execute(id);

      res.status(HttpStatus.OK).json({
        message: "Slot deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting slot:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
      });
    }
  }

  async createSlotHandler(req: Request, res: Response): Promise<void> {
    try {
      const { serviceId, startTime, endTime } = req.body;

      if (!serviceId || !startTime || !endTime) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "Missing required fields: serviceId, startTime, endTime",
        });
        return;
      }

      const slot = await this.createSlot!.execute({
        serviceId,
        startTime,
        endTime,
        booked: false,
      });

      res.status(HttpStatus.CREATED).json({
        message: "Slot created successfully",
        slot,
      });
    } catch (error) {
      console.error("Error creating slot:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
      });
    }
  }

  async applyCoupon(req: Request, res: Response) {
    try {
      const { bookingId } = req.params;
      const { couponCode } = req.body;

      const updatedBooking = await this.applyCouponUseCase.execute({
        bookingId,
        couponCode,
      });

      res.status(HttpStatus.OK).json({
        message: "Coupon applied successfully",
        payment: updatedBooking,
      });
      return;
    } catch (error: any) {
      console.log(error);
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message || "Failed to apply coupon" });

      return;
    }
  }

  async removeCoupon(req: Request, res: Response) {
    try {
      const { bookingId } = req.params;
      if (!bookingId) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "Missing required fields: serviceId, startTime, endTime",
        });
        return;
      }
      const updatedBooking = await this.removeCouponUseCase.execute(bookingId);
      console.log(updatedBooking);
      res.status(200).json({
        message: "Coupon removed successfully",
        updatedBooking,
      });
      return;
    } catch (error: any) {
      console.log(error);
      res
        .status(400)
        .json({ message: error.message || "Failed to remove coupon" });
      return;
    }
  }
}
