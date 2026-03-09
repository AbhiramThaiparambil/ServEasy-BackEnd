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
exports.GetBookedServiceByIdUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../../../constants/tokens");
let GetBookedServiceByIdUseCase = class GetBookedServiceByIdUseCase {
    constructor(serviceRepository, serviceBookingRepository, serviceProviderRepository, reviewRepository, userRepository) {
        this.serviceRepository = serviceRepository;
        this.serviceBookingRepository = serviceBookingRepository;
        this.serviceProviderRepository = serviceProviderRepository;
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
    }
    getBookedServiceOrThrow(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookedService = yield this.serviceBookingRepository.findBookedServiceById(bookingId);
            if (!bookedService) {
                throw new Error("Booked service not found");
            }
            return bookedService;
        });
    }
    getForUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            const { bookingId } = data;
            const bookedService = yield this.getBookedServiceOrThrow(bookingId);
            const [serviceProvider, service, review] = yield Promise.all([
                this.serviceProviderRepository.findById(bookedService.serviceProviderId),
                this.serviceRepository.findById(bookedService.serviceId),
                this.reviewRepository.findByBookingId(bookingId),
            ]);
            if (!serviceProvider) {
                throw new Error("Service provider not found");
            }
            if (!service) {
                throw new Error("Service not found");
            }
            const bookedServiceForUser = Object.assign({ bookedService: Object.assign(Object.assign(Object.assign({ _id: bookedService._id + "", userId: bookedService.userId.toString(), serviceId: bookedService.serviceId.toString(), serviceProviderId: bookedService.serviceProviderId.toString(), bookedTime: bookedService.bookedTime + "", estimatedServiceTime: bookedService.estimatedServiceTime + "", serviceStatus: bookedService.serviceStatus + "", paymentStatus: bookedService.paymentStatus + "", paymentType: bookedService.paymentType + "", serviceSlot: bookedService.serviceSlot &&
                        bookedService.serviceSlot.date &&
                        bookedService.serviceSlot.startTime &&
                        bookedService.serviceSlot.endTime
                        ? {
                            date: bookedService.serviceSlot.date + "",
                            startTime: bookedService.serviceSlot.startTime + "",
                            endTime: bookedService.serviceSlot.endTime + "",
                        }
                        : undefined, address: {
                        name: ((_a = bookedService === null || bookedService === void 0 ? void 0 : bookedService.address) === null || _a === void 0 ? void 0 : _a.name) || "",
                        houseName: ((_b = bookedService === null || bookedService === void 0 ? void 0 : bookedService.address) === null || _b === void 0 ? void 0 : _b.houseName) || "",
                        pincode: ((_c = bookedService === null || bookedService === void 0 ? void 0 : bookedService.address) === null || _c === void 0 ? void 0 : _c.pincode) || "",
                        state: ((_d = bookedService === null || bookedService === void 0 ? void 0 : bookedService.address) === null || _d === void 0 ? void 0 : _d.state) || "",
                        phone: ((_e = bookedService === null || bookedService === void 0 ? void 0 : bookedService.address) === null || _e === void 0 ? void 0 : _e.phone) || "",
                    }, createdAt: bookedService.createdAt + "", updatedAt: bookedService.updatedAt + "", serviceBills: (bookedService === null || bookedService === void 0 ? void 0 : bookedService.serviceBills) || [], preferredSlot: {
                        date: ((_f = bookedService === null || bookedService === void 0 ? void 0 : bookedService.preferredSlot) === null || _f === void 0 ? void 0 : _f.date) + "" || "",
                        time: ((_g = bookedService === null || bookedService === void 0 ? void 0 : bookedService.preferredSlot) === null || _g === void 0 ? void 0 : _g.time) || "",
                    }, bookingHistory: bookedService.bookingHistory || [] }, (bookedService.cancelReason && {
                    cancelReason: bookedService.cancelReason,
                })), (bookedService.payment && {
                    payment: {
                        serviceCost: bookedService.payment.serviceCost,
                        materialCost: bookedService.payment.materialCost || 0,
                        travelCost: bookedService.payment.travelCost,
                        inspectionCost: bookedService.payment.inspectionCost,
                        convenienceFee: bookedService.payment.convenienceFee,
                        total: bookedService.payment.total,
                        discountAmount: bookedService.payment.discountAmount,
                        finalTotal: bookedService.payment.finalTotal,
                    },
                })), (bookedService.coupon && {
                    coupon: {
                        _id: (_h = bookedService.coupon._id) === null || _h === void 0 ? void 0 : _h.toString(),
                        code: bookedService.coupon.code,
                        discountAmount: bookedService.coupon.discountAmount,
                        appliedAt: bookedService.coupon.appliedAt,
                    },
                })), serviceProvider: {
                    _id: serviceProvider._id + "",
                    serviceProviderName: serviceProvider.serviceProviderName,
                    serviceProviderEmail: serviceProvider.serviceProviderEmail,
                    serviceProviderPhone: serviceProvider.serviceProviderPhone,
                    profileImage: serviceProvider.profileImage || "",
                    description: serviceProvider.description || "",
                    experience: serviceProvider.experience,
                    services: serviceProvider.services,
                    location: serviceProvider.location,
                    isVerified: serviceProvider.isVerified || "",
                    isBlocked: serviceProvider.isBlocked,
                    userId: serviceProvider.userId.toString(),
                }, service: {
                    _id: service._id + "",
                    serviceName: service.serviceName,
                    category: service.category + "",
                    description: service.description,
                    estimatedPrice: service.estimatedPrice,
                    serviceImage: service.serviceImage,
                    serviceType: service.serviceType,
                    serviceProviderId: service.serviceProviderId.toString(),
                    isActive: (_j = service.isActive) !== null && _j !== void 0 ? _j : true,
                    createdAt: service.createdAt + "",
                    updatedAt: service.updatedAt + "",
                } }, (review && {
                review: {
                    comment: review.comment,
                    rating: review.rating,
                    _id: review._id + "",
                    userId: review.userId.toString(),
                    serviceId: review.serviceId.toString(),
                    bookingId: review.bookingId.toString(),
                },
            }));
            return bookedServiceForUser;
        });
    }
    getForServiceProvider(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            const { bookingId } = data;
            const bookedService = yield this.getBookedServiceOrThrow(bookingId);
            const [serviceProvider, service, user, review] = yield Promise.all([
                this.serviceProviderRepository.findById(bookedService.serviceProviderId),
                this.serviceRepository.findById(bookedService.serviceId),
                this.userRepository.findById(bookedService.userId.toString()),
                this.reviewRepository.findByBookingId(bookingId),
            ]);
            if (!serviceProvider) {
                throw new Error("Service provider not found");
            }
            if (!service) {
                throw new Error("Service not found");
            }
            if (!user) {
                throw new Error("User not found");
            }
            const response = Object.assign({ bookedService: Object.assign(Object.assign({ _id: bookedService._id + "", userId: bookedService.userId + "", serviceId: bookedService.serviceId + "", serviceProviderId: bookedService.serviceProviderId + "", bookedTime: bookedService.bookedTime + "", estimatedServiceTime: bookedService.estimatedServiceTime + "", serviceStatus: bookedService.serviceStatus + "", paymentStatus: bookedService.paymentStatus + "", paymentType: bookedService.paymentType + "", serviceSlot: bookedService.serviceSlot &&
                        bookedService.serviceSlot.date &&
                        bookedService.serviceSlot.startTime &&
                        bookedService.serviceSlot.endTime
                        ? {
                            date: bookedService.serviceSlot.date + "",
                            startTime: bookedService.serviceSlot.startTime + "",
                            endTime: bookedService.serviceSlot.endTime + "",
                        }
                        : undefined, serviceBills: bookedService.serviceBills || [], createdAt: bookedService.createdAt + "", updatedAt: bookedService.updatedAt + "", address: {
                        name: ((_a = bookedService === null || bookedService === void 0 ? void 0 : bookedService.address) === null || _a === void 0 ? void 0 : _a.name) || "",
                        houseName: ((_b = bookedService === null || bookedService === void 0 ? void 0 : bookedService.address) === null || _b === void 0 ? void 0 : _b.houseName) || "",
                        pincode: ((_c = bookedService === null || bookedService === void 0 ? void 0 : bookedService.address) === null || _c === void 0 ? void 0 : _c.pincode) || "",
                        state: ((_d = bookedService === null || bookedService === void 0 ? void 0 : bookedService.address) === null || _d === void 0 ? void 0 : _d.state) || "",
                        phone: ((_e = bookedService === null || bookedService === void 0 ? void 0 : bookedService.address) === null || _e === void 0 ? void 0 : _e.phone) || "",
                    }, preferredSlot: {
                        date: ((_f = bookedService === null || bookedService === void 0 ? void 0 : bookedService.preferredSlot) === null || _f === void 0 ? void 0 : _f.date) + "" || "",
                        time: ((_g = bookedService === null || bookedService === void 0 ? void 0 : bookedService.preferredSlot) === null || _g === void 0 ? void 0 : _g.time) || "",
                    }, liveLocation: {
                        lat: ((_h = bookedService.liveLocation) === null || _h === void 0 ? void 0 : _h.lat) || 0,
                        lng: ((_j = bookedService.liveLocation) === null || _j === void 0 ? void 0 : _j.lng) || 0,
                    } }, (bookedService.payment && {
                    payment: {
                        serviceCost: bookedService.payment.serviceCost,
                        materialCost: bookedService.payment.materialCost,
                        travelCost: bookedService.payment.travelCost,
                        inspectionCost: bookedService.payment.inspectionCost,
                        convenienceFee: bookedService.payment.convenienceFee,
                        total: bookedService.payment.total,
                        discountAmount: bookedService.payment.discountAmount,
                        finalTotal: bookedService.payment.finalTotal,
                    },
                })), (bookedService.cancelReason && {
                    cancelReason: bookedService.cancelReason + "",
                })), service: {
                    _id: service._id + "",
                    serviceName: service.serviceName,
                    category: service.category + "",
                    description: service.description,
                    estimatedPrice: service.estimatedPrice,
                    serviceImage: service.serviceImage,
                    serviceType: service.serviceType,
                    serviceProviderId: service.serviceProviderId.toString(),
                    isActive: (_k = service.isActive) !== null && _k !== void 0 ? _k : true,
                    createdAt: service.createdAt + "",
                    updatedAt: service.updatedAt + "",
                }, user: {
                    _id: user._id + "",
                    userName: user.userName,
                    profileImage: user.profileImage || "",
                    email: user.email || "",
                    phone: user.phone || "",
                } }, (review && {
                review: {
                    _id: review._id + "",
                    userId: review.userId + "",
                    serviceId: review.serviceId + "",
                    bookingId: review.bookingId + "",
                    rating: review.rating,
                    comment: review.comment,
                },
            }));
            return response;
        });
    }
};
exports.GetBookedServiceByIdUseCase = GetBookedServiceByIdUseCase;
exports.GetBookedServiceByIdUseCase = GetBookedServiceByIdUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceRepository)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceBookingRepository)),
    __param(2, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ServiceProviderRepository)),
    __param(3, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.ReviewRepository)),
    __param(4, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.UserRepository)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], GetBookedServiceByIdUseCase);
