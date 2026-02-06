export interface GetPaymentInfoRequestDTO {
  serviceProviderId: string;
  startDate?: Date;
  endDate?: Date;
}

export interface GetPaymentInfoResponseDTO {
  totalRevenue: number;
  totalBookings: number;
  pendingPayments: number;
  completedPayments: number;
  bookings: any[];
}
