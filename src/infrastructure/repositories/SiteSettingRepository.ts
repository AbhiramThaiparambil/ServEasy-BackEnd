import { injectable } from "tsyringe";
import { IHomeBanner, ITheme,IFooterBanner} from "../../domain/entities/ISiteSettings";
import { ISiteSettingRepository } from "../../domain/repositories/ISiteSetting";
import { SiteSettingsModel } from "../models/siteSettingsModel";

@injectable()
export class SiteSettingRepository implements ISiteSettingRepository {
 private async getSettings() {
  let settings = await SiteSettingsModel.findOne();
  if (!settings) {
    settings = new SiteSettingsModel({ homeBanners: [], footerBanners: [], themes: [] });
    await settings.save();
  }
  return settings;
}

  async findAllHomeBanners(): Promise<IHomeBanner[]> {
    return (await this.getSettings()).homeBanners;
  }

  async findAllFooterBanners(): Promise<IFooterBanner[]> {
    return (await this.getSettings()).footerBanners;
  }
  async findAllThemes(): Promise<string[]> {
    return (await this.getSettings()).themes.map(t => t.name);
  }

  

  async findActiveHomeBanner(): Promise<IHomeBanner> {
      const homeBanner= (await this.getSettings()).homeBanners.filter(b => b.isActive);
  return homeBanner[0]
    }

  async findActiveFooterBanner(): Promise<IFooterBanner> {
     const footerBanner= (await this.getSettings()).footerBanners.filter(b => b.isActive);
  return footerBanner[0]
    }

  async updateHomeBanner(bannerId: string, updateData: Partial<IHomeBanner>): Promise<IHomeBanner> {
    const settings = await this.getSettings();
    const banner = settings.homeBanners.find(b => b.id === bannerId);
    if (!banner) throw new Error("Home banner not found");
    Object.assign(banner, updateData);
    await settings.save();
    return banner;
  }

  async updateFooterBanner(bannerId: string, updateData: Partial<IFooterBanner>): Promise<IFooterBanner> {
    const settings = await this.getSettings();
    const banner = settings.footerBanners.find(b => b.id === bannerId);
    if (!banner) throw new Error("Footer banner not found");
    Object.assign(banner, updateData);
    await settings.save();
    return banner;
  }

  async updateTheme(themeName: string, isActive: boolean): Promise<string> {
    const settings = await this.getSettings();
    const theme = settings.themes.find(t => t.name === themeName);
    if (!theme) throw new Error("Theme not found");
    theme.isActive = isActive;
    await settings.save();
    return theme.name;
  }

  async deleteHomeBanner(bannerId: string): Promise<void> {
    const settings = await this.getSettings();
    settings.homeBanners = settings.homeBanners.filter(b => b.id !== bannerId);
    await settings.save();
  }

  async deleteFooterBanner(bannerId: string): Promise<void> {
    const settings = await this.getSettings();
    settings.footerBanners = settings.footerBanners.filter(b => b.id !== bannerId);
    await settings.save();
  }

  async deleteTheme(themeName: string): Promise<void> {
    const settings = await this.getSettings();
    settings.themes = settings.themes.filter(t => t.name !== themeName);
    await settings.save();
  }

  async addHomeBanner(banner: IHomeBanner): Promise<IHomeBanner> {
    const settings = await this.getSettings();
    settings.homeBanners.push(banner);
    await settings.save();
    return banner;
  }

  async addTheme(theme: ITheme): Promise<string> {
    const settings = await this.getSettings();
    settings.themes.push(theme);
    await settings.save();
    return theme.name;
  }


  async makeHomeBannerActive(bannerId: string): Promise<IHomeBanner> {
    const settings = await this.getSettings();
    const banner = settings.homeBanners.find(b => b.id === bannerId);
    if (!banner) throw new Error("Home banner not found");
    banner.isActive = true;
    await settings.save();
    return banner;
  }

  async makeHomeBannerInactive(bannerId: string): Promise<IHomeBanner> {
    const settings = await this.getSettings();
    const banner = settings.homeBanners.find(b => b.id === bannerId);
    if (!banner) throw new Error("Home banner not found");
    banner.isActive = false;
    await settings.save();
    return banner;
  }

  async makeFooterBannerActive(bannerId: string): Promise<IFooterBanner> {
    const settings = await this.getSettings();
    const banner = settings.footerBanners.find(b => b.id === bannerId);
    if (!banner) throw new Error("Footer banner not found");
    banner.isActive = true;
    await settings.save();
    return banner;
  }

  async makeFooterBannerInactive(bannerId: string): Promise<IFooterBanner> {
    const settings = await this.getSettings();
    const banner = settings.footerBanners.find(b => b.id === bannerId);
    if (!banner) throw new Error("Footer banner not found");
    banner.isActive = false;
    await settings.save();
    return banner;
  }

  async addFooterBanner(banner: IFooterBanner): Promise<IFooterBanner> {
  const settings = await this.getSettings();
  settings.footerBanners.push(banner);
  await settings.save();
  return banner;
}

}
