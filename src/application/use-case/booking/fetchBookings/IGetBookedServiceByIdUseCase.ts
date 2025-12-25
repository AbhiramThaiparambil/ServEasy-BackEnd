import mongoose from "mongoose";

export interface IGetBookedServiceByIdUseCase {
  getForUser(bookingId: mongoose.Types.ObjectId): Promise<{
    bookedService: any;
    serviceProvider: any;
    service: any;
    review: any;
  }>;

  getForServiceProvider(bookingId: mongoose.Types.ObjectId): Promise<{
    bookedService: any;
    serviceProvider: any;
    service: any;
    user: any;
    review: any;
  }>;
}
