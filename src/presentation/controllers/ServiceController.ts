import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { GetAllActiveService } from '../../application/use-case/User/getAllService';
import { HttpStatus } from '../../constants/HttpStatus';
import { UpdateServiceStatus } from '../../application/use-case/bookService/updateBookingStatus';
import { DeleteSlotUseCase } from '../../application/use-case/admin/slot/DeleteSlotUseCase';
import { promises } from 'dns';
import { CreateSlotUseCase } from '../../application/use-case/admin/slot/CreateSlotUseCase';
import { GetServiceSlot } from '../../application/use-case/admin/slot/getSlot';

@injectable()
export class ServiceController {
  constructor(
    @inject(GetAllActiveService)
    private getAllActiveService: GetAllActiveService,
    @inject(UpdateServiceStatus) private updateServiceStatus: UpdateServiceStatus,
    @inject(DeleteSlotUseCase) private deleteSlotUseCase: DeleteSlotUseCase,
    @inject(CreateSlotUseCase) private createSlot: CreateSlotUseCase,
    @inject(GetServiceSlot) private getServiceSlot: GetServiceSlot
  ) {}

  async cancelUserBooking(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { cancellationReason } = req.body;

      if (!id || !cancellationReason) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Booking ID and cancellation reason are required.',
        });
        return;
      }

      const result = await this.updateServiceStatus.bookingCancel(
        id,
        'cancelled',
        cancellationReason
      );

      res.status(HttpStatus.OK).json({
        message: 'Booking cancelled successfully.',
        data: result,
      });
    } catch (error) {
      console.error('Error cancelling user booking:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong while cancelling the booking.',
      });
    }
  }

  async getOnlineServiceWithSlotHandler(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.getAllActiveService.getOnlineServicesWithSlot();
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      console.error('Error fetching online services with slots:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }

  async getOnlineServiceSlotsHandler(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const data = await this.getServiceSlot.execute(id);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      console.error('Error fetching online services with slots:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }

  async deleteSlotHandler(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Slot ID is required',
        });
        return;
      }

      await this.deleteSlotUseCase!.execute(id);

      res.status(HttpStatus.OK).json({
        message: 'Slot deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting slot:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error',
      });
    }
  }

  async createSlotHandler(req: Request, res: Response): Promise<void> {
    try {
      const { serviceId, startTime, endTime } = req.body;

      if (!serviceId || !startTime || !endTime) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Missing required fields: serviceId, startTime, endTime',
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
        message: 'Slot created successfully',
        slot,
      });
    } catch (error) {
      console.error('Error creating slot:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error',
      });
    }
  }
}
