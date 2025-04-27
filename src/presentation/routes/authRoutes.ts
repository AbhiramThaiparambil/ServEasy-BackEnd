import express, { Request, Response } from "express";
import { refreshAccessToken } from "../controllers/auth/refreshToken";
import { refreshTokenAdmin } from "../controllers/auth/refreshTokenAdmin";
const router = express.Router();

router.post("/refresh-token", refreshAccessToken);
router.post("/admin-refresh-token", refreshTokenAdmin);
export default router;
