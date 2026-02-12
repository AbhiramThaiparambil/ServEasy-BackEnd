export interface IPayment {
  serviceCost: number;
  materialCost: number;
  travelCost: number;
  inspectionCost: number;
  convenienceFee: number;
  total: number;
  discountAmount: number;
  finalTotal: number;
}
