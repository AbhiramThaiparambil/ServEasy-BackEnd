export interface IUpdateBookingStatusUseCase {
  execute(bookingId: string, status: string): Promise<any>;
}
