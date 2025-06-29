"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSlotExpired = isSlotExpired;
const dayjs_1 = __importDefault(require("dayjs"));
const customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
dayjs_1.default.extend(customParseFormat_1.default);
function isSlotExpired(slot) {
    if (slot.booked)
        return true;
    const now = (0, dayjs_1.default)();
    const slotDay = slot.createdAt ? (0, dayjs_1.default)(slot.createdAt) : now;
    const slotStart = (0, dayjs_1.default)(`${slotDay.format("YYYY-MM-DD")} ${slot.startTime}`, "YYYY-MM-DD hh:mm A");
    return now.isAfter(slotStart);
}
