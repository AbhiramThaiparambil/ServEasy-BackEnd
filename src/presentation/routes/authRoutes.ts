import express,{Request,Response} from "express";
import { refreshAccessToken } from "../controllers/auth/refreshToken";

const router = express.Router();

// Refresh token route
router.post("/refresh-token", refreshAccessToken);


export default router;
