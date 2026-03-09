"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notificationSchema = new mongoose_1.default.Schema({
    content: { type: String, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Users", required: true },
    notificationTime: { type: Date, default: Date.now() },
    isRead: { type: Boolean, default: false }
});
notificationSchema.index({ userId: 1 });
exports.default = mongoose_1.default.model("notification", notificationSchema);
