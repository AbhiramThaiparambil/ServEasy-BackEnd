import { injectable, inject } from 'tsyringe';
import { Queue, Worker } from 'bullmq';
import { ServiceBookingRepository } from '../../infrastructure/repositories/ServiceBookingRepository'; 
import { Types } from 'mongoose';
import { redisConnection } from '../../infrastructure/jobs/BullConnection';

export const BOOKING_QUEUE_NAME = 'bookingQueue';

@injectable()
export class BookingQueueService {
  private queue: Queue;

  constructor(
    @inject('ServiceBookingRepository')
    private bookingRepository: ServiceBookingRepository
  ) {
    this.queue = new Queue(BOOKING_QUEUE_NAME, { connection: redisConnection }); // ✅ updated
    this.processJobs();
  }

  async addAutoCancelJob(bookingId: Types.ObjectId): Promise<void> {
    await this.queue.add(
      'auto-cancel-booking',
      { bookingId },
      {
        // delay: 30 * 1000, 
        delay: 15 * 60 * 1000, 
        removeOnComplete: true,
        removeOnFail: true,
      }
    );
  }

  private processJobs(): void {
    new Worker(
      BOOKING_QUEUE_NAME,
      async (job) => {
        try {
          if (job.name === 'auto-cancel-booking') {
            const { bookingId } = job.data;

            const booking = await this.bookingRepository.findBookedServiceById(bookingId);
            if (!booking) {
              console.warn(`Booking not found: ${bookingId}`);
              return;
            }

            if (booking.serviceStatus === 'pending') {
              await this.bookingRepository.cancelBooking(
                bookingId,
                'cancelled',
                'Auto-cancelled after 15 minutes: service provider did not respond'
              );
              console.log(`✅ Booking ${bookingId} auto-cancelled`);
            }
          }
        } catch (error) {
          console.error(`❌ Error processing job [${job.name}]:`, error);
        }
      },
      { connection: redisConnection } 
    );
  }
}
