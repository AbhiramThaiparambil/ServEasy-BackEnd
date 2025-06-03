import { inject, injectable } from "tsyringe";
import { SiteSettingRepository } from "../../../infrastructure/repositories/SiteSettingRepository";
@injectable()
export class UserSiteSettings{
 constructor(@inject("SiteSettingRepository") private siteSetting:SiteSettingRepository){}
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