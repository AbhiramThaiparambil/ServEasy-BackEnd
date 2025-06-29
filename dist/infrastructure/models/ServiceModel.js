"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const locationSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        required: true
    },
    address: {
        type: String,
        required: true
    }
});
const ServiceSchema = new mongoose_1.Schema({
    serviceName: { type: String, required: true },
    description: { type: String, required: true },
    serviceType: { type: String, required: true },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    location: locationSchema,
    estimatedPrice: { type: Number, required: true },
    serviceProviderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isActive: { type: Boolean, default: true },
    // review: [
    //   {
    //     userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    //     rating: { type: Number, min: 1, max: 5, required: true },
    //     comment: { type: String },
    //   },
    // ],
    serviceImage: { type: String },
}, { timestamps: true });
ServiceSchema.index({ "location.coordinates": "2dsphere" });
const ServiceModel = (0, mongoose_1.model)("Service", ServiceSchema);
exports.default = ServiceModel;
