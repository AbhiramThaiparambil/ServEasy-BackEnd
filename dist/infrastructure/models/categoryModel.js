"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const ServiceTypeSchema = new mongoose_1.Schema({
    serviceName: { type: String },
    serviceDescription: { type: String },
    isHidden: { type: Boolean, default: false },
});
const CategorySchema = new mongoose_1.Schema({
    category: { type: String },
    isHidden: { type: Boolean, default: false },
    typeService: { type: [ServiceTypeSchema] },
}, {
    timestamps: true,
});
exports.CategoryModel = (0, mongoose_1.model)("Category", CategorySchema);
