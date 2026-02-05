import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { IUserSiteSettings } from "./IUserSiteSettings";
import { ISiteSettingRepository } from "../../../../domain/repositories/ISiteSetting";
import { GetBannersResponseDTO, GetThemesResponseDTO } from "../../../dtos/user/site-settings/SiteSettingsDTO";

@injectable()
export class UserSiteSettings implements IUserSiteSettings {
  constructor(
    @inject(REPOSITORY_TOKENS.SiteSettingRepository)
    private siteSetting: ISiteSettingRepository,
  ) {}
    async getThemes(): Promise<GetThemesResponseDTO> {
      const themes = await this.siteSetting.findAllThemes();
      return { themes };
    }

   async getBanners(): Promise<GetBannersResponseDTO> {
  const [activeFooterBanner, activeHomeBanner] = await Promise.all([
    this.siteSetting.findActiveFooterBanner(),
    this.siteSetting.findActiveHomeBanner()
  ]);

  return {
    homeBanner: activeHomeBanner || null,
    footerBanner: activeFooterBanner || null
  };
}
}