export interface ISiteSettings{
id: string;
homeBanners:{imageUrl: string, title: string, subtitle: string,isActive: boolean}[];
themes:{name: string, isActive: boolean}[];
footerBanners:{imageUrl: string, title: string, subtitle: string,isActive: boolean}[];

}