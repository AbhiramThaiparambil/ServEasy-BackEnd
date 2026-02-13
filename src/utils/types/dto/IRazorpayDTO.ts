export interface IRazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt?: string;
  status: string;
  created_at: number;
}

export interface IRazorpayPaymentResult {
  id: string;
  status: string;
  method: string;
  amount: number;
  currency: string;
  captured: boolean;
  email?: string;
  contact?: string;
  created_at: number;
  notes?: Record<string, string | number>;
  fee?: number;
  tax?: number;
}
