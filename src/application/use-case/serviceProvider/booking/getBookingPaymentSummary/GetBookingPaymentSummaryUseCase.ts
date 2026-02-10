import { inject, injectable } from "tsyringe";
import mongoose from "mongoose";
import { IGetBookingPaymentSummaryUseCase } from "./IGetBookingPaymentSummaryUseCase";
import {
  GetBookingPaymentSummaryRequestDTO,
  ServiceBooking,
} from "../../../../../application/dtos/serviceProvider/booking/paymentSummary/BookingPaymentSummaryDTO";
import { ServiceBookingRepository } from "../../../../../infrastructure/repositories/ServiceBookingRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";

@injectable()
export class GetBookingPaymentSummaryUseCase
  implements IGetBookingPaymentSummaryUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository
  ) {}

  async execute(dto: GetBookingPaymentSummaryRequestDTO): Promise<ServiceBooking[]> {
    const { serviceProviderId } = dto;
    
    // Find all completed bookings for provider
    const bookings = await this.serviceBookingRepository.findCompletedByProvider(
      serviceProviderId
    );

    // Map to ServiceBooking DTO array
    const serviceBookings: ServiceBooking[] = bookings.map((booking: any) => {
        // Note: handling potential typo in IPayment: metaialCost vs materialCost if present from aggregation result
        // The aggregation result fields should match what we projected
        const materialCost = booking.payment?.metaialCost ?? booking.payment?.materialCost ?? null;

        return {
            _id: booking._id?.toString() ?? "",
            payment: {
                convenienceFee: booking.payment?.convenienceFee ?? 0,
                inspectionCost: booking.payment?.inspectionCost ?? 0,
                materialCost: materialCost,
                serviceCost: booking.payment?.serviceCost ?? 0,
                total: booking.payment?.total ?? 0,
                travelCost: booking.payment?.travelCost ?? 0,
            },
            paymentType: booking.paymentType ?? "pending",
            serviceBookedAddress: {
                description: booking.address?.description ?? "",
                houseName: booking.address?.houseName ?? "",
                landmark: booking.address?.landmark ?? "",
                name: booking.address?.name ?? "",
                phone: booking.userPhone ?? "",
                pincode: booking.address?.pincode ?? "",
                state: booking.address?.state ?? "",
                _id: booking.address?._id?.toString() ?? "",
            },
            serviceImage: booking.serviceImage ?? "",
            serviceName: booking.serviceName ?? "",
            serviceStatus: booking.serviceStatus ?? "",
            serviceType: booking.serviceType ?? "",
            userEmail: booking.userEmail ?? "",
            userName: booking.userName ?? "",
            userProfile: booking.userProfile ?? "",
        };
    });

    return serviceBookings;
  }
}
