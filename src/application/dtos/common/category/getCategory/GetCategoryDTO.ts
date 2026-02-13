export interface GetCategoryRequestDTO {}

export interface GetCategoryResponseDTO {
  _id?: string;
  name: string;
  description: string;
  image: string;
  isHidden: boolean;
}
