"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    serviceId: { type: mongoose_1.Schema.Types.ObjectId, ref: "services", required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "users", required: true },
    bookingId: { type: mongoose_1.Schema.Types.ObjectId, ref: "servicebookings", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
}, { timestamps: true });
ReviewSchema.index({ bookingId: 1 }, { unique: true });
exports.ReviewModel = (0, mongoose_1.model)("Review", ReviewSchema);
