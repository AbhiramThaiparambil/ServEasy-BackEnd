import { GetBookingPaymentSummaryRequestDTO, ServiceBooking } from "../../../../../application/dtos/serviceProvider/booking/paymentSummary/BookingPaymentSummaryDTO";

export interface IGetBookingPaymentSummaryUseCase {
  execute(data: GetBookingPaymentSummaryRequestDTO): Promise<ServiceBooking[]>;
}
