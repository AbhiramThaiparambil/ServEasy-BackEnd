import { inject, injectable } from "tsyringe";
import { ServiceBookingRepository } from "../../../infrastructure/repositories/ServiceBookingRepository";
import mongoose from "mongoose";
import { IPayment } from "../../../domain/entities/Ipayment";
import { SocketService } from "../../../services/socket/socketService";
import { ISystemNotification } from "../../../domain/entities/INotification";

@injectable()
export class UpdateServiceStatus {
  constructor(
    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository,
    @inject(SocketService)    private socketService: SocketService


  ) {}

  async updateBookingStatus(serviceBookedId: string, status: string) {
    const bookedServiceId = new mongoose.Types.ObjectId(serviceBookedId);
    const data = await this.serviceBookingRepository.updateServiceStatus(
      bookedServiceId,
      status
    );
    
    const notification:ISystemNotification= {
      type: "notfication",
      content: data?.isOnlineService?"Your service has been confirmed. Please complete the payment to proceed":`The status of your booked service has been updated to  ${status}`,
      timestamp: new Date().toISOString(),
    };
    this.socketService.sendNotificationToUser(
      data?.userId+"",
      notification
    );
    return data;
  }

  async ConformBookingStatus(
    serviceBookedId: string,
    status: string,
    estimatedServiceTime: string,
    serviceProviderId: string
  ) {
    const isConflicting = await this.serviceBookingRepository.isServiceTimeConflicting(new mongoose.Types.ObjectId(serviceProviderId), estimatedServiceTime);
       console.log(isConflicting, "isConflicting" );
       console.log("-------------====----===---=====---===-==-==----");
       
       console.log(serviceBookedId, "serviceBookedId" );
       console.log(serviceProviderId, "serviceProviderId" );

    if(isConflicting) {
return {error: "You have already allocated this time slot to a service." }
    }

     

    const bookedServiceId = new mongoose.Types.ObjectId(serviceBookedId);
    const data = await this.serviceBookingRepository.confirmBooking(
      bookedServiceId,
      status,
      estimatedServiceTime+""
    );
    const bookedService =
    await this.serviceBookingRepository.findBookedServiceById(
      bookedServiceId
    );
    const notification:ISystemNotification= {
      type: "notfication",
      content: `Your booking has been confirmed!`,
      timestamp: new Date().toISOString(),
    };
    this.socketService.sendNotificationToUser(
      bookedService?.userId + "",
      notification
    );

    

    return data;
  }

  async bookingCancel(id: string, status: string, cancellationReason: string) {
    const bookedServiceId = new mongoose.Types.ObjectId(id);
    const data = await this.serviceBookingRepository.cancelBooking(
      bookedServiceId,
      status,
      cancellationReason
    );
    const notification:ISystemNotification = {
      type: "notfication",
      content: `Your booking has been cancelled.`,
      timestamp: new Date().toISOString(),
    };
    this.socketService.sendNotificationToUser(
      data?.userId+"",
      notification
    );
    return data;
  }
  

  async requestPayment(
    id: string,
    paymentData: IPayment,
    paymentStatus: string
  ) {
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
    };
    const requestId = new mongoose.Types.ObjectId(id);
    const data = await this.serviceBookingRepository.requestPayment(
      requestId,
      paymentStatus,
      payment
    );

    const notification:ISystemNotification = {
      type: "notfication",
      content: `Payment requested for your service. Please complete the payment to proceed.`,
      timestamp: new Date().toISOString(),
    };
    this.socketService.sendNotificationToUser(
      data?.userId+"",
      notification
    );

    return data;
  }
}
