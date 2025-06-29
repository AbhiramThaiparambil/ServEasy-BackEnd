"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    userName: { type: String, required: true },
    email: { type: String, unique: true },
    phone: { type: String, sparse: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ['user', 'admin', 'serviceProvider'], default: 'user' },
    googleId: { type: String },
    serviceProvider: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "ServiceProvider" },
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    address: { type: Array },
    profileImage: { type: String }
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
