import {
  IHomeBanner,
  ITheme,
  IFooterBanner,
} from "../../../domain/entities/ISiteSettings";

export interface IAdminSiteSettingsUseCase {
  addHomeBanner(bannerData: IHomeBanner): Promise<IHomeBanner | null>;
  addFooterBanner(bannerData: IFooterBanner): Promise<IFooterBanner | null>;
  addTheme(theme: ITheme): Promise<string>;
  findAllHomeBanners(): Promise<IHomeBanner[]>;
  findAllFooterBanners(): Promise<IFooterBanner[]>;
  findAllThemes(): Promise<string[]>;
  findActiveHomeBanners(): Promise<IHomeBanner | null>;
  findActiveFooterBanners(): Promise<IFooterBanner | null>;
  updateHomeBanner(
    bannerId: string,
    updateData: Partial<IHomeBanner>,
  ): Promise<IHomeBanner | null>;
  updateFooterBanner(
    bannerId: string,
    updateData: Partial<IFooterBanner>,
  ): Promise<IFooterBanner | null>;
  updateTheme(themeName: string, isActive: boolean): Promise<string>;
  deleteHomeBanner(bannerId: string): Promise<void>;
  deleteFooterBanner(bannerId: string): Promise<void>;
  deleteTheme(themeName: string): Promise<void>;
  makeHomeBannerActive(bannerId: string): Promise<IHomeBanner | null>;
  makeHomeBannerInactive(bannerId: string): Promise<IHomeBanner | null>;
  makeFooterBannerActive(bannerId: string): Promise<IFooterBanner | null>;
  makeFooterBannerInactive(bannerId: string): Promise<IFooterBanner | null>;
}
