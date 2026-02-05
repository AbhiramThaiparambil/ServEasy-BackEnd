export interface AddReviewRequestDTO {
  bookedServiceId: string;
  serviceId: string;
  rating: number;
  comment: string;
  userId: string;
}

export interface AddReviewResponseDTO {
  success: boolean;
  message: string;
}
