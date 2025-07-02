import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateServiceStatus } from '../../../application/use-case/bookService/updateBookingStatus';
// import { IPayment } from "../../../domain/entities/Ipayment";
import { HttpStatus } from '../../../constants/HttpStatus';

export const serviceProviderStatusChange = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, action } = req.params;
    const changeStatusContainer = container.resolve(UpdateServiceStatus);

    if (!id) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Bad Request: Missing required fields (id or action)' });
      return;
    }

    let updatedService: any;

    if (action === 'accept') {
      const { estimatedServiceTime, serviceStatus, reschedule, reschedReason } = req.body;
      if (!estimatedServiceTime || !serviceStatus) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: 'Bad Request: Missing estimatedServiceTime or serviceStatus',
        });
        return;
      }
      const serviceProviderId = res.locals.serviceProvider_id;
      console.log(res.locals);
      updatedService = await changeStatusContainer.ConformBookingStatus(
        id,
        serviceStatus,
        estimatedServiceTime,
        serviceProviderId,
        reschedule,
        reschedReason
      );
    } else if (action === 'status') {
      const { serviceStatus } = req.body;

      if (!serviceStatus) {
        res.status(HttpStatus.BAD_REQUEST).json({ error: 'Bad Request: Missing serviceStatus' });
        return;
      }

      updatedService = await changeStatusContainer.updateBookingStatus(id, serviceStatus);
    } else if (action === 'cancel') {
      const { cancellationReason, serviceStatus } = req.body;

      if (!cancellationReason || !serviceStatus) {
        res.status(HttpStatus.BAD_REQUEST).json({
          error: 'Bad Request: Missing cancellationReason or serviceStatus',
        });
        return;
      }

      updatedService = await changeStatusContainer.bookingCancel(
        id,
        serviceStatus,
        cancellationReason
      );
    } else if (action == 'payment-request') {
      const { payment, paymentStatus } = req.body;
      console.log(payment);

      if (!payment || !paymentStatus) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Bad Request: Missing payment or paymentStatus' });
        return;
      }

      updatedService = await changeStatusContainer.requestPayment(id, payment, paymentStatus);
    }

    if (!updatedService) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Service booking not found or update failed' });
      return;
    }

    if (updatedService?.error) {
      res.status(HttpStatus.CONFLICT).json({ error: updatedService.error });
      return;
    }
    res.status(HttpStatus.OK).json({
      message: 'Booking status updated successfully',
      data: updatedService,
    });
  } catch (error) {
    console.error('Error in serviceProviderStatusChange:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
      details: (error as Error).message,
    });
  }
};
