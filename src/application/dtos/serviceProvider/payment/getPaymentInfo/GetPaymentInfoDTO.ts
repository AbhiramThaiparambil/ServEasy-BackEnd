export interface GetPaymentInfoRequestDTO {
  serviceProviderId: string;
  startDate?: Date;
  endDate?: Date;
}

export interface GetPaymentInfoResponseDTO {

    totalRevenue: number;
  totalConvenienceFee: number;
  count: number;

  
}
