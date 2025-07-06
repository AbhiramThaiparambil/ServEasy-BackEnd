"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBookingRepository = void 0;
const ServiceBooking_1 = __importDefault(require("../models/ServiceBooking"));
const mongoose_1 = require("mongoose");
const tsyringe_1 = require("tsyringe");
const mongodb_1 = require("mongodb");
let ServiceBookingRepository = class ServiceBookingRepository {
    findBookedServicesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceBooking_1.default.find({ userId }).sort({ bookedTime: -1 });
        });
    }
    findServicesByProviderId(serviceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceBooking_1.default.find({ serviceProviderId }).sort({
                bookedTime: -1,
            });
        });
    }
    createServiceBooking(serviceBookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newServiceBooking = new ServiceBooking_1.default(serviceBookingData);
            return yield newServiceBooking.save();
        });
    }
    updateServiceStatus(serviceBookingId, serviceStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceBooking_1.default.findByIdAndUpdate(serviceBookingId, { serviceStatus }, { new: true });
        });
    }
    updatePaymentStatus(serviceBookingId, paymentStatus, paymentType) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceBooking_1.default.findByIdAndUpdate(serviceBookingId, { paymentStatus, paymentType }, { new: true });
        });
    }
    findCountBookedServicebyUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceBooking_1.default.find({ userId }).countDocuments();
        });
    }
    findBookedServicesAndServiceByUserId(userId, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookedServices = yield ServiceBooking_1.default.aggregate([
                    {
                        $match: { userId: userId },
                    },
                    {
                        $lookup: {
                            from: 'services',
                            localField: 'serviceId',
                            foreignField: '_id',
                            as: 'serviceDetails',
                        },
                    },
                    { $unwind: '$serviceDetails' },
                    {
                        $project: {
                            _id: 1,
                            serviceBookedAddress: '$address',
                            serviceStatus: 1,
                            paymentType: 1,
                            serviceName: '$serviceDetails.serviceName',
                            serviceType: '$serviceDetails.serviceType',
                            serviceImage: '$serviceDetails.serviceImage',
                            bookedTime: 1,
                        },
                    },
                    {
                        $sort: { bookedTime: -1 },
                    },
                    {
                        $skip: skip,
                    },
                    {
                        $limit: limit,
                    },
                ]);
                return bookedServices;
            }
            catch (e) {
                console.error('Error fetching booked services:', e);
                throw e;
            }
        });
    }
    findBookedServicesAndServiceByServiceProviderId(ServiceProviderId, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookedServices = yield ServiceBooking_1.default.aggregate([
                    {
                        $match: { serviceProviderId: ServiceProviderId },
                    },
                    {
                        $lookup: {
                            from: 'services',
                            localField: 'serviceId',
                            foreignField: '_id',
                            as: 'serviceDetails',
                        },
                    },
                    {
                        $unwind: '$serviceDetails',
                    },
                    {
                        $project: {
                            _id: 1,
                            serviceBookedAddress: '$address',
                            serviceStatus: 1,
                            paymentType: 1,
                            serviceName: '$serviceDetails.serviceName',
                            serviceType: '$serviceDetails.serviceType',
                            serviceImage: '$serviceDetails.serviceImage',
                            bookedTime: 1,
                        },
                    },
                    {
                        $sort: { bookedTime: -1 },
                    },
                    {
                        $skip: skip,
                    },
                    {
                        $limit: limit,
                    },
                ]);
                return bookedServices;
            }
            catch (e) {
                console.error('Error fetching booked services:', e);
                throw e;
            }
        });
    }
    findCountBookedService(serviceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ServiceBooking_1.default.countDocuments({ serviceProviderId });
            }
            catch (e) {
                console.error('Error counting booked services:', e);
                throw e;
            }
        });
    }
    findBookedServiceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceBooking_1.default.findById(id);
        });
    }
    confirmBooking(id, newStatus, estimatedServiceTime) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceBooking_1.default.findOneAndUpdate({ _id: id }, {
                $set: {
                    serviceStatus: newStatus,
                    estimatedServiceTime: estimatedServiceTime,
                },
            }, { new: true });
        });
    }
    cancelBooking(id, newStatus, cancelReason) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceBooking_1.default.findOneAndUpdate({ _id: id }, {
                $set: {
                    serviceStatus: newStatus,
                    cancelReason: cancelReason,
                },
            }, { new: true });
        });
    }
    requestPayment(id, status, payment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceBooking_1.default.findByIdAndUpdate(id, {
                $set: {
                    serviceStatus: status,
                    paymentStatus: status,
                    payment: payment,
                },
            }, { new: true });
        });
    }
    uploadBills(id, uploadBills) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceBooking_1.default.findByIdAndUpdate(id, {
                $set: {
                    serviceBills: uploadBills,
                },
            }, { new: true });
        });
    }
    getBookedServiceCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield ServiceBooking_1.default.countDocuments();
                return count;
            }
            catch (error) {
                console.error('Error counting booked services:', error);
                throw new Error('Failed to count booked services');
            }
        });
    }
    findPaymentInfoAdmin(skip_1, limit_1, search_1, status_1) {
        return __awaiter(this, arguments, void 0, function* (skip, limit, search, status, statusField = 'serviceStatus') {
            try {
                const matchConditions = [];
                console.log(`${statusField}: ${status} --------------`);
                // Add status filter
                if (status) {
                    matchConditions.push({ [statusField]: status });
                }
                // Add search filter
                if (search === null || search === void 0 ? void 0 : search.trim()) {
                    matchConditions.push({
                        $or: [
                            { 'serviceDetails.serviceName': { $regex: search, $options: 'i' } },
                            { 'userData.userName': { $regex: search, $options: 'i' } },
                            { 'serviceProviderInfo.serviceProviderName': { $regex: search, $options: 'i' } },
                        ],
                    });
                }
                const bookedData = yield ServiceBooking_1.default.aggregate([
                    {
                        $lookup: {
                            from: 'services',
                            localField: 'serviceId',
                            foreignField: '_id',
                            as: 'serviceDetails',
                        },
                    },
                    { $unwind: { path: '$serviceDetails', preserveNullAndEmptyArrays: true } },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'userData',
                        },
                    },
                    { $unwind: { path: '$userData', preserveNullAndEmptyArrays: true } },
                    {
                        $lookup: {
                            from: 'serviceproviders',
                            localField: 'serviceProviderId',
                            foreignField: '_id',
                            as: 'serviceProviderInfo',
                        },
                    },
                    { $unwind: { path: '$serviceProviderInfo', preserveNullAndEmptyArrays: true } },
                    // Apply match if conditions exist
                    ...(matchConditions.length > 0 ? [{ $match: { $and: matchConditions } }] : []),
                    {
                        $project: {
                            _id: 1,
                            serviceBookedAddress: '$address',
                            serviceStatus: 1,
                            paymentType: 1,
                            paymentStatus: 1,
                            payment: 1,
                            serviceBills: 1,
                            estimatedServiceTime: 1,
                            bookedTime: 1,
                            serviceName: '$serviceDetails.serviceName',
                            serviceType: '$serviceDetails.serviceType',
                            serviceImage: '$serviceDetails.serviceImage',
                            userName: '$userData.userName',
                            userEmail: '$userData.email',
                            userPhone: '$userData.phone',
                            userProfile: '$userData.profileImage',
                            serviceProviderName: '$serviceProviderInfo.serviceProviderName',
                            serviceProviderEmail: '$serviceProviderInfo.serviceProviderEmail',
                            profileImage: '$serviceProviderInfo.profileImage',
                        },
                    },
                    { $sort: { bookedTime: -1 } },
                    { $skip: skip },
                    { $limit: limit },
                ]);
                console.log(bookedData, 'bookedData');
                return bookedData;
            }
            catch (error) {
                console.error('Error fetching booked service info:', error);
                throw error;
            }
        });
    }
    findPaymentInfoServiceProvider(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookedData = yield ServiceBooking_1.default.aggregate([
                    {
                        $match: {
                            paymentStatus: 'completed',
                            serviceProviderId: new mongoose_1.Types.ObjectId(id),
                        },
                    },
                    {
                        $lookup: {
                            from: 'services',
                            localField: 'serviceId',
                            foreignField: '_id',
                            as: 'serviceDetails',
                        },
                    },
                    { $unwind: '$serviceDetails' },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'userData',
                        },
                    },
                    { $unwind: '$userData' },
                    {
                        $project: {
                            _id: 1,
                            serviceBookedAddress: '$address',
                            payment: 1,
                            serviceStatus: 1,
                            paymentType: 1,
                            serviceName: '$serviceDetails.serviceName',
                            serviceType: '$serviceDetails.serviceType',
                            serviceImage: '$serviceDetails.serviceImage',
                            userName: '$userData.userName',
                            userEmail: '$userData.email',
                            userPhone: '$userData.phone',
                            userProfile: '$userData.profileImage',
                        },
                    },
                ]);
                return bookedData;
            }
            catch (e) {
                console.error('Error fetching booked service with user and service info:', e);
                throw e;
            }
        });
    }
    updateReviewId(bookingId, reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ServiceBooking_1.default.findOneAndUpdate({ _id: bookingId }, { $set: { reviewId: reviewId } });
        });
    }
    getPaymentInfo(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const match = {
                    serviceStatus: 'completed',
                    paymentStatus: 'completed',
                };
                if (startDate && endDate) {
                    match.bookedTime = {
                        $gte: startDate,
                        $lte: endDate,
                    };
                }
                const result = yield ServiceBooking_1.default.aggregate([
                    { $match: match },
                    {
                        $group: {
                            _id: null,
                            totalRevenue: { $sum: { $ifNull: ['$payment.total', 0] } },
                            totalConvenienceFee: { $sum: { $ifNull: ['$payment.convenienceFee', 0] } },
                            count: { $sum: 1 },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            totalRevenue: 1,
                            totalConvenienceFee: 1,
                            count: 1,
                        },
                    },
                ]);
                return result;
            }
            catch (error) {
                console.error('Error fetching payment info:', error);
                throw error;
            }
        });
    }
    getPaymentInfoServiceProvider(serviceProviderId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const match = {
                    serviceProviderId: new mongodb_1.ObjectId(serviceProviderId),
                    serviceStatus: 'completed',
                    paymentStatus: 'completed',
                };
                if (startDate && endDate) {
                    match.bookedTime = {
                        $gte: startDate,
                        $lte: endDate,
                    };
                }
                const result = yield ServiceBooking_1.default.aggregate([
                    { $match: match },
                    {
                        $group: {
                            _id: null,
                            totalRevenue: { $sum: { $ifNull: ['$payment.total', 0] } },
                            totalConvenienceFee: { $sum: { $ifNull: ['$payment.convenienceFee', 0] } },
                            count: { $sum: 1 },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            totalRevenue: 1,
                            totalConvenienceFee: 1,
                            count: 1,
                        },
                    },
                ]);
                return result;
            }
            catch (error) {
                console.error('Error fetching payment info:', error);
                throw error;
            }
        });
    }
    isServiceTimeConflicting(serviceProviderId, estimatedServiceTime) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(serviceProviderId, 'serviceProviderId');
            console.log(estimatedServiceTime, 'estimatedServiceTime');
            const conflict = yield ServiceBooking_1.default.findOne({
                serviceProviderId,
                estimatedServiceTime,
            });
            console.log(conflict, 'conflict');
            return !!conflict;
        });
    }
    rescheduleBooking(bookingId, newDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceBooking_1.default.findOneAndUpdate({ _id: bookingId }, {
                $set: {
                    estimatedServiceTime: newDate,
                },
            }, { new: true });
        });
    }
    addBookingHistory(bookingId, action, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ServiceBooking_1.default.findByIdAndUpdate(bookingId, {
                $push: {
                    bookingHistory: {
                        action,
                        message,
                        timestamp: new Date(),
                    },
                },
            });
        });
    }
    checkAvailability(serviceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield ServiceBooking_1.default.find({
                    serviceProviderId,
                    serviceStatus: { $in: ['in-progress', 'confirmed'] },
                });
                const now = new Date();
                for (const booking of bookings) {
                    const estimatedTimeString = booking.estimatedServiceTime;
                    if (estimatedTimeString) {
                        const estimatedTime = new Date(estimatedTimeString); // convert from string to Date
                        if (isNaN(estimatedTime.getTime())) {
                            console.warn(`Invalid estimatedServiceTime format: ${estimatedTimeString}`);
                            continue;
                        }
                        if (estimatedTime > now) {
                            return {
                                available: false,
                                reason: `Not available right now — a service is scheduled at ${estimatedTime.toLocaleString()}`,
                            };
                        }
                        const oneHourAfter = new Date(estimatedTime.getTime() + 60 * 60 * 1000);
                        if (now < oneHourAfter) {
                            return {
                                available: false,
                                reason: `Not available right now — a service is scheduled at ${estimatedTime.toLocaleString()}`,
                            };
                        }
                    }
                }
                return { available: true };
            }
            catch (error) {
                console.error('Error fetching availability:', error);
                throw error;
            }
        });
    }
};
exports.ServiceBookingRepository = ServiceBookingRepository;
exports.ServiceBookingRepository = ServiceBookingRepository = __decorate([
    (0, tsyringe_1.injectable)()
], ServiceBookingRepository);
