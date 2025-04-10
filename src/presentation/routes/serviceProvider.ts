import express, { Request, Response } from "express";
import { RegistrationServiceProvider } from "../controllers/serviceProvider/Registration";
import { getServiceProvider } from "../controllers/serviceProvider/getServiceProviders";
import { verifyServiceProvider } from "../controllers/serviceProvider/verifyServiceProvider";
import { GetbookServiceHandler } from "../controllers/ServiceBooking/getBookedService";
import { authMiddleware } from "../../Middlewares/authMiddleware";
import { getCategoryHandler } from "../controllers/admin/category-management/getCategory";

const router = express.Router();

router.post("/register", authMiddleware, RegistrationServiceProvider);
router.get('/verify',authMiddleware,verifyServiceProvider);
router.get("/", authMiddleware,getServiceProvider);

router.get("/bookedService",)
router.get("/bookings", authMiddleware,);
router.get('/categories',getCategoryHandler)
export default router;
