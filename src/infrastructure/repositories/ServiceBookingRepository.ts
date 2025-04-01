import ServiceBooking from "../models/ServiceBooking";
import { IServiceBooking } from "../../domain/entities/IserviceBooking";
import { IServiceBookingRepository } from "../../domain/repositories/IserviceBookingRepository";
import { Types } from "mongoose";
import { injectable } from "tsyringe";

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
    paymentStatus: string
  ): Promise<IServiceBooking | null> {
    return await ServiceBooking.findByIdAndUpdate(
      serviceBookingId,
      { paymentStatus },
      { new: true }
    );
  }

  

  async findBookedServicesAndServiceByUserId(
    userId: Types.ObjectId
  ): Promise<any> {

    try {
      const bookedServices = await ServiceBooking.aggregate([
        {
          $match: { userId: userId } 
        },
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
          $project: {
            _id: 1,
            serviceBookedAddress: "$address", 
            serviceStatus: 1,
            paymentType: 1,
            serviceName: "$serviceDetails.serviceName", 
            serviceType: "$serviceDetails.serviceType",
            serviceImage: "$serviceDetails.serviceImage"
          }
        }
      ]);
  
      return bookedServices; 
    } catch (e) {
      console.error("Error fetching booked services:", e);
      throw e; 
    }
  }
  
  async findBookedServicesAndServiceByServiceProviderId(
    ServiceProviderId: Types.ObjectId
  ): Promise<any> {

    try {
      const bookedServices = await ServiceBooking.aggregate([
        {
          $match: { serviceProviderId: ServiceProviderId } 
        },
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
          $project: {
            _id: 1,
            serviceBookedAddress: "$address",
            serviceStatus: 1,
            paymentType: 1,
            serviceName: "$serviceDetails.serviceName", 
            serviceType: "$serviceDetails.serviceType",
            serviceImage: "$serviceDetails.serviceImage"
          }
        }
      ]);
  
      return bookedServices; 
    } catch (e) {
      console.error("Error fetching booked services:", e);
      throw e; 
    }
  }

 async findBookedServiceById(id:Types.ObjectId): Promise<IServiceBooking | null> {
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
          estimatedServiceTime: estimatedServiceTime 
        } 
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
          cancelReason: cancelReason 
        } 
      },
      { new: true } 
    );
  }

  

}
