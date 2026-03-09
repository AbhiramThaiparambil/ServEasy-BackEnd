"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdModel = void 0;
const mongoose_1 = require("mongoose");
const AdSchema = new mongoose_1.Schema({
    serviceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'services',
        required: true,
    },
    providerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'serviceproviders',
        required: true,
    },
    caption: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: null },
    targetLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: { type: [Number] },
        address: { type: String }
    },
    radiusKm: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["active", "block", "expired"],
        default: 'active',
    },
}, { timestamps: true });
AdSchema.index({ targetLocation: '2dsphere' });
exports.AdModel = (0, mongoose_1.model)('ads', AdSchema);
