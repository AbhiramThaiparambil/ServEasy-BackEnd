export interface IUserSiteSettings {
  getThemes(): Promise<string[] | []>;
  getBanners(): Promise<any>;
}
