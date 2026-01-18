export interface ICloudinaryService {
  uploadDocuments(img_url: string): Promise<string>;

  uploadUserProfile(img_url: string): Promise<string>;

  uploadServiceProviderProfile(img_url: string): Promise<string>;

  uploadServiceImg(img_url: string): Promise<string>;

  uploadBillsImg(img_url: string): Promise<string>;

  uploadHomeBanner(img_url: string): Promise<string>;

  uploadFooterBanner(img_url: string): Promise<string>;

  uploadChatImage(img_url: string): Promise<string>;

  uploadAdImage(img_url: string): Promise<string>;
}
