import { injectable, inject } from "tsyringe";
import { IAd } from "../../../domain/entities/IAd";
import { IAdRepository } from "../../../domain/repositories/IAdRepository";
import { IGetProviderAdsUseCase } from "./IGetProviderAdsUseCase";
import {IAdDTO} from "../../../utils/types/dto/IAdDto"
@injectable()
export class GetProviderAdsUseCase implements IGetProviderAdsUseCase {
  constructor(
    @inject("IAdRepository") private adRepository: IAdRepository
  ) {}

  async execute(providerId: string): Promise<IAdDTO[]> {
    console.log("😍😍😍😍😍😍😍😍😍😍😍")
    console.log(providerId)
    return await this.adRepository.getAdsByProvider(providerId);
  }
}
