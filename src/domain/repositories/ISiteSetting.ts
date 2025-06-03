import { IHomeBanner, ITheme, IFooterBanner } from "../entities/ISiteSettings";

export interface ISiteSettingRepository {
  // Fetch all
  findAllHomeBanners(): Promise<IHomeBanner[]>;
  findAllFooterBanners(): Promise<IFooterBanner[]>;
  findAllThemes(): Promise<string[]>;

  // Fetch active
  findActiveHomeBanner(): Promise<IHomeBanner|null>;
  findActiveFooterBanner(): Promise<IFooterBanner|null>;

  // Add
  addHomeBanner(banner: IHomeBanner): Promise<IHomeBanner>;
  addFooterBanner(banner: IFooterBanner): Promise<IFooterBanner>;
  addTheme(theme: ITheme): Promise<string>;

  // Update
  updateHomeBanner(bannerId: string, updateData: Partial<IHomeBanner>): Promise<IHomeBanner>;
  updateFooterBanner(bannerId: string, updateData: Partial<IFooterBanner>): Promise<IFooterBanner>;
  updateTheme(themeName: string, isActive: boolean): Promise<string>;

  // Delete
  deleteHomeBanner(bannerId: string): Promise<void>;
  deleteFooterBanner(bannerId: string): Promise<void>;
  deleteTheme(themeName: string): Promise<void>;

  
  makeHomeBannerActive(bannerId: string): Promise<IHomeBanner>;
  makeHomeBannerInactive(bannerId: string): Promise<IHomeBanner>;

  makeFooterBannerActive(bannerId: string): Promise<IFooterBanner>;
  makeFooterBannerInactive(bannerId: string): Promise<IFooterBanner>;
}
