import express, { Request, Response } from "express";
import { RegistrationServiceProvider } from "../controllers/serviceProvider/Registration";
import { authMiddleware } from "../../Middlewares/authMiddleware";
import { getServiceProvider } from "../controllers/serviceProvider/getServiceProviders";

const router = express.Router();

router.post("/register", authMiddleware, RegistrationServiceProvider);
router.get("/", authMiddleware,getServiceProvider);

export default router;
