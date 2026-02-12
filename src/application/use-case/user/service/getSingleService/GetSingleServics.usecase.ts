import { Types } from "mongoose";
import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IServiceRepository } from "../../../../../domain/repositories/IServiceRepository";
import { IReviewRepository } from "../../../../../domain/repositories/IReviewRepository";
import { IGetSingleServiceUseCase } from "./IGetSingleServics.usecase";
import {
  GetSingleServiceRequestDTO,
  GetSingleServiceResponseDTO,
} from "../../../../../application/dtos/user/service/getSingleService/GetSingleServiceDTO";

@injectable()
export class GetSingleServiceUseCase implements IGetSingleServiceUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository)
    private serviceRepository: IServiceRepository,

    @inject(REPOSITORY_TOKENS.ReviewRepository)
    private reviewRepository: IReviewRepository,
  ) {}

  async execute(data: GetSingleServiceRequestDTO): Promise<GetSingleServiceResponseDTO> {
    const { serviceId } = data;
    try {
      const service =
        await this.serviceRepository.getSingleServiceWithProviderDetails(
          serviceId,
        );

      if (!service) {
        return { service: [], reviews: [] };
      }

      const reviews = await this.reviewRepository.findReviews(
        new Types.ObjectId(serviceId),
      );

      return { service, reviews };
    } catch (error) {
      console.error("Error fetching single service:", error);
      throw new Error("Failed to fetch service details");
    }
  }
}
