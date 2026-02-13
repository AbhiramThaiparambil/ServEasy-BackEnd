import { Request, Response } from "express";
import { getString } from "../../utils/requestUtils";
import { getErrorMessage } from "../../utils/errorUtils";

import { injectable, inject } from "tsyringe";
import { HttpStatus } from "../../constants/HttpStatus";
import { USE_CASE_TOKENS } from "../../constants/tokens";
import { IApplyCouponToBookingUseCase } from "../../application/use-case/user/coupon/applyCoupon/IApplyCouponToBooking.usecase";
import { IRemoveCouponToBookingUseCase } from "../../application/use-case/user/coupon/removeCoupon/IRemoveCoupon.usecase";
import { ICancelBookingUseCase } from "../../application/use-case/user/booking/cancelBooking/ICancelBooking.usecase";
import { CancelBookingRequestDTO } from "../../application/dtos/user/booking/cancelBooking/CancelBookingDTO";
import { IDeleteSlotUseCase } from "../../application/use-case/serviceProvider/slot/deleteSlot/IDeleteSlot.usecase";
import { ICreateSlotUseCase } from "../../application/use-case/serviceProvider/slot/createSlot/ICreateSlot.usecase";
import { IGetSlotUseCase } from "../../application/use-case/serviceProvider/slot/getSlots/IGetSlot.usecase";
import { IGetAllActiveServiceUseCase } from "../../application/use-case/user/service/getService/IGetAllActiveService.usecase";
import { IAddNewServiceUseCase } from "../../application/use-case/serviceProvider/service-management/addNewService/IAddNewService.usecase";
import { IGetServicesUseCase } from "../../application/use-case/serviceProvider/service-management/getServices/IGetServices.usecase";
import { IEditServiceUseCase } from "../../application/use-case/serviceProvider/service-management/editService/IEditService.usecase";
import { IBlockUnblockServiceUseCase } from "../../application/use-case/serviceProvider/service-management/blockUnblockService/IBlockUnblockService.usecase";
import { AddNewServiceRequestDTO } from "../../application/dtos/serviceProvider/service-management/addNewService/AddNewServiceRequestDTO";
import { GetProviderServicesRequestDTO } from "../../application/dtos/serviceProvider/service-management/getServices/GetProviderServicesRequestDTO";
import { EditServiceRequestDTO } from "../../application/dtos/serviceProvider/service-management/editService/EditServiceRequestDTO";
import { BlockUnblockServiceRequestDTO } from "../../application/dtos/serviceProvider/service-management/blockUnblockService/BlockUnblockServiceRequestDTO";

import { CreateSlotRequestDTO } from "../../application/dtos/serviceProvider/slot/createSlot/CreateSlotRequestDTO";
import { DeleteSlotRequestDTO } from "../../application/dtos/serviceProvider/slot/deleteSlot/DeleteSlotRequestDTO";
import { GetSlotsRequestDTO } from "../../application/dtos/serviceProvider/slot/getSlots/GetSlotsRequestDTO";

@injectable()
export class ServiceController {
  constructor(
    @inject(USE_CASE_TOKENS.GetAllActiveServiceUseCase)
    private getAllActiveService: IGetAllActiveServiceUseCase,
    @inject(USE_CASE_TOKENS.CancelBookingUseCase)
    private cancelBookingUseCase: ICancelBookingUseCase,
    @inject(USE_CASE_TOKENS.DeleteSlotUseCase)
    private deleteSlotUseCase: IDeleteSlotUseCase,

    @inject(USE_CASE_TOKENS.CreateSlotUseCase)
    private createSlotUseCase: ICreateSlotUseCase,

    @inject(USE_CASE_TOKENS.GetSlotUseCase)
    private getServiceSlotUseCase: IGetSlotUseCase,
    @inject(USE_CASE_TOKENS.ApplyCouponToBookingUseCase)
    private applyCouponUseCase: IApplyCouponToBookingUseCase,
    @inject(USE_CASE_TOKENS.RemoveCouponToBookingUseCase)
    private removeCouponUseCase: IRemoveCouponToBookingUseCase,
    @inject(USE_CASE_TOKENS.AddNewService)
    private addNewServiceUseCase: IAddNewServiceUseCase,
    @inject(USE_CASE_TOKENS.GetService)
    private getServiceUseCase: IGetServicesUseCase,
    @inject(USE_CASE_TOKENS.EditService)
    private editServiceUseCase: IEditServiceUseCase,
    @inject(USE_CASE_TOKENS.BlockUnblockSericeUseCase)
    private blockUnblockServiceUseCase: IBlockUnblockServiceUseCase,
  ) {}

   async cancelUserBooking(req: Request, res: Response): Promise<void> {
    try {
      const id = getString(req.params.id);
      const { cancellationReason } = req.body;

      if (!id || !cancellationReason) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "Booking ID and cancellation reason are required.",
        });
        return;
      }

      const dto: CancelBookingRequestDTO = {
        bookingId: id,
        status: "cancelled",
        reason: cancellationReason,
      };

      const result = await this.cancelBookingUseCase.execute(dto);

      res.status(HttpStatus.OK).json({
        message: "Booking cancelled successfully.",
        data: result,
      });
    } catch (error: unknown) {
      console.error("Error cancelling user booking:", getErrorMessage(error));
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong while cancelling the booking.",
      });
    }
  }

  async getOnlineServiceWithSlotHandler(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const serviceId = getString(req.params.serviceId);

      if (!serviceId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "serviceId is required" });
        return;
      }
      const data =
        await this.getAllActiveService.getOnlineServicesWithSlot(serviceId);
      res.status(HttpStatus.OK).json(data);
    } catch (error: unknown) {
      console.error("Error fetching online services with slots:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }

  async getOnlineServiceSlotsHandler(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const id = getString(req.params.id);

      const dto: GetSlotsRequestDTO = { serviceId: id };
      const data = await this.getServiceSlotUseCase.execute(dto);
      res.status(HttpStatus.OK).json(data);
    } catch (error: unknown) {
      console.error("Error fetching online services with slots:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }

  async deleteSlotHandler(req: Request, res: Response): Promise<void> {
    try {
      const id = getString(req.params.id);

      if (!id) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "Slot ID is required",
        });
        return;
      }

      const dto: DeleteSlotRequestDTO = { slotId: id };
      await this.deleteSlotUseCase!.execute(dto);

      res.status(HttpStatus.OK).json({
        message: "Slot deleted successfully",
      });
    } catch (error: unknown) {
      console.error("Error deleting slot:", getErrorMessage(error));
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
      });
    }
  }

  async createSlotHandler(req: Request, res: Response): Promise<void> {
    try {
      const { serviceId, startTime, endTime } = req.body;
      console.log(startTime, endTime);
      if (!serviceId || !startTime || !endTime) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "Missing required fields: serviceId, startTime, endTime",
        });
        return;
      }

      const dto: CreateSlotRequestDTO = {
        serviceId,
        startTime,
        endTime,
        booked: false,
      };

      const slot = await this.createSlotUseCase!.execute(dto);

      res.status(HttpStatus.CREATED).json({
        message: "Slot created successfully",
        slot,
      });
    } catch (error: unknown) {
      console.error("Error creating slot:", getErrorMessage(error));
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
      });
    }
  }

  async applyCoupon(req: Request, res: Response) {
    try {
      const bookingId = getString(req.params.bookingId);
      const { couponCode } = req.body;

      const updatedBooking = await this.applyCouponUseCase.execute({
        bookingId,
        couponCode,
      });

      res.status(HttpStatus.OK).json({
        data: updatedBooking,
      });
      return;
    } catch (error: unknown) {
      console.log(getErrorMessage(error));
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: getErrorMessage(error) || "Failed to apply coupon" });

      return;
    }
  }

  async removeCoupon(req: Request, res: Response) {
    try {
      const bookingId = getString(req.params.bookingId);
      if (!bookingId) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "Missing required fields: serviceId, startTime, endTime",
        });
        return;
      }
      const updatedBooking = await this.removeCouponUseCase.execute({ bookingId });
      console.log(updatedBooking);
      res.status(200).json({
        data: updatedBooking,
      });
      return;
    } catch (error: unknown) {
      console.log(getErrorMessage(error));
      res
        .status(400)
        .json({ message: getErrorMessage(error) || "Failed to remove coupon" });
      return;
    }
  }


  async addNewService(req: Request, res: Response): Promise<void> {
    try {
      const {
        serviceName,
        description,
        serviceType,
        category,
        location,
        estimatedPrice,
        serviceImage,
        serviceProviderId,
      } = req.body;

      if (
        !serviceName ||
        !description ||
        !serviceType ||
        !category ||
        !location ||
        !estimatedPrice ||
        !serviceImage ||
        !serviceProviderId
      ) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: "Bad Request: Missing required fields" });
        return;
      }
      const updateLocation = {
        type: "Point" as const,
        coordinates: [location.longitude, location.latitude] as [number, number],
        address: location.address,
      };
      const serviceData: AddNewServiceRequestDTO = {
        serviceName,
        description,
        serviceType,
        category,
        location: updateLocation,
        estimatedPrice,
        serviceImage,
        serviceProviderId,
      };

      const service = await this.addNewServiceUseCase.execute(serviceData);

      res.status(HttpStatus.CREATED).json({ data: service });
    } catch (error: unknown) {
      console.error(getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  }

  async getServices(req: Request, res: Response): Promise<void> {
    try {
      const serviceProviderId = res.locals.serviceProvider_id;

      if (!serviceProviderId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Service Provider ID is required." });
        return;
      }

      const dto: GetProviderServicesRequestDTO = { providerId: serviceProviderId };
      const result = await this.getServiceUseCase.execute(dto);

      res.status(HttpStatus.OK).json({ allServices: result });
    } catch (e: unknown) {
      console.error(getErrorMessage(e));
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred while fetching services.",
      });
    }
  }

  async updateService(req: Request, res: Response): Promise<void> {
    try {
      const serviceId = getString(req.params.serviceId);
      if (!serviceId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: "Bad Request: Missing serviceId" });
        return;
      }

      const {
        serviceName,
        description,
        serviceType,
        category,
        location,
        estimatedPrice,
        serviceImage,
        serviceProviderId,
      }: any = req.body;

      if (
        !serviceName ||
        !description ||
        !serviceType ||
        !category ||
        !location ||
        !estimatedPrice ||
        !serviceImage ||
        !serviceProviderId
      ) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: "Bad Request: Missing required fields" });
        return;
      }

      const serviceData: any = {
        serviceName,
        description,
        serviceType,
        category,
        location,
        estimatedPrice,
        serviceImage: "",
        serviceProviderId,
      };

      const dto: EditServiceRequestDTO = {
        serviceId,
        serviceData,
        serviceNewImg: serviceImage,
      };

      const updatedService = await this.editServiceUseCase.execute(dto);

      if (!updatedService) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: "Service not found or not updated" });
        return;
      }

      res
        .status(HttpStatus.OK)
        .json({ message: "Service updated successfully", data: updatedService });
    } catch (error: unknown) {
      console.error(getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  }

  async blockUnblockService(req: Request, res: Response): Promise<void> {
    try {
      const { serviceId, action } = req.body;

      if (!serviceId || !action) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "serviceId and action are required" });
        return;
      }

      let result: boolean;
      const dto: BlockUnblockServiceRequestDTO = { serviceId };

      if (action === "Block") {
        result = await this.blockUnblockServiceUseCase.blockService(dto);
      } else if (action === "Unblock") {
        result = await this.blockUnblockServiceUseCase.unblockService(dto);
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Invalid action. Use 'Block' or 'Unblock'." });
        return;
      }

      if (result) {
        res.status(HttpStatus.OK).json({
          message: `Service ${action.toLowerCase()}ed successfully`,
        });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: `Failed to ${action.toLowerCase()} service`,
        });
      }
    } catch (error: unknown) {
      console.error("Error in blockUnblockService:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: getErrorMessage(error) || "Internal server error" });
    }
  }
}
