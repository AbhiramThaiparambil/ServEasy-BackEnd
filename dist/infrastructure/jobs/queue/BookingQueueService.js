"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingQueueService = exports.BOOKING_QUEUE_NAME = void 0;
const tsyringe_1 = require("tsyringe");
const bullmq_1 = require("bullmq");
const ServiceBookingRepository_1 = require("../../repositories/ServiceBookingRepository");
const BullConnection_1 = require("../BullConnection");
const tokens_1 = require("../../../constants/tokens");
exports.BOOKING_QUEUE_NAME = "bookingQueue";
let BookingQueueService = class BookingQueueService {
    constructor(bookingRepository) {
        this.bookingRepository = bookingRepository;
        this.queue = new bullmq_1.Queue(exports.BOOKING_QUEUE_NAME, { connection: BullConnection_1.redisConnection });
        this.processJobs();
    }
    addAutoCancelJob(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.queue.add("auto-cancel-booking", { bookingId }, {
                // delay: 30 * 1000,
                delay: 15 * 60 * 1000,
                removeOnComplete: true,
                removeOnFail: true,
            });
        });
    }
    processJobs() {
        new bullmq_1.Worker(exports.BOOKING_QUEUE_NAME, (job) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (job.name === "auto-cancel-booking") {
                    const { bookingId } = job.data;
                    const booking = yield this.bookingRepository.findBookedServiceById(bookingId);
                    if (!booking) {
                        console.warn(`Booking not found: ${bookingId}`);
                        return;
                    }
                    if (booking.serviceStatus === "pending") {
                        yield this.bookingRepository.cancelBooking(bookingId, "cancelled", "Auto-cancelled after 15 minutes: service provider did not respond");
                        console.log(` Booking ${bookingId} auto-cancelled`);
                    }
                }
            }
            catch (error) {
                console.error(`Error processing job [${job.name}]:`, error);
            }
        }), { connection: BullConnection_1.redisConnection });
    }
};
exports.BookingQueueService = BookingQueueService;
exports.BookingQueueService = BookingQueueService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceBookingRepository)),
    __metadata("design:paramtypes", [ServiceBookingRepository_1.ServiceBookingRepository])
], BookingQueueService);
