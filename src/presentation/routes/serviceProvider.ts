import express, { Request, Response } from "express";
import { RegistrationServiceProvider } from "../controllers/serviceProvider/Registration";
import { getServiceProvider } from "../controllers/serviceProvider/getServiceProviders";
import { verifyServiceProvider } from "../controllers/serviceProvider/verifyServiceProvider";
import { GetbookServiceHandler } from "../controllers/ServiceBooking/getBookedService";
import { authMiddleware } from "../../Middlewares/authMiddleware";
import { getCategoryHandler } from "../controllers/admin/category-management/getCategory";
import { getAllChatsHandler } from "../controllers/chat/getAllChatsHandler";
import { container } from "tsyringe";
import { ServiceProviderController } from "../controllers/serviceProviderController";
import { serviceProviderAuth } from "../../Middlewares/serviceProviderMiddleware";
const serviceController=container.resolve(ServiceProviderController)
const router = express.Router();

router.post("/register", authMiddleware("User"), RegistrationServiceProvider);
router.get('/verify',authMiddleware("User"),verifyServiceProvider);
router.route("/").get(authMiddleware("User"),getServiceProvider).put(authMiddleware("User"),(req, res) => serviceController.updateServiceProvider(req,res));

router.get("/bookedService",)
router.get("/bookings", authMiddleware("User"),);
router.get('/categories',getCategoryHandler)
router.get("/get-paymentinfo",authMiddleware("User"),serviceProviderAuth,(req, res) => serviceController.getPaymentInfoForChartServiceProvider(req,res))
export default router;
