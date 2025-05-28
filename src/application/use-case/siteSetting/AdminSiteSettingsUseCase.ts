import { inject, injectable } from "tsyringe";
import { ISiteSettingRepository } from "../../../domain/repositories/ISiteSetting";
import { IHomeBanner, ITheme, IFooterBanner } from "../../../domain/entities/ISiteSettings";
import { CloudinaryService } from "../../../services/cloudinary/cloudinary";
@injectable()
export class AdminSiteSettingsUseCase {
  constructor(@inject("SiteSettingRepository") private siteSettingRepository: ISiteSettingRepository,@inject("CloudinaryService") private cloudinaryService: CloudinaryService) {}

  addHomeBanner = async (bannerData: IHomeBanner) => {
    if(!bannerData.image) {
      throw new Error("Image is required for home banner");
    }
     bannerData.imageUrl = await this.cloudinaryService.uploadHomeBanner(bannerData.image);
      console.log(bannerData);
      
    return this.siteSettingRepository.addHomeBanner(bannerData);
  };



  addFooterBanner = async (bannerData: IFooterBanner) => {
    console.log(bannerData);
    
    if(!bannerData.image) {
      throw new Error("Image is required for footer banner");
    }
    bannerData.imageUrl = await this.cloudinaryService.uploadFooterBanner(bannerData.image);
    console.log(bannerData)
    return this.siteSettingRepository.addFooterBanner(bannerData);
  };

  addTheme = async (theme: ITheme) => {
    return this.siteSettingRepository.addTheme(theme);
  };

  findAllHomeBanners = async () => {
    return this.siteSettingRepository.findAllHomeBanners();
  };

  findAllFooterBanners = async () => {
    return this.siteSettingRepository.findAllFooterBanners();
  };

  findAllThemes = async () => {
    return this.siteSettingRepository.findAllThemes();
  };

  findActiveTheme = async () => {
    return this.siteSettingRepository.findActiveTheme();
  };

  findActiveHomeBanners = async () => {
    return this.siteSettingRepository.findActiveHomeBanners();
  };

  findActiveFooterBanners = async () => {
    return this.siteSettingRepository.findActiveFooterBanners();
  };

  updateHomeBanner = async (bannerId: string, updateData: Partial<IHomeBanner>) => {
    return this.siteSettingRepository.updateHomeBanner(bannerId, updateData);
  };

  updateFooterBanner = async (bannerId: string, updateData: Partial<IFooterBanner>) => {
    return this.siteSettingRepository.updateFooterBanner(bannerId, updateData);
  };

  updateTheme = async (themeName: string, isActive: boolean) => {
    return this.siteSettingRepository.updateTheme(themeName, isActive);
  };

  deleteHomeBanner = async (bannerId: string) => {
    return this.siteSettingRepository.deleteHomeBanner(bannerId);
  };

  deleteFooterBanner = async (bannerId: string) => {
    return this.siteSettingRepository.deleteFooterBanner(bannerId);
  };

  deleteTheme = async (themeName: string) => {
    return this.siteSettingRepository.deleteTheme(themeName);
  };

  makeThemeActive = async (themeName: string) => {
    return this.siteSettingRepository.makeThemeActive(themeName);
  };

  makeThemeInactive = async (themeName: string) => {
    return this.siteSettingRepository.makeThemeInactive(themeName);
  };

  makeHomeBannerActive = async (bannerId: string) => {
    return this.siteSettingRepository.makeHomeBannerActive(bannerId);
  };

  makeHomeBannerInactive = async (bannerId: string) => {
    return this.siteSettingRepository.makeHomeBannerInactive(bannerId);
  };

  makeFooterBannerActive = async (bannerId: string) => {
    return this.siteSettingRepository.makeFooterBannerActive(bannerId);
  };

  makeFooterBannerInactive = async (bannerId: string) => {
    return this.siteSettingRepository.makeFooterBannerInactive(bannerId);
  };
}

