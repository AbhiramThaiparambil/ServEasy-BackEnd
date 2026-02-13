export interface AddHomeBannerRequestDTO {
  imageUrl?: string;
  image?: string; 
  title: string;
  subtitle: string;
}

export interface UpdateHomeBannerRequestDTO {
  imageUrl?: string;
  image?: string; 
  title?: string;
  subtitle?: string;
  isActive?: boolean;
}

export interface HomeBannerResponseDTO {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  isActive: boolean;
}
