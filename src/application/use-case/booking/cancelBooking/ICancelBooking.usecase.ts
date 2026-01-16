export interface ICancelBookingUseCase {
  execute(bookingId: string, status: string, reason: string): Promise<any>;
}
