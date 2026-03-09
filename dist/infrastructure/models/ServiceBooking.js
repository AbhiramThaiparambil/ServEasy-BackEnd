"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    serviceCost: { type: Number, required: true },
    materialCost: { type: Number },
    travelCost: { type: Number, required: true },
    inspectionCost: { type: Number, required: true },
    convenienceFee: { type: Number, required: true },
    total: { type: Number, required: true },
    discountAmount: { type: Number, required: true },
    finalTotal: { type: Number, required: true },
});
const CouponAppliedSchema = new mongoose_1.Schema({
    code: { type: String, required: true },
    discountAmount: { type: Number, required: true },
    appliedAt: { type: Date, required: true },
});
const ServiceBookingSchema = new mongoose_1.Schema({
    serviceProviderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ServiceProvider",
        required: true,
    },
    serviceId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Service", required: true },
    address: {},
    serviceStatus: {
        type: String,
        default: "pending",
        enum: ["pending", "in-progress", "completed", "cancelled", "confirmed"],
        required: true,
    },
    paymentType: {
        type: String,
        default: "pending",
        enum: ["cash", "card", "online", "pending", "wallet"],
        required: true,
    },
    paymentStatus: {
        type: String,
        default: "pending",
        enum: ["pending", "paid", "failed", "pending", "completed"],
        required: true,
    },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    estimatedServiceTime: { type: String },
    bookedTime: { type: Date },
    payment: { type: PaymentSchema },
    coupon: CouponAppliedSchema,
    cancelReason: { type: String },
    serviceCompletedTime: { type: Date },
    serviceBills: { type: Array },
    isOnlineService: { type: Boolean },
    reviewId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Review" },
    liveLocation: {
        lat: { type: Number },
        lng: { type: Number },
    },
    preferredSlot: {
        date: { type: Date },
        time: {
            type: String,
            enum: ["morning", "afternoon", "anyTime"],
        },
    },
    serviceSlot: {
        date: { type: Date },
        startTime: { type: String },
        endTime: { type: String },
    },
    bookingHistory: [
        {
            action: {
                type: String,
            },
            message: { type: String },
            timestamp: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });
const ServiceBooking = (0, mongoose_1.model)("ServiceBooking", ServiceBookingSchema);
exports.default = ServiceBooking;
