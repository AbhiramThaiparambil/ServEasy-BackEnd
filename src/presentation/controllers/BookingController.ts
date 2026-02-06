import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import mongoose from "mongoose";
import { ICreateBookingUseCase } from "../../application/use-case/user/booking/createBooking/ICreateBooking.usecase";
import { ICreateOnlineBookingUseCase } from "../../application/use-case/user/booking/createOnlineBooking/ICreateOnlineBooking.usecase";
import { HttpStatus } from "../../constants/HttpStatus";
import { IUpdateBookingStatusUseCase } from "../../application/use-case/serviceProvider/booking/updateBookingStatus/IUpdateBookingStatusUseCase";
import { IConfirmBookingUseCase } from "../../application/use-case/serviceProvider/booking/confirmBooking/IConfirmBooking.usecase";
import { ICancelBookingUseCase } from "../../application/use-case/user/booking/cancelBooking/ICancelBooking.usecase";
import { IRequestPaymentUseCase } from "../../application/use-case/serviceProvider/booking/requestPayment/IRequestPaymentUseCase";
import { USE_CASE_TOKENS } from "../../constants/tokens";
import { IGetBookedServicesUseCase } from "../../application/use-case/common/booking/fetchBookings/IGetBookedServices.usecase";
import { IGetBookedServiceByIdUseCase } from "../../application/use-case/common/booking/fetchByid/IGetBookedServiceById.usecase";
import { IRescheduleOnlineServiceSlotUseCase } from "../../application/use-case/serviceProvider/booking/rescheduleOnlineService/IRescheduleOnlineService.usecase";
import { IUploadBillsUseCase } from "../../application/use-case/serviceProvider/booking/billing/IUploadBills.usecase";
import { CreateOnlineBookingRequestDTO } from "../../application/dtos/user/booking/createOnlineBooking/CreateOnlineBookingDTO";
import { CancelBookingRequestDTO } from "../../application/dtos/user/booking/cancelBooking/CancelBookingDTO";
import {
  GetUserBookedServicesRequestDTO,
  GetServiceProviderBookedServicesRequestDTO,
  GetUserBookedServiceCountRequestDTO,
} from "../../application/dtos/common/booking/fetchBookings/GetBookedServicesDTO";
import { GetBookedServiceByIdRequestDTO } from "../../application/dtos/common/booking/fetchByid/GetBookedServiceByIdDTO";
import { UpdateBookingStatusRequestDTO } from "../../application/dtos/serviceProvider/booking/updateBookingStatus/UpdateBookingStatusRequestDTO";
import { ConfirmBookingRequestDTO } from "../../application/dtos/serviceProvider/booking/confirmBooking/ConfirmBookingRequestDTO";
import { UploadBillsRequestDTO } from "../../application/dtos/serviceProvider/booking/billing/UploadBillsRequestDTO";
import { RequestPaymentRequestDTO } from "../../application/dtos/serviceProvider/booking/requestPayment/RequestPaymentRequestDTO";
import { RescheduleOnlineServiceRequestDTO } from "../../application/dtos/serviceProvider/booking/rescheduleOnlineService/RescheduleOnlineServiceRequestDTO";
import { CreateBookingRequestDTO } from "../../application/dtos/user/booking/createBooking/CreateBookingDTO";

@injectable()
export class BookingController {
  constructor(
    @inject(USE_CASE_TOKENS.CreateBookingUseCase)
    private createBookingUseCase: ICreateBookingUseCase,

    @inject(USE_CASE_TOKENS.CreateOnlineBookingUseCase)
    private createOnlineBookingUseCase: ICreateOnlineBookingUseCase,

    @inject(USE_CASE_TOKENS.UpdateBookingStatusUseCase)
    private updateBookingStatusUseCase: IUpdateBookingStatusUseCase,

    @inject(USE_CASE_TOKENS.ConfirmBookingUseCase)
    private confirmBookingUseCase: IConfirmBookingUseCase,

    @inject(USE_CASE_TOKENS.CancelBookingUseCase)
    private cancelBookingUseCase: ICancelBookingUseCase,

    @inject(USE_CASE_TOKENS.RequestPaymentUseCase)
    private requestPaymentUseCase: IRequestPaymentUseCase,
    @inject(USE_CASE_TOKENS.GetBookedServicesUseCase)
    private getBookedServicesUseCase: IGetBookedServicesUseCase,

    @inject(USE_CASE_TOKENS.GetBookedServiceByIdUseCase)
    private getBookedServiceByIdUseCase: IGetBookedServiceByIdUseCase,
    @inject(USE_CASE_TOKENS.RescheduleOnlineServiceSlotUseCase)
    private rescheduleOnlineServiceSlotUseCase: IRescheduleOnlineServiceSlotUseCase,
    @inject(USE_CASE_TOKENS.UploadBillsUseCase)
    private uploadBillsUseCase: IUploadBillsUseCase,
  ) {}

  async createBooking(req: Request, res: Response) {
    try {
      const userId = res.locals.user?.userId;
      const { serviceId, address, preferredServiceTime, liveLocation } =
        req.body;
      console.log(serviceId, address, preferredServiceTime, liveLocation);

      const dto: CreateBookingRequestDTO = {
        userId,
        serviceId,
        address,
        preferredServiceTime,
        liveLocation,
      };

      const booking = await this.createBookingUseCase.execute(dto);

      res.status(201).json({
        success: true,
        message: "Service booked successfully",
        data: booking,
      });
    } catch (error) {
      console.log("error message ");

      console.log(error);
      res.status(409).json({
        success: false,
        message: (error as Error).message,
      });
    }
  }

  async createOnlineBooking(req: Request, res: Response) {
    try {
      const userId = res.locals.user?.userId;

      const { serviceId, slotId } = req.body;

      const dto: CreateOnlineBookingRequestDTO = {
        userId,
        serviceId,
        slotId
      };

      const booking = await this.createOnlineBookingUseCase.execute(dto);

      res.status(201).json({
        success: true,
        message: "Online service booked successfully",
        data: booking,
      });
    } catch (error) {
      res.status(409).json({
        success: false,
        message: (error as Error).message,
      });
    }
  }

  async updateBookingStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { serviceStatus } = req.body;

      if (!id || !serviceStatus) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: "Missing booking id or serviceStatus",
        });
        return;
      }
      
      const dto: UpdateBookingStatusRequestDTO = {
        bookingId: id,
        status: serviceStatus
      };

      const data = await this.updateBookingStatusUseCase.execute(dto);

      res.status(HttpStatus.OK).json({
        message: "Booking status updated successfully",
        data,
      });
    } catch (error) {
      res.status(HttpStatus.CONFLICT).json({
        error: (error as Error).message,
      });
    }
  }

  uploadBills = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { invoices } = req.body;

      if (!Array.isArray(invoices) || invoices.length === 0) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "No invoice images provided." });
        return;
      }
      
      const dto: UploadBillsRequestDTO = {
        bookingId: id,
        images: invoices
      };

      await this.uploadBillsUseCase.execute(dto);

      res
        .status(HttpStatus.CREATED)
        .json({ message: "Invoice images uploaded successfully." });
    } catch (error) {
      console.error("Error uploading invoice bills:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to upload invoice images." });
    }
  };

  async confirmBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { serviceStatus, estimatedServiceTime, reschedule, reschedReason } =
        req.body;

      const serviceProviderId = res.locals.serviceProvider_id;

      if (!id || !serviceStatus || !estimatedServiceTime) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: "Missing required fields",
        });
        return;
      }
      
      const dto: ConfirmBookingRequestDTO = {
        bookingId: id,
        status: serviceStatus,
        estimatedServiceTime,
        serviceProviderId,
        reschedule: Boolean(reschedule),
        rescheduleReason: reschedReason
      };

      const data = await this.confirmBookingUseCase.execute(dto);

      res.status(HttpStatus.OK).json({
        message: data.message || "Booking confirmed successfully",
        success: data.success,
      });
    } catch (error) {
      res.status(HttpStatus.CONFLICT).json({
        error: (error as Error).message,
      });
    }
  }

  async RescheduleOnlineService(req: Request, res: Response) {
    try {
      const { bookingId, date, startTime, endTime } = req.body;

      if (!bookingId || !date || !startTime || !endTime) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: "Missing required fields",
        });
        return;
      }
      
      const dto: RescheduleOnlineServiceRequestDTO = {
        bookingId,
        date,
        startTime,
        endTime
      };
      
      const data = await this.rescheduleOnlineServiceSlotUseCase.execute(dto);

      res.status(HttpStatus.OK).json({
        message: "Booking rescheduled successfully",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.CONFLICT).json({
        error: (error as Error).message,
      });
    }
  }

  async cancelBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { serviceStatus, cancellationReason } = req.body;

      if (!id || !serviceStatus || !cancellationReason) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: "Missing cancellation details",
        });
      }

      const dto: CancelBookingRequestDTO = {
        bookingId: id,
        status: serviceStatus,
        reason: cancellationReason,
      };

      const data = await this.cancelBookingUseCase.execute(dto);

      res.status(HttpStatus.OK).json({
        message: "Booking cancelled successfully",
        data,
      });
    } catch (error) {
      res.status(HttpStatus.CONFLICT).json({
        error: (error as Error).message,
      });
    }
  }

  async requestPayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { payment, paymentStatus } = req.body;

      if (!id || !payment || !paymentStatus) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: "Missing payment data",
        });
        return;
      }
      
      const dto: RequestPaymentRequestDTO = {
        bookingId: id,
        payment,
        paymentStatus
      };

      const data = await this.requestPaymentUseCase.execute(dto);

      res.status(HttpStatus.OK).json({
        message: "Payment requested successfully",
        data,
      });
    } catch (error) {
      res.status(HttpStatus.CONFLICT).json({
        error: (error as Error).message,
      });
    }
  }

  async getUserBookedServices(req: Request, res: Response) {
    try {
      console.log("hello");
      const userId = new mongoose.Types.ObjectId(res.locals.user.userId);
      if (req.query.count) {
        const dto: GetUserBookedServiceCountRequestDTO = { userId: userId.toString() };
        const count =
          await this.getBookedServicesUseCase.getUserBookedServiceCount(dto);
        res.status(HttpStatus.OK).json({ count });
        return;
      }

      const limit = Number(req.query.limit ?? 10);
      const page = Number(req.query.page ?? 0);
      const skip = page * limit;

      const dto: GetUserBookedServicesRequestDTO = {
        userId: userId.toString(),
        skip,
        limit,
      };

      const services =
        await this.getBookedServicesUseCase.getUserBookedServices(dto);

      res.status(HttpStatus.OK).json({ services });
    } catch (error) {
      console.error("Error in getUserBookedServices:", error);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error",
        details: (error as Error).message,
      });
    }
  }

  async getBookedServiceDetailsForProvider(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: "Invalid service booking ID",
        });
      }

      const dto: GetBookedServiceByIdRequestDTO = { bookingId: id };
      const service =
        await this.getBookedServiceByIdUseCase.getForServiceProvider(dto);

      res.status(HttpStatus.OK).json({ service });
    } catch (error) {
      console.error("Error in getForServiceProvider:", error);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error",
        details: (error as Error).message,
      });
    }
  }

  async getBookedServiceDetailsForUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: "Invalid service booking ID",
        });
      }

      const dto: GetBookedServiceByIdRequestDTO = { bookingId: id };
      const service = await this.getBookedServiceByIdUseCase.getForUser(dto);

      res.status(HttpStatus.OK).json({ service });
    } catch (error) {
      console.error("Error in getForServiceProvider:", error);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error",
        details: (error as Error).message,
      });
    }
  }

  async getBookedServicesForProvider(req: Request, res: Response) {
    try {
      const serviceProviderId = res.locals.serviceProvider_id;

      if (!serviceProviderId) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: "Service provider ID is required.",
        });
      }

      const limit = Number(req.query.limit ?? 10);
      const page = Number(req.query.page ?? 0);
      const skip = page * limit;

      const dto: GetServiceProviderBookedServicesRequestDTO = {
        serviceProviderId,
        skip,
        limit,
      };

      const { services, count } =
        await this.getBookedServicesUseCase.getServiceProviderBookedServices(dto);

      res.status(HttpStatus.OK).json({
        services,
        count,
      });
    } catch (error) {
      console.error(
        "Error in getBookedServicesForProvider:",
        (error as Error).message,
        (error as Error).stack,
      );

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error",
        details: (error as Error).message,
      });
    }
  }
}
