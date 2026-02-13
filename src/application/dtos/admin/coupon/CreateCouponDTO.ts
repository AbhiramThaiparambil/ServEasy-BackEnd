export interface CreateCouponDTO {
    code: string;
    description?: string;
    discountValue: number;
    minOrderAmount?: number;
    validFrom: Date;
    validTo: Date;
    usageLimit?: number;
    usedBy?: string[];
    showInBanner?: boolean;
    isActive?: boolean;
}
