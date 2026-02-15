export interface IReview {
    _id?: string;
    userId: string;
  serviceId: string;
  bookingId: string;
  rating: number;
  comment: string;
}

export interface IReviewWithUser {
  _id: string; 
  rating: number;
  comment: string;
  userProfile: string;
  userName: string;
}
