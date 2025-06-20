import express from "express";
import { container } from "tsyringe";

import { authMiddleware } from "../../Middlewares/authMiddleware";

import { ServiceProviderController } from "../controllers/serviceProviderController";
import { serviceProviderAuth } from "../../Middlewares/serviceProviderMiddleware";

const serviceController=container.resolve(ServiceProviderController)
const router = express.Router();

router.post("/register", authMiddleware("User"), (req, res) => serviceController.registerServiceProvider(req,res));
router.get('/verify',authMiddleware("User"),(req, res) => serviceController.verifyServiceProvider(req,res));
router.route("/").get(authMiddleware("User"),(req, res) => serviceController.getServiceProvider(req,res)).put(authMiddleware("User"),(req, res) => serviceController.updateServiceProvider(req,res));
router.get('/categories',(req, res) => serviceController.getActiveCategories(req,res))
router.get("/get-paymentinfo",authMiddleware("User"),serviceProviderAuth,(req, res) => serviceController.getPaymentInfoForChartServiceProvider(req,res))
router.put("/services/activate-all/:id",(req, res) => serviceController.makeItactiveAllService(req,res))
router.put("/services/deactivate-all/:id",(req, res) => serviceController.makeInactiveAllService(req,res))

export default router;


