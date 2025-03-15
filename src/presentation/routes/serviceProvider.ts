import express, { Request, Response } from "express";
import { RegistrationServiceProvider } from "../controllers/serviceProvider/Registration";
import { authMiddleware } from "../../Middlewares/authMiddleware";
import { getServiceProvider } from "../controllers/serviceProvider/getServiceProviders";
import { verifyServiceProvider } from "../controllers/serviceProvider/verifyServiceProvider";

const router = express.Router();

router.post("/register", authMiddleware, RegistrationServiceProvider);
router.get('/verify',authMiddleware,verifyServiceProvider);

router.get("/", authMiddleware,getServiceProvider);

export default router;
