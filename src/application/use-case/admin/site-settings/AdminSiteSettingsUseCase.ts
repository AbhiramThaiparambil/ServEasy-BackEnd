import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS, SERVICE_TOKENS } from "../../../../constants/tokens";
import { ISiteSettingRepository } from "../../../../domain/repositories/ISiteSetting";
import { ICloudinaryService } from "../../../../services/cloudinary/ICloudinaryService";
import { IFooterBanner, IHomeBanner, ITheme } from "../../../../domain/entities/ISiteSettings";
import { IAdminSiteSettingsUseCase } from "./IAdminSiteSettings.usecase";
import {
  AddFooterBannerRequestDTO,
  FooterBannerResponseDTO,
  UpdateFooterBannerRequestDTO,
} from "../../../dtos/admin/site-settings/FooterBannerDTO";
import {
  AddHomeBannerRequestDTO,
  HomeBannerResponseDTO,
  UpdateHomeBannerRequestDTO,
} from "../../../dtos/admin/site-settings/HomeBannerDTO";
import { AddThemeRequestDTO } from "../../../dtos/admin/site-settings/ThemeDTO";


@injectable()
export class AdminSiteSettingsUseCase implements IAdminSiteSettingsUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.SiteSettingRepository)
    private siteSettingRepository: ISiteSettingRepository,
    @inject(SERVICE_TOKENS.CloudinaryService)
    private cloudinaryService: ICloudinaryService
  ) {}

  addHomeBanner = async (bannerData: AddHomeBannerRequestDTO): Promise<HomeBannerResponseDTO | null> => {
    if (!bannerData.image) {
      throw new Error("Image is required for home banner");
    }
    const imageUrl = await this.cloudinaryService.uploadHomeBanner(bannerData.image);

    const bannerEntity: IHomeBanner = {
      image: bannerData.image,
      imageUrl: imageUrl,
      title: bannerData.title,
      subtitle: bannerData.subtitle,
      isActive: true, 
    };

    const result = await this.siteSettingRepository.addHomeBanner(bannerEntity);
    return result as unknown as HomeBannerResponseDTO;
  };

  addFooterBanner = async (bannerData: AddFooterBannerRequestDTO): Promise<FooterBannerResponseDTO | null> => {
    if (!bannerData.image) {
      throw new Error("Image is required for footer banner");
    }
    const imageUrl = await this.cloudinaryService.uploadFooterBanner(bannerData.image);

    const bannerEntity: IFooterBanner = {
      image: bannerData.image,
      imageUrl: imageUrl,
      title: bannerData.title,
      subtitle: bannerData.subtitle,
      isActive: true, 
    };

    const result = await this.siteSettingRepository.addFooterBanner(bannerEntity);
    return result as unknown as FooterBannerResponseDTO;
  };

  addTheme = async (theme: AddThemeRequestDTO): Promise<string> => {
     const themeEntity: ITheme = {
        name: theme.name,
        isActive: theme.isActive ?? false
     }
    return this.siteSettingRepository.addTheme(themeEntity);
  };

  findAllHomeBanners = async (): Promise<HomeBannerResponseDTO[]> => {
    const result = await this.siteSettingRepository.findAllHomeBanners();
    return result as unknown as HomeBannerResponseDTO[];
  };

  findAllFooterBanners = async (): Promise<FooterBannerResponseDTO[]> => {
    const result = await this.siteSettingRepository.findAllFooterBanners();
    return result as unknown as FooterBannerResponseDTO[];
  };

  findAllThemes = async (): Promise<string[]> => {
    return this.siteSettingRepository.findAllThemes();
  };

  findActiveHomeBanners = async (): Promise<HomeBannerResponseDTO | null> => {
    const result = await this.siteSettingRepository.findActiveHomeBanner();
    return result as unknown as HomeBannerResponseDTO;
  };

  findActiveFooterBanners = async (): Promise<FooterBannerResponseDTO | null> => {
     const result = await this.siteSettingRepository.findActiveFooterBanner();
     return result as unknown as FooterBannerResponseDTO;
  };

  updateHomeBanner = async (
    bannerId: string,
    updateData: UpdateHomeBannerRequestDTO
  ): Promise<HomeBannerResponseDTO | null> => {
    const entityUpdate: Partial<IHomeBanner> = {
        ...updateData
    }
    const result = await this.siteSettingRepository.updateHomeBanner(bannerId, entityUpdate);
    return result as unknown as HomeBannerResponseDTO;
  };

  updateFooterBanner = async (
    bannerId: string,
    updateData: UpdateFooterBannerRequestDTO
  ): Promise<FooterBannerResponseDTO | null> => {
      const entityUpdate: Partial<IFooterBanner> = {
        ...updateData
    }
    return (await this.siteSettingRepository.updateFooterBanner(bannerId, entityUpdate)) as unknown as FooterBannerResponseDTO;
  };

  updateTheme = async (themeName: string, isActive: boolean): Promise<string> => {
    return this.siteSettingRepository.updateTheme(themeName, isActive);
  };

  deleteHomeBanner = async (bannerId: string): Promise<void> => {
    return this.siteSettingRepository.deleteHomeBanner(bannerId);
  };

  deleteFooterBanner = async (bannerId: string): Promise<void> => {
    return this.siteSettingRepository.deleteFooterBanner(bannerId);
  };

  deleteTheme = async (themeName: string): Promise<void> => {
    return this.siteSettingRepository.deleteTheme(themeName);
  };

  makeHomeBannerActive = async (bannerId: string): Promise<HomeBannerResponseDTO | null> => {
    const activeHomeBanner =
      await this.siteSettingRepository.findActiveHomeBanner();
    if (activeHomeBanner) {
      await this.siteSettingRepository.makeHomeBannerInactive(
        activeHomeBanner?.id + ""
      );
    }

    const result = await this.siteSettingRepository.makeHomeBannerActive(bannerId);
    return result as unknown as HomeBannerResponseDTO;
  };

  makeHomeBannerInactive = async (bannerId: string): Promise<HomeBannerResponseDTO | null> => {
    const result = await this.siteSettingRepository.makeHomeBannerInactive(bannerId);
     return result as unknown as HomeBannerResponseDTO;
  };

  makeFooterBannerActive = async (bannerId: string): Promise<FooterBannerResponseDTO | null> => {
    const activeFooterBanner =
      await this.siteSettingRepository.findActiveFooterBanner();
    if (activeFooterBanner) {
      await this.siteSettingRepository.makeFooterBannerInactive(
        activeFooterBanner.id + ""
      );
    }

    const result = await this.siteSettingRepository.makeFooterBannerActive(bannerId);
     return result as unknown as FooterBannerResponseDTO;
  };

  makeFooterBannerInactive = async (bannerId: string): Promise<FooterBannerResponseDTO | null> => {
    const result = await this.siteSettingRepository.makeFooterBannerInactive(bannerId);
     return result as unknown as FooterBannerResponseDTO;
  };
}
