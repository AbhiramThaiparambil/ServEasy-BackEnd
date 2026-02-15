import { injectable, inject } from "tsyringe";

import { IServiceRepository } from "../../../../../domain/repositories/IServiceRepository";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";
import { IReviewRepository } from "../../../../../domain/repositories/IReviewRepository";
import { IUserRepository } from "../../../../../domain/repositories/IuserRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IGetBookedServiceByIdUseCase } from "./IGetBookedServiceById.usecase";

import { GetBookedServiceByIdForServiceProviderResponseDTO, GetBookedServiceByIdForUserResponseDTO, GetBookedServiceByIdRequestDTO } from "../../../../../application/dtos/common/booking/fetchByid/GetBookedServiceByIdDTO";

@injectable()
export class GetBookedServiceByIdUseCase
  implements IGetBookedServiceByIdUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository)
    private serviceRepository: IServiceRepository,

    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBookingRepository: IServiceBookingRepository,

    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProviderRepository: IServiceProviderRepository,

    @inject(REPOSITORY_TOKENS.ReviewRepository)
    private reviewRepository: IReviewRepository,

    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository
  ) {}

  private async getBookedServiceOrThrow(bookingId: string) {
    const bookedService =
      await this.serviceBookingRepository.findBookedServiceById(bookingId);

    if (!bookedService) {
      throw new Error("Booked service not found");
    }

    return bookedService;
  }

  async getForUser(data: GetBookedServiceByIdRequestDTO): Promise<GetBookedServiceByIdForUserResponseDTO> {
    const { bookingId } = data;

    const bookedService = await this.getBookedServiceOrThrow(bookingId);

    const [serviceProvider, service, review] = await Promise.all([
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

    const bookedServiceForUser: GetBookedServiceByIdForUserResponseDTO = {
      bookedService: {
        _id: bookedService._id + "",
        userId: bookedService.userId.toString(),
        serviceId: bookedService.serviceId.toString(),
        serviceProviderId: bookedService.serviceProviderId.toString(),

        bookedTime: bookedService.bookedTime + "",
        estimatedServiceTime: bookedService.estimatedServiceTime + "",

        serviceStatus: bookedService.serviceStatus + "",
        paymentStatus: bookedService.paymentStatus + "",
        paymentType: bookedService.paymentType + "",

        address: {
          name: bookedService?.address?.name || "",
          houseName: bookedService?.address?.houseName || "",
          pincode: bookedService?.address?.pincode || "",
          state: bookedService?.address?.state || "",
          phone: bookedService?.address?.phone || "",
        },

        createdAt: bookedService.createdAt + "",
        updatedAt: bookedService.updatedAt + "",

        serviceBills: bookedService?.serviceBills || [],

        preferredSlot: {
          date: bookedService?.preferredSlot?.date + "" || "",
          time: bookedService?.preferredSlot?.time || "",
        },

        bookingHistory: bookedService.bookingHistory || [],

        ...(bookedService.cancelReason && {
          cancelReason: bookedService.cancelReason,
        }),

        ...(bookedService.payment && {
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
        }),

        ...(bookedService.coupon && {
          coupon: {
            _id: bookedService.coupon._id?.toString(),
            code: bookedService.coupon.code,
            discountAmount: bookedService.coupon.discountAmount,
            appliedAt: bookedService.coupon.appliedAt,
          },
        }),
      },

      serviceProvider: {
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
      },

      service: {
        _id: service._id + "",
        serviceName: service.serviceName,
        category: service.category + "",
        description: service.description,
        estimatedPrice: service.estimatedPrice,
        serviceImage: service.serviceImage,
        serviceType: service.serviceType,
        serviceProviderId: service.serviceProviderId.toString(),
        isActive: service.isActive ?? true,

        createdAt: service.createdAt + "",
        updatedAt: service.updatedAt + "",
      },

      ...(review && {
        review: {
          comment: review.comment,
          rating: review.rating,
          _id: review._id + "",
          userId: review.userId.toString(),
          serviceId: review.serviceId.toString(),
          bookingId: review.bookingId.toString(),
        },
      }),
    };

    return bookedServiceForUser;
  }

  async getForServiceProvider(
    data: GetBookedServiceByIdRequestDTO
  ): Promise<GetBookedServiceByIdForServiceProviderResponseDTO> {
    const { bookingId } = data;

    const bookedService = await this.getBookedServiceOrThrow(bookingId);

    const [serviceProvider, service, user, review] = await Promise.all([
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

    const response: GetBookedServiceByIdForServiceProviderResponseDTO = {
      bookedService: {
        _id: bookedService._id + "",
        userId: bookedService.userId + "",
        serviceId: bookedService.serviceId + "",
        serviceProviderId: bookedService.serviceProviderId + "",

        bookedTime: bookedService.bookedTime + "",
        estimatedServiceTime: bookedService.estimatedServiceTime + "",

        serviceStatus: bookedService.serviceStatus + "",
        paymentStatus: bookedService.paymentStatus + "",
        paymentType: bookedService.paymentType + "",

        serviceBills: bookedService.serviceBills || [],

        createdAt: bookedService.createdAt + "",
        updatedAt: bookedService.updatedAt + "",
        address: {
          name: bookedService?.address?.name || "",
          houseName: bookedService?.address?.houseName || "",
          pincode: bookedService?.address?.pincode || "",
          state: bookedService?.address?.state || "",
          phone: bookedService?.address?.phone || "",
        },

        preferredSlot: {
          date: bookedService?.preferredSlot?.date + "" || "",
          time: bookedService?.preferredSlot?.time || "",
        },

        liveLocation: {
          lat: bookedService.liveLocation?.lat || 0,
          lng: bookedService.liveLocation?.lng || 0,
        },

        ...(bookedService.payment && {
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
        }),

        ...(bookedService.cancelReason && {
          cancelReason: bookedService.cancelReason + "",
        }),
      },

      service: {
        _id: service._id + "",
        serviceName: service.serviceName,
        category: service.category + "",
        description: service.description,
        estimatedPrice: service.estimatedPrice,
        serviceImage: service.serviceImage,
        serviceType: service.serviceType,
        serviceProviderId: service.serviceProviderId.toString(),
        isActive: service.isActive ?? true,

        createdAt: service.createdAt + "",
        updatedAt: service.updatedAt + "",
      },

      user: {
        _id: user._id + "",
        userName: user.userName,
        profileImage: user.profileImage || "",
        email: user.email || "",
        phone: user.phone || "",
      },

      ...(review && {
        review: {
          _id: review._id + "",
          userId: review.userId + "",
          serviceId: review.serviceId + "",
          bookingId: review.bookingId + "",
          rating: review.rating,
          comment: review.comment,
        },
      }),
    };

    return response;
  }
}
