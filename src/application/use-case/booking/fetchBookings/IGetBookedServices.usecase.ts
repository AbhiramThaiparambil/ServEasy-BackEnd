import mongoose from "mongoose";

export interface IGetBookedServicesUseCase {
  getUserBookedServices(
    userId: mongoose.Types.ObjectId,
    skip: number,
    limit: number
  ): Promise<any>;

  getUserBookedServiceCount(userId: mongoose.Types.ObjectId): Promise<number>;

  getServiceProviderBookedServices(
    serviceProviderId: mongoose.Types.ObjectId,
    skip: number,
    limit: number
  ): Promise<{
    services: any;
    count: number;
  }>;
}
