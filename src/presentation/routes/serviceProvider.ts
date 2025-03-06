import express, { Request, Response } from "express";
import { RegistrationServiceProvider } from "../controllers/serviceProvider/Registration";
import { authMiddleware } from "../../Middlewares/authMiddleware";

const router = express.Router();

router.post("/register", authMiddleware, RegistrationServiceProvider);

export default router;
