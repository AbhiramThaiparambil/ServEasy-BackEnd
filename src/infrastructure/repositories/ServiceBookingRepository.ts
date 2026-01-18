import ServiceBooking from "../models/ServiceBooking";
import { IServiceBookingRepository } from "../../domain/repositories/IserviceBookingRepository";
import { Types } from "mongoose";
import { injectable } from "tsyringe";
import { ObjectId } from "mongodb";
// import {IServiceBooking} from "../../domain/entities/IServiceBooking"
import { IServiceBooking } from "../../domain/entities/IServiceBooking";
import { IPayment } from "../../domain/entities/IPayment";

@injectable()
export class ServiceBookingRepository implements IServiceBookingRepository {
  async findBookedServicesByUserId(
    userId: Types.ObjectId,
  ): Promise<IServiceBooking[]> {
    return await ServiceBooking.find({ userId }).sort({ bookedTime: -1 });
  }

  async findServicesByProviderId(
    serviceProviderId: Types.ObjectId,
  ): Promise<IServiceBooking[]> {
    return await ServiceBooking.find({ serviceProviderId }).sort({
      bookedTime: -1,
    });
  }

  findById(_id: string): Promise<IServiceBooking | null> {
    return ServiceBooking.findById(_id);
  }

  async createServiceBooking(
    serviceBookingData: IServiceBooking,
  ): Promise<IServiceBooking> {
    const newServiceBooking = new ServiceBooking(serviceBookingData);
    return await newServiceBooking.save();
  }

  async updateServiceStatus(
    serviceBookingId: Types.ObjectId,
    serviceStatus: string,
  ): Promise<IServiceBooking | null> {
    return await ServiceBooking.findByIdAndUpdate(
      serviceBookingId,
      { serviceStatus },
      { new: true },
    );
  }

  async updatePaymentStatus(
    serviceBookingId: Types.ObjectId,
    paymentStatus: string,
    paymentType: string,
  ): Promise<IServiceBooking | null> {
    return await ServiceBooking.findByIdAndUpdate(
      serviceBookingId,
      { paymentStatus, paymentType },
      { new: true },
    );
  }

  async findCountBookedServicebyUserId(
    userId: Types.ObjectId,
  ): Promise<number> {
    return await ServiceBooking.find({ userId }).countDocuments();
  }

  async findBookedServicesAndServiceByUserId(
    userId: Types.ObjectId,
    skip: number,
    limit: number,
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
  // async findBookedServicesAndServiceByServiceProviderId(
  //   ServiceProviderId: Types.ObjectId,
  //   skip: number,
  //   limit: number
  // ): Promise<any> {
  //   try {
  //     const bookedServices = await ServiceBooking.aggregate([
  //       {
  //         $match: { serviceProviderId: ServiceProviderId },
  //       },
  //       {
  //         $lookup: {
  //           from: "services",
  //           localField: "serviceId",
  //           foreignField: "_id",
  //           as: "serviceDetails",
  //         },
  //       },
  //       {
  //         $unwind: "$serviceDetails",
  //       },
  //       {
  //         $project: {
  //           _id: 1,
  //           serviceBookedAddress: "$address",
  //           serviceStatus: 1,
  //           paymentType: 1,
  //           serviceName: "$serviceDetails.serviceName",
  //           serviceType: "$serviceDetails.serviceType",
  //           serviceImage: "$serviceDetails.serviceImage",
  //           bookedTime: 1,
  //         },
  //       },
  //       {
  //         $sort: { bookedTime: -1 },
  //       },
  //       {
  //         $skip: skip,
  //       },
  //       {
  //         $limit: limit,
  //       },
  //     ]);

  //     return bookedServices;
  //   } catch (e) {
  //     console.error("Error fetching booked services:", e);
  //     throw e;
  //   }
  // }

  async findBookedServicesAndServiceByServiceProviderId(
    ServiceProviderId: Types.ObjectId,
    skip: number,
    limit: number,
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
        { $unwind: "$serviceDetails" },

        {
          $addFields: {
            statusPriority: {
              $switch: {
                branches: [
                  {
                    case: {
                      $in: [
                        "$serviceStatus",
                        ["pending", "confirmed", "in-progress"],
                      ],
                    },
                    then: 1,
                  },
                  {
                    case: { $eq: ["$serviceStatus", "completed"] },
                    then: 2,
                  },
                  {
                    case: { $eq: ["$serviceStatus", "cancelled"] },
                    then: 3,
                  },
                ],
                default: 4,
              },
            },
          },
        },

        {
          $sort: {
            statusPriority: 1,
            bookedTime: -1,
          },
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
            estimatedServiceTime: 1,
            preferredSlot: 1,
          },
        },

        { $skip: skip },
        { $limit: limit },
      ]);

      return bookedServices;
    } catch (e) {
      console.error("Error fetching booked services:", e);
      throw e;
    }
  }

  async findCountBookedService(
    serviceProviderId: Types.ObjectId,
  ): Promise<number> {
    try {
      return await ServiceBooking.countDocuments({ serviceProviderId });
    } catch (e) {
      console.error("Error counting booked services:", e);
      throw e;
    }
  }

  async findBookedServiceById(
    id: Types.ObjectId,
  ): Promise<IServiceBooking | null> {
    return await ServiceBooking.findById(id);
  }

  async confirmBooking(
    id: Types.ObjectId,
    newStatus: string,
    estimatedServiceTime: string,
  ): Promise<IServiceBooking | null> {
    return await ServiceBooking.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          serviceStatus: newStatus,
          estimatedServiceTime: estimatedServiceTime,
        },
      },
      { new: true },
    );
  }
  async cancelBooking(
    id: Types.ObjectId,
    newStatus: string,
    cancelReason: string,
  ): Promise<IServiceBooking | null> {
    return await ServiceBooking.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          serviceStatus: newStatus,
          cancelReason: cancelReason,
        },
      },
      { new: true },
    );
  }

  async requestPayment(id: Types.ObjectId, status: string, payment: IPayment) {
    return await ServiceBooking.findByIdAndUpdate(
      id,
      {
        $set: {
          serviceStatus: status,
          paymentStatus: status,
          payment: payment,
        },
      },
      { new: true },
    );
  }

  async uploadBills(id: Types.ObjectId, uploadBills: string[] | string) {
    return await ServiceBooking.findByIdAndUpdate(
      id,
      {
        $set: {
          serviceBills: uploadBills,
        },
      },
      { new: true },
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

  async findPaymentInfoAdmin(
    skip: number,
    limit: number,
    search: string,
    status: string,
    statusField: "serviceStatus" | "paymentStatus" = "serviceStatus",
  ): Promise<any> {
    try {
      const matchConditions: any[] = [];


      // Add status filter
      if (status) {
        matchConditions.push({ [statusField]: status });
      }

      // Add search filter
      if (search?.trim()) {
        matchConditions.push({
          $or: [
            { "serviceDetails.serviceName": { $regex: search, $options: "i" } },
            { "userData.userName": { $regex: search, $options: "i" } },
            {
              "serviceProviderInfo.serviceProviderName": {
                $regex: search,
                $options: "i",
              },
            },
          ],
        });
      }

      const bookedData = await ServiceBooking.aggregate([
        {
          $lookup: {
            from: "services",
            localField: "serviceId",
            foreignField: "_id",
            as: "serviceDetails",
          },
        },
        {
          $unwind: {
            path: "$serviceDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userData",
          },
        },
        { $unwind: { path: "$userData", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "serviceproviders",
            localField: "serviceProviderId",
            foreignField: "_id",
            as: "serviceProviderInfo",
          },
        },
        {
          $unwind: {
            path: "$serviceProviderInfo",
            preserveNullAndEmptyArrays: true,
          },
        },

        // Apply match if conditions exist
        ...(matchConditions.length > 0
          ? [{ $match: { $and: matchConditions } }]
          : []),

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
            bookedTime: 1,
            serviceName: "$serviceDetails.serviceName",
            serviceType: "$serviceDetails.serviceType",
            serviceImage: "$serviceDetails.serviceImage",
            userName: "$userData.userName",
            userEmail: "$userData.email",
            userPhone: "$userData.phone",
            userProfile: "$userData.profileImage",
            serviceProviderName: "$serviceProviderInfo.serviceProviderName",
            serviceProviderEmail: "$serviceProviderInfo.serviceProviderEmail",
            profileImage: "$serviceProviderInfo.profileImage",
          },
        },
        { $sort: { bookedTime: -1 } },
        { $skip: skip },
        { $limit: limit },
      ]);

      console.log(bookedData, "bookedData");
      return bookedData;
    } catch (error) {
      console.error("Error fetching booked service info:", error);
      throw error;
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
            payment: 1,
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
      console.error(
        "Error fetching booked service with user and service info:",
        e,
      );
      throw e;
    }
  }

  async updateReviewId(
    bookingId: Types.ObjectId,
    reviewId: Types.ObjectId,
  ): Promise<void> {
    await ServiceBooking.findOneAndUpdate(
      { _id: bookingId },
      { $set: { reviewId: reviewId } },
    );
  }

  async getPaymentInfo(
    startDate?: Date | null,
    endDate?: Date | null,
  ): Promise<any> {
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
            totalConvenienceFee: {
              $sum: { $ifNull: ["$payment.convenienceFee", 0] },
            },
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

  async getPaymentInfoServiceProvider(
    serviceProviderId: string,
    startDate?: Date | null,
    endDate?: Date | null,
  ): Promise<any> {
    try {
      const match: any = {
        serviceProviderId: new ObjectId(serviceProviderId),
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
            totalConvenienceFee: {
              $sum: { $ifNull: ["$payment.convenienceFee", 0] },
            },
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
    estimatedServiceTime: string,
  ): Promise<boolean> {
    console.log(serviceProviderId, "serviceProviderId");
    console.log(estimatedServiceTime, "estimatedServiceTime");
    const conflict = await ServiceBooking.findOne({
      serviceProviderId,
      estimatedServiceTime,
    });
    console.log(conflict, "conflict");
    return !!conflict;
  }

  async rescheduleBooking(
    bookingId: Types.ObjectId,
    newDate: string,
  ): Promise<IServiceBooking | null> {
    return await ServiceBooking.findOneAndUpdate(
      { _id: bookingId },
      {
        $set: {
          estimatedServiceTime: newDate,
        },
      },
      { new: true },
    );
  }

  async addBookingHistory(
    bookingId: Types.ObjectId,
    action: string,
    message: string,
  ): Promise<void> {
    await ServiceBooking.findByIdAndUpdate(bookingId, {
      $push: {
        bookingHistory: {
          action,
          message,
          timestamp: new Date(),
        },
      },
    });
  }

  async checkAvailability(
    serviceProviderId: Types.ObjectId,
  ): Promise<{ available: boolean; reason?: string }> {
    try {
      const bookings = await ServiceBooking.find({
        serviceProviderId,
        serviceStatus: { $in: ["in-progress", "confirmed"] },
      });

      const now = new Date();

      for (const booking of bookings) {
        const estimatedTimeString = booking.estimatedServiceTime;

        if (estimatedTimeString) {
          const estimatedTime = new Date(estimatedTimeString); // convert from string to Date

          if (isNaN(estimatedTime.getTime())) {
            console.warn(
              `Invalid estimatedServiceTime format: ${estimatedTimeString}`,
            );
            continue;
          }

          if (estimatedTime > now) {
            return {
              available: false,
              reason: `Not available right now — a service is scheduled at ${estimatedTime.toLocaleString()}`,
            };
          }

          const oneHourAfter = new Date(
            estimatedTime.getTime() + 60 * 60 * 1000,
          );
          if (now < oneHourAfter) {
            return {
              available: false,
              reason: `Not available right now — a service is scheduled at ${estimatedTime.toLocaleString()}`,
            };
          }
        }
      }

      return { available: true };
    } catch (error) {
      console.error("Error fetching availability:", error);
      throw error;
    }
  }

  async update(
    bookingId: string,
    data: Partial<IServiceBooking>,
  ): Promise<IServiceBooking | null> {
    const updatedBooking = await ServiceBooking.findByIdAndUpdate(
      bookingId,
      data,
      {
        new: true,
      },
    );
    return updatedBooking;
  }

  async removeCouponAndUpdatePayment(
    bookingId: string,
  ): Promise<IServiceBooking> {
    const booking = await ServiceBooking.findById(bookingId);
    if (!booking || !booking.payment) throw new Error("Booking not found");

    const updated = await ServiceBooking.findOneAndUpdate(
      { _id: bookingId },
      {
        $unset: { coupon: "" },
        $set: {
          "payment.discountAmount": 0,
          "payment.finalTotal": booking.payment.total,
        },
      },
      { new: true },
    );

    return updated as IServiceBooking;
  }

  async countActiveServices(
    serviceProviderId: Types.ObjectId,
  ): Promise<number> {
    try {
      return await ServiceBooking.countDocuments({
        serviceProviderId,
        serviceStatus: { $in: ["pending", "in-progress", "confirmed"] },
      });
    } catch (error) {
      console.error("Error counting active services:", error);
      throw error;
    }
  }

  async hasActiveBooking(
    userId: Types.ObjectId,
    serviceId: Types.ObjectId,
  ): Promise<boolean> {
    console.log(userId, serviceId);
    const result = await ServiceBooking.aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
          serviceId: new ObjectId(serviceId),
          serviceStatus: { $nin: ["cancelled", "completed"] },
        },
      },
      { $limit: 1 },
      { $project: { _id: 1 } },
    ]);

    return result.length > 0;
  }

  async rescheduleOnlineService(
    bookingId: Types.ObjectId,
    date: Date,
    startTime: Date,
    endTime: Date,
  ): Promise<IServiceBooking | null> {
    const booking = await ServiceBooking.findById(bookingId);

    if (!booking) {
      return null;
    }

    booking.serviceSlot = {
      date: date,
      startTime: startTime,
      endTime: endTime,
    };

    return await booking.save();
  }
}
