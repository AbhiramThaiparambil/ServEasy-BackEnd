export interface GetThemesResponseDTO {
  themes: string[] | [];
}

export interface GetBannersResponseDTO {
  homeBanner: any | null; // Replace 'any' with specific banner interface if available
  footerBanner: any | null; // Replace 'any' with specific banner interface if available
}
