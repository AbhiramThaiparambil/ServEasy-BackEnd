export interface ISubscription {
  planId: string;
  startDate: Date;
  endDate: Date;
  status:ISubscriptionStatus
  createdAt?: Date;
  paymentId: string;
}

export type ISubscriptionStatus=  'active' | 'expired'|"pending";
