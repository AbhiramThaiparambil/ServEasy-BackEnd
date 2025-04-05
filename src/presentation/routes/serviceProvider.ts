import express, { Request, Response } from "express";
import { RegistrationServiceProvider } from "../controllers/serviceProvider/Registration";
import { getServiceProvider } from "../controllers/serviceProvider/getServiceProviders";
import { verifyServiceProvider } from "../controllers/serviceProvider/verifyServiceProvider";
import { GetbookServiceHandler } from "../controllers/ServiceBooking/getBookedService";
import { authMiddleware } from "../../Middlewares/authMiddleware";

const router = express.Router();

router.post("/register", authMiddleware, RegistrationServiceProvider);
router.get('/verify',authMiddleware,verifyServiceProvider);
router.get("/", authMiddleware,getServiceProvider);

router.get("/bookedService",)
router.get("/bookings", authMiddleware,);

export default router;
