export interface ConfirmBookingRequestDTO {
  bookingId: string;
  status: string;
  estimatedServiceTime: string;
  serviceProviderId: string;
  reschedule: boolean;
  rescheduleReason?: string;
}
