"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAssistanceChatSessionModel = exports.AiAssistanceMessageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.AiAssistanceMessageSchema = new mongoose_1.Schema({
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { _id: false });
const AiAssistanceSessionSchema = new mongoose_1.Schema({
    serviceProviderId: { type: mongoose_1.Schema.Types.ObjectId, ref: "ServiceProvider", required: true },
    title: { type: String, default: "new Chat" },
    messages: [exports.AiAssistanceMessageSchema],
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
exports.AiAssistanceChatSessionModel = (0, mongoose_1.model)("AiAssistanceChatSession", AiAssistanceSessionSchema);
