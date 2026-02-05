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

export interface IAdminSiteSettingsUseCase {
  addHomeBanner(bannerData: AddHomeBannerRequestDTO): Promise<HomeBannerResponseDTO | null>;
  addFooterBanner(bannerData: AddFooterBannerRequestDTO): Promise<FooterBannerResponseDTO | null>;
  addTheme(theme: AddThemeRequestDTO): Promise<string>;
  findAllHomeBanners(): Promise<HomeBannerResponseDTO[]>;
  findAllFooterBanners(): Promise<FooterBannerResponseDTO[]>;
  findAllThemes(): Promise<string[]>; // Or ThemeResponseDTO[] if you want full objects
  findActiveHomeBanners(): Promise<HomeBannerResponseDTO | null>;
  findActiveFooterBanners(): Promise<FooterBannerResponseDTO | null>;
  updateHomeBanner(
    bannerId: string,
    updateData: UpdateHomeBannerRequestDTO,
  ): Promise<HomeBannerResponseDTO | null>;
  updateFooterBanner(
    bannerId: string,
    updateData: UpdateFooterBannerRequestDTO,
  ): Promise<FooterBannerResponseDTO | null>;
  updateTheme(themeName: string, isActive: boolean): Promise<string>;
  deleteHomeBanner(bannerId: string): Promise<void>;
  deleteFooterBanner(bannerId: string): Promise<void>;
  deleteTheme(themeName: string): Promise<void>;
  makeHomeBannerActive(bannerId: string): Promise<HomeBannerResponseDTO | null>;
  makeHomeBannerInactive(bannerId: string): Promise<HomeBannerResponseDTO | null>;
  makeFooterBannerActive(bannerId: string): Promise<FooterBannerResponseDTO | null>;
  makeFooterBannerInactive(bannerId: string): Promise<FooterBannerResponseDTO | null>;
}
