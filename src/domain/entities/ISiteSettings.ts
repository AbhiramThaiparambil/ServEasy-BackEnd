export interface IHomeBanner {
  id?: string;
  imageUrl: string;
  image?: string;
  title: string;
  subtitle: string;
  isActive: boolean;
}

export interface ITheme {
  id?: string;
  name: string;
  isActive: boolean;
}
export interface IFooterBanner {
  id?: string;
  image?: string;

  imageUrl: string;
  title: string;
  subtitle: string;
  isActive: boolean;
}

export interface ISiteSettings {
  id?: string;
  homeBanners: IHomeBanner[];
  themes: ITheme[];
  footerBanners: IFooterBanner[];
}
