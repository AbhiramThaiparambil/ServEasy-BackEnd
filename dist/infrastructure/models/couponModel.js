"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponModel = void 0;
const mongoose_1 = require("mongoose");
const CouponSchema = new mongoose_1.Schema({
    code: { type: String, required: true, unique: true },
    description: { type: String },
    discountValue: { type: Number, required: true },
    minOrderAmount: { type: Number },
    validFrom: { type: Date, required: true },
    validTo: { type: Date, required: true },
    usageLimit: { type: Number },
    usedCount: { type: Number, default: 0 },
    userId: { type: String },
    showInBanner: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    usedBy: [{ type: mongoose_1.Types.ObjectId, ref: 'User', default: [] }]
}, {
    timestamps: true,
});
exports.CouponModel = (0, mongoose_1.model)('Coupon', CouponSchema);
