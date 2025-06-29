"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const refreshToken_1 = require("../controllers/auth/refreshToken");
const refreshTokenAdmin_1 = require("../controllers/auth/refreshTokenAdmin");
const router = express_1.default.Router();
router.post("/refresh-token", refreshToken_1.refreshAccessToken);
router.post("/admin-refresh-token", refreshTokenAdmin_1.refreshTokenAdmin);
exports.default = router;
