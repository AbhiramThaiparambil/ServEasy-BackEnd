export interface AddThemeRequestDTO {
  name: string;
  isActive?: boolean;
}

export interface UpdateThemeRequestDTO {
  name?: string;
  isActive?: boolean;
}

export interface ThemeResponseDTO {
  id: string;
  name: string;
  isActive: boolean;
}
