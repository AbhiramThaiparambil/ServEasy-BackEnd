export interface AddFooterBannerRequestDTO {
  imageUrl?: string;
  image?: string;
  title: string;
  subtitle: string;
}

export interface UpdateFooterBannerRequestDTO {
  imageUrl?: string;
  image?: string;
  title?: string;
  subtitle?: string;
  isActive?: boolean;
}

export interface FooterBannerResponseDTO {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  isActive: boolean;
}
