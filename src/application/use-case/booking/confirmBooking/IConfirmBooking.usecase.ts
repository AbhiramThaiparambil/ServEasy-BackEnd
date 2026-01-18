export interface IConfirmBookingUseCase {
  execute(
    bookingId: string,
    status: string,
    estimatedServiceTime: string,
    serviceProviderId: string,
    reschedule: boolean,
    rescheduleReason?: string
  ): Promise<any>;
}
