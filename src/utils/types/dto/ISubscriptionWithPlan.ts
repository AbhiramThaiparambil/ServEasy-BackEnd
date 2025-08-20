export interface ISubscriptionWithPlan {
  _id: string;
  startDate: Date;
  endDate: Date;
  status: "active" | "expired" | "inactive";
  paymentId: string;
  name: string;           
  price: number;          
  validityDays: number;   
  leftDays: number;       
}

export interface IFindSubscriptionsResult {
  activeSubscription: ISubscriptionWithPlan | null;
  expiredSubscriptions: ISubscriptionWithPlan[];
}
