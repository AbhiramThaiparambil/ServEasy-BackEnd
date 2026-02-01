import { inject, injectable } from "tsyringe";
import { ISiteSettingRepository } from "../../../domain/repositories/ISiteSetting";
import { REPOSITORY_TOKENS } from "../../../constants/tokens";
import { IUserSiteSettings } from "./IUserSiteSettings";
@injectable()
export class UserSiteSettings implements IUserSiteSettings {
  constructor(
    @inject(REPOSITORY_TOKENS.SiteSettingRepository)
    private siteSetting: ISiteSettingRepository,
  ) {}
    async getThemes():Promise<string[]|[]>{
      return await this.siteSetting.findAllThemes()
    
      
       
    }

   async getBanners() {
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