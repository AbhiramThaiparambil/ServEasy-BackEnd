import { inject, injectable } from 'tsyringe';
import { ServiceBookingRepository } from '../../../infrastructure/repositories/ServiceBookingRepository';
import mongoose from 'mongoose';
import { IPayment } from '../../../domain/entities/IPayment';
import { ISystemNotification } from '../../../domain/entities/INotification';
import { formatDateTime } from '../../../utils/formatDateTime';
import { SocketService } from '../../../services/socket/SocketService';

@injectable()
export class UpdateServiceStatus {
  constructor(
    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository,
    @inject(SocketService) private socketService: SocketService
  ) {}

  async updateBookingStatus(serviceBookedId: string, status: string) {
    const bookedServiceId = new mongoose.Types.ObjectId(serviceBookedId);
    const data = await this.serviceBookingRepository.updateServiceStatus(bookedServiceId, status);

    this.serviceBookingRepository.addBookingHistory(
      bookedServiceId,
      'status-updated',
      'booking status has been updated to ' + status
    );

    const notification: ISystemNotification = {
      type: 'notfication',
      content: data?.isOnlineService
        ? 'Your service has been confirmed. Please complete the payment to proceed'
        : `The status of your booked service has been updated to  ${status}`,
      timestamp: new Date().toISOString(),
    };
    this.socketService.sendNotificationToUser(data?.userId + '', notification);
    return data;
  }

  async ConformBookingStatus(
    serviceBookedId: string,
    status: string,
    estimatedServiceTime: string,
    serviceProviderId: string,
    reschedule: boolean,
    reschedReason?: string
  ) {
    const bookedServiceId = new mongoose.Types.ObjectId(serviceBookedId);
    const providerId = new mongoose.Types.ObjectId(serviceProviderId);

    const isConflicting = await this.serviceBookingRepository.isServiceTimeConflicting(
      providerId,
      estimatedServiceTime
    );

    let notification: ISystemNotification | null = null;

    if (isConflicting) {
      return { error: 'You have already allocated this time slot to a service.' };
    }

    const bookedService =
      await this.serviceBookingRepository.findBookedServiceById(bookedServiceId);

    if (reschedule) {
      await this.serviceBookingRepository.rescheduleBooking(bookedServiceId, estimatedServiceTime);

      this.serviceBookingRepository.addBookingHistory(
        bookedServiceId,
        'rescheduled',
        `Your booking has been rescheduled to ${formatDateTime(estimatedServiceTime)}. Reason: ${reschedReason}`
      );

      notification = {
        type: 'notfication',
        content: `Your booking has been rescheduled to ${formatDateTime(estimatedServiceTime)}.`,
        timestamp: new Date().toISOString(),
      };
    } else {
      const service = await this.serviceBookingRepository.findBookedServiceById(bookedServiceId);
      if (service?.serviceStatus === 'confirmed') {
        return { error: 'You have already confirmed this booking.please reload page' };
      }
      const data = await this.serviceBookingRepository.confirmBooking(
        bookedServiceId,
        status,
        estimatedServiceTime
      );

      this.serviceBookingRepository.addBookingHistory(
        bookedServiceId,
        'confirmed',
        'booking has been confirmed by service provider.and is scheduled for ' +
          formatDateTime(estimatedServiceTime)
      );

      notification = {
        type: 'notfication',
        content: 'Your booking has been confirmed!',
        timestamp: new Date().toISOString(),
      };

      if (notification.content && notification.type) {
        this.socketService.sendNotificationToUser(bookedService?.userId + '', notification);
      }

      return data;
    }

    if (notification.content && notification.type) {
      this.socketService.sendNotificationToUser(bookedService?.userId + '', notification);
    }

    return { success: true };
  }

  async bookingCancel(id: string, status: string, cancellationReason: string) {
    const bookedServiceId = new mongoose.Types.ObjectId(id);
    const data = await this.serviceBookingRepository.cancelBooking(
      bookedServiceId,
      status,
      cancellationReason
    );
    this.serviceBookingRepository.addBookingHistory(
      bookedServiceId,
      'cancelled',
      'booking has been cancelled by service provider. Reason: ' + cancellationReason
    );

    const notification: ISystemNotification = {
      type: 'notfication',
      content: `Your booking has been cancelled.`,
      timestamp: new Date().toISOString(),
    };
    this.socketService.sendNotificationToUser(data?.userId + '', notification);
    return data;
  }

  async requestPayment(id: string, paymentData: IPayment, paymentStatus: string) {
    let convenienceFee: number = 0;
    if (paymentData.total > 100) {
      convenienceFee = paymentData.total * 0.1;
    }
    const payment: IPayment = {
      inspectionCost: paymentData.inspectionCost,
      serviceCost: paymentData.serviceCost,
      metaialCost: paymentData.metaialCost,
      total: paymentData.total,
      travelCost: paymentData.travelCost,
      convenienceFee: convenienceFee,
      discountAmount:0,
      finalTotal:paymentData.total,
    };
    const requestId = new mongoose.Types.ObjectId(id);
    const data = await this.serviceBookingRepository.requestPayment(
      requestId,
      paymentStatus,
      payment
    );

    this.serviceBookingRepository.addBookingHistory(
      requestId,
      'payment-requested',
      'Payment requested for your service. Please complete the payment to proceed.'
    );

    const notification: ISystemNotification = {
      type: 'notfication',
      content: `Payment requested for your service. Please complete the payment to proceed.`,
      timestamp: new Date().toISOString(),
    };
    this.socketService.sendNotificationToUser(data?.userId + '', notification);

    return data;
  }
}
