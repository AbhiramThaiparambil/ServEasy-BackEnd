import express, { Request, Response } from "express";
import { RegistrationServiceProvider } from "../controllers/serviceProvider/Registration";
import { getServiceProvider } from "../controllers/serviceProvider/getServiceProviders";
import { verifyServiceProvider } from "../controllers/serviceProvider/verifyServiceProvider";
import { GetbookServiceHandler } from "../controllers/ServiceBooking/getBookedService";
import { authMiddleware } from "../../Middlewares/authMiddleware";
import { getCategoryHandler } from "../controllers/admin/category-management/getCategory";
import { getAllChatsHandler } from "../controllers/chat/getAllChatsHandler";

const router = express.Router();

router.post("/register", authMiddleware("User"), RegistrationServiceProvider);
router.get('/verify',authMiddleware("User"),verifyServiceProvider);
router.get("/", authMiddleware("User"),getServiceProvider);

router.get("/bookedService",)
router.get("/bookings", authMiddleware("User"),);
router.get('/categories',getCategoryHandler)
export default router;
