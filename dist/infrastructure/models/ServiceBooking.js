"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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
        enum: ["cash", "card", "online", "pending"],
        required: true,
    },
    paymentStatus: {
        type: String,
        default: "pending",
        enum: ["pending", "paid", "failed", "pending"],
        required: true,
    },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    estimatedServiceTime: { type: String },
    bookedTime: { type: Date },
    payment: { type: {} },
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
            timestamp: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });
const ServiceBooking = (0, mongoose_1.model)("ServiceBooking", ServiceBookingSchema);
exports.default = ServiceBooking;
