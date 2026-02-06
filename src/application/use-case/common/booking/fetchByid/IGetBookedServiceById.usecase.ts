import { GetBookedServiceByIdRequestDTO } from "../../../../../application/dtos/common/booking/fetchByid/GetBookedServiceByIdDTO";
import mongoose from "mongoose";

export interface IGetBookedServiceByIdUseCase {
  getForUser(data: GetBookedServiceByIdRequestDTO): Promise<{
    bookedService: any;
    serviceProvider: any;
    service: any;
    review: any;
  }>;

  getForServiceProvider(data: GetBookedServiceByIdRequestDTO): Promise<{
    bookedService: any;
    serviceProvider: any;
    service: any;
    user: any;
    review: any;
  }>;
}
