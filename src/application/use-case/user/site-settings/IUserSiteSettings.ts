import { GetBannersResponseDTO, GetThemesResponseDTO } from "../../../dtos/user/site-settings/SiteSettingsDTO";

export interface IUserSiteSettings {
  getThemes(): Promise<GetThemesResponseDTO>;
  getBanners(): Promise<GetBannersResponseDTO>;
}
