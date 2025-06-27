import ServiceBooking from "../models/ServiceBooking";
import { IServiceBookingRepository } from "../../domain/repositories/IserviceBookingRepository";
import { Types } from "mongoose";
import { injectable } from "tsyringe";
import { ObjectId } from 'mongodb';
// import {IServiceBooking} from "../../domain/entities/IServiceBooking"
import { IServiceBooking } from "../../domain/entities/IserviceBooking";
import { IPayment } from "../../domain/entities/Ipayment";

import { BookService } from "../../application/use-case/bookService/bookService";
@injectable()
export class ServiceBookingRepository implements IServiceBookingRepository {
  async findBookedServicesByUserId(
    userId: Types.ObjectId
  ): Promise<IServiceBooking[]> {
    return await ServiceBooking.find({ userId }).sort({ bookedTime: -1 });
  }

  async findServicesByProviderId(
    serviceProviderId: Types.ObjectId
  ): Promise<IServiceBooking[]> {
    return await ServiceBooking.find({ serviceProviderId }).sort({
      bookedTime: -1,
    });
  }

  async createServiceBooking(
    serviceBookingData: IServiceBooking
  ): Promise<IServiceBooking> {
    const newServiceBooking = new ServiceBooking(serviceBookingData);
    return await newServiceBooking.save();
  }

  async updateServiceStatus(
    serviceBookingId: Types.ObjectId,
    serviceStatus: string
  ): Promise<IServiceBooking | null> {
    return await ServiceBooking.findByIdAndUpdate(
      serviceBookingId,
      { serviceStatus },
      { new: true }
    );
  }

  async updatePaymentStatus(
    serviceBookingId: Types.ObjectId,
    paymentStatus: string,
    paymentType:string
  ): Promise<IServiceBooking | null> {
    return await ServiceBooking.findByIdAndUpdate(
      serviceBookingId,
      { paymentStatus,
        paymentType
       },
      { new: true }
    );
  } 


 async findCountBookedServicebyUserId(userId: Types.ObjectId): Promise<number> {
  return await ServiceBooking.find({ userId }).countDocuments();
}

  async findBookedServicesAndServiceByUserId(
    userId: Types.ObjectId,skip:number,limit:number
  ): Promise<any> {
    try {
      const bookedServices = await ServiceBooking.aggregate([
        {
          $match: { userId: userId },
        },
        {
          $lookup: {
            from: "services",
            localField: "serviceId",
            foreignField: "_id",
            as: "serviceDetails",
          },
        },
        { $unwind: "$serviceDetails" },
        {
          $project: {
            _id: 1,
            serviceBookedAddress: "$address",
            serviceStatus: 1,
            paymentType: 1,
            serviceName: "$serviceDetails.serviceName",
            serviceType: "$serviceDetails.serviceType",
            serviceImage: "$serviceDetails.serviceImage",
            bookedTime: 1,
          },
        },
         {
          $sort: { bookedTime: -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ]);
  
      return bookedServices;
    } catch (e) {
      console.error("Error fetching booked services:", e);
      throw e;
    }
  }
  async findBookedServicesAndServiceByServiceProviderId(
    ServiceProviderId: Types.ObjectId,
    skip: number,
    limit: number
  ): Promise<any> {
    try {
      const bookedServices = await ServiceBooking.aggregate([
        {
          $match: { serviceProviderId: ServiceProviderId },
        },
        {
          $lookup: {
            from: "services",
            localField: "serviceId",
            foreignField: "_id",
            as: "serviceDetails",
          },
        },
        {
          $unwind: "$serviceDetails",
        },
        {
          $project: {
            _id: 1,
            serviceBookedAddress: "$address",
            serviceStatus: 1,
            paymentType: 1,
            serviceName: "$serviceDetails.serviceName",
            serviceType: "$serviceDetails.serviceType",
            serviceImage: "$serviceDetails.serviceImage",
            bookedTime: 1,
          },
        },
        {
          $sort: { bookedTime: -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ]);
  
      return bookedServices;
    } catch (e) {
      console.error("Error fetching booked services:", e);
      throw e;
    }
  }


  async findCountBookedService(serviceProviderId: Types.ObjectId): Promise<number> {
    try {
      return await ServiceBooking.countDocuments({ serviceProviderId });
    } catch (e) {
      console.error("Error counting booked services:", e);
      throw e;
    }
  }

  async findBookedServiceById(
    id: Types.ObjectId
  ): Promise<IServiceBooking | null> {
    return await ServiceBooking.findById(id);
  }

  async confirmBooking(
    id: Types.ObjectId,
    newStatus: string,
    estimatedServiceTime: string
  ): Promise<IServiceBooking | null> {
    return await ServiceBooking.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          serviceStatus: newStatus,
          estimatedServiceTime: estimatedServiceTime,
        },
      },
      { new: true }
    );
  }
  async cancelBooking(
    id: Types.ObjectId,
    newStatus: string,
    cancelReason: string
  ): Promise<IServiceBooking | null> {
    return await ServiceBooking.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          serviceStatus: newStatus,
          cancelReason: cancelReason,
        },
      },
      { new: true }
    );
  }

  async requestPayment(
    id: Types.ObjectId,
    status: string,
    payment: IPayment
  ) {
    return await ServiceBooking.findByIdAndUpdate(
      id,
      {
        $set: {
          serviceStatus: status,
          paymentStatus:status,
          payment: payment,
        },
      },
      { new: true } 
    );
  }

  async uploadBills(
    id: Types.ObjectId,
     uploadBills:string[]|string
   ) {
    return await ServiceBooking.findByIdAndUpdate(
      id,
      {
        $set: {
          serviceBills: uploadBills,
      
        },
      },
      { new: true } 
    );
  }

  async getBookedServiceCount(): Promise<number> {
    try {
      const count = await ServiceBooking.countDocuments();
      return count;
    } catch (error) {
      console.error("Error counting booked services:", error);
      throw new Error("Failed to count booked services");
    }
  }

  async findPaymentInfoAdmin(skip: number, limit: number): Promise<any> {
    try {
      const bookedData = await ServiceBooking.aggregate([
        {
          $lookup: {
            from: "services",
            localField: "serviceId",
            foreignField: "_id",
            as: "serviceDetails"
          }
        },
        { $unwind: "$serviceDetails" },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userData"
          }
        },
        { $unwind: "$userData" },
        {
          $lookup: {
            from: "serviceproviders",
            localField: "serviceProviderId",
            foreignField: "_id",
            as: "serviceProviderInfo"
          }
        },
        { $unwind: "$serviceProviderInfo" },
        {
          $project: {
            _id: 1,
            serviceBookedAddress: "$address",
            serviceStatus: 1,
            paymentType: 1,
            paymentStatus: 1,
            payment: 1,
            serviceBills: 1,
            estimatedServiceTime: 1,
            bookedTime:1,
            // Service Details
            serviceName: "$serviceDetails.serviceName",
            serviceType: "$serviceDetails.serviceType",
            serviceImage: "$serviceDetails.serviceImage",
  
            // User Details
            userName: "$userData.userName",
            userEmail: "$userData.email",
            userPhone: "$userData.phone",
            userProfile: "$userData.profileImage",
  
            // Service Provider Details
            serviceProviderName: "$serviceProviderInfo.serviceProviderName",
            serviceProviderEmail: "$serviceProviderInfo.serviceProviderEmail",
            profileImage: "$serviceProviderInfo.profileImage"
          }
        },
        {
          $sort: {
            bookedTime: -1 
          }
        },
        {
          $skip: skip
        },
        {
          $limit: limit
        }
      ]);
  
      return bookedData;
    } catch (e) {
      console.error("Error fetching booked service with user and service info:", e);
      throw e;
    }
  }
  
  
  

  async findPaymentInfoServiceProvider(id: string): Promise<any> {
    try {
      const bookedData = await ServiceBooking.aggregate([
        {
          $match: {
            paymentStatus: "completed",
            serviceProviderId: new Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "services",
            localField: "serviceId",
            foreignField: "_id",
            as: "serviceDetails",
          },
        },
        { $unwind: "$serviceDetails" },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userData",
          },
        },
        { $unwind: "$userData" },
        {
          $project: {
            _id: 1,
            serviceBookedAddress: "$address",
            payment:1,
            serviceStatus: 1,
            paymentType: 1,
  
            serviceName: "$serviceDetails.serviceName",
            serviceType: "$serviceDetails.serviceType",
            serviceImage: "$serviceDetails.serviceImage",
  
            userName: "$userData.userName",
            userEmail: "$userData.email",
            userPhone: "$userData.phone",
            userProfile: "$userData.profileImage",
          },
        },
      ]);
  
      return bookedData;
    } catch (e) {
      console.error("Error fetching booked service with user and service info:", e);
      throw e;
    }
  }



  async updateReviewId(bookingId: Types.ObjectId, reviewId: Types.ObjectId): Promise<void> {
    await ServiceBooking.findOneAndUpdate(
      { _id: bookingId },
      { $set: { reviewId: reviewId } }
    );
  }


async getPaymentInfo(startDate?: Date | null, endDate?: Date | null): Promise<any> {
  try {
    const match: any = {
      serviceStatus: "completed",
      paymentStatus: "completed",
    };

    if (startDate && endDate) {
      match.bookedTime = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const result = await ServiceBooking.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $ifNull: ["$payment.total", 0] } },
          totalConvenienceFee: { $sum: { $ifNull: ["$payment.convenienceFee", 0] } },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          totalConvenienceFee: 1,
          count: 1,
        },
      },
    ]);

    return result;
  } catch (error) {
    console.error("Error fetching payment info:", error);
    throw error;
  }
}



async getPaymentInfoServiceProvider(serviceProviderId:string,startDate?: Date | null, endDate?: Date | null): Promise<any> {


  try {
    const match: any = {
      serviceProviderId:new ObjectId(serviceProviderId),
      serviceStatus: "completed",
      paymentStatus: "completed",
    };

    if (startDate && endDate) {
      match.bookedTime = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const result = await ServiceBooking.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $ifNull: ["$payment.total", 0] } },
          totalConvenienceFee: { $sum: { $ifNull: ["$payment.convenienceFee", 0] } },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          totalConvenienceFee: 1,
          count: 1,
        },
      },
    ]);

    return result;
  } catch (error) {
    console.error("Error fetching payment info:", error);
    throw error;
  }
}



 async isServiceTimeConflicting(
    serviceProviderId: Types.ObjectId,
    estimatedServiceTime: string
  ): Promise<boolean> {
    console.log(serviceProviderId, "serviceProviderId");
    console.log(estimatedServiceTime, "estimatedServiceTime");
    const conflict = await  ServiceBooking.findOne({
      serviceProviderId,
      estimatedServiceTime
    });
    console.log(conflict, "conflict");
    return !!conflict;
  }






}
