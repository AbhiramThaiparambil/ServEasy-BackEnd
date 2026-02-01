import { inject, injectable } from "tsyringe";
import { SiteSettingRepository } from "../../../infrastructure/repositories/SiteSettingRepository";
import { REPOSITORY_TOKENS } from "../../../constants/tokens";
@injectable()
export class UserSiteSettings{
 constructor(@inject(REPOSITORY_TOKENS.SiteSettingRepository) private siteSetting:SiteSettingRepository){}
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