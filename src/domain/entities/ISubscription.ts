export interface ISubscription {
  planId: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expired';
  createdAt?: Date;
  paymentId: string;
}
