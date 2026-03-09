"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const authMiddleware_1 = require("../Middlewares/authMiddleware");
const ServiceProviderController_1 = require("../controllers/ServiceProviderController");
const serviceProviderMiddleware_1 = require("../Middlewares/serviceProviderMiddleware");
const serviceController = tsyringe_1.container.resolve(ServiceProviderController_1.ServiceProviderController);
const router = express_1.default.Router();
router.post("/register", (0, authMiddleware_1.authMiddleware)("User"), (req, res) => serviceController.registerServiceProvider(req, res));
router.get("/registration/details", (0, authMiddleware_1.authMiddleware)("User"), (req, res) => serviceController.getRegistrationDetails(req, res));
router.put("/reapply", (0, authMiddleware_1.authMiddleware)("User"), (req, res) => serviceController.reapplyServiceProvider(req, res));
router.get("/status", (0, authMiddleware_1.authMiddleware)("User"), (req, res) => serviceController.getServiceProviderStatus(req, res));
router.get("/verify", (0, authMiddleware_1.authMiddleware)("User"), (req, res) => serviceController.verifyServiceProvider(req, res));
router
    .route("/")
    .get((0, authMiddleware_1.authMiddleware)("User"), serviceProviderMiddleware_1.serviceProviderAuth, (req, res) => serviceController.getServiceProvider(req, res))
    .put((0, authMiddleware_1.authMiddleware)("User"), serviceProviderMiddleware_1.serviceProviderAuth, (req, res) => serviceController.updateServiceProvider(req, res));
router.get("/categories", (req, res) => serviceController.getActiveCategories(req, res));
router.get("/get-paymentinfo", (0, authMiddleware_1.authMiddleware)("User"), serviceProviderMiddleware_1.serviceProviderAuth, (req, res) => serviceController.getPaymentInfoForChartServiceProvider(req, res));
router.put("/services/activate-all/:id", (req, res) => serviceController.makeItactiveAllService(req, res));
router.put("/services/deactivate-all/:id", (req, res) => serviceController.makeInactiveAllService(req, res));
router.get("/availability/:serviceProviderId", (req, res) => serviceController.checkServiceProviderAvailability(req, res));
router.get("/wallet", (0, authMiddleware_1.authMiddleware)("User"), serviceProviderMiddleware_1.serviceProviderAuth, (req, res) => serviceController.getWallet(req, res));
router.post("/wallet", (0, authMiddleware_1.authMiddleware)("User"), serviceProviderMiddleware_1.serviceProviderAuth, (req, res) => serviceController.withdrawPayment(req, res));
router.get("/subscription-plans", (req, res) => serviceController.getAvailableSubscriptionPlans(req, res));
router.post("/ads", (0, authMiddleware_1.authMiddleware)("User"), serviceProviderMiddleware_1.serviceProviderAuth, (req, res) => serviceController.createAd(req, res));
router.put("/ads/:adId", (req, res) => serviceController.editAd(req, res));
router.get("/ads/provider/:providerId", (req, res) => serviceController.getProviderAds(req, res));
router.get("/providers/:providerId/services/names", (req, res) => serviceController.getServiceNames(req, res));
router.get("/notification", (0, authMiddleware_1.authMiddleware)("User"), serviceProviderMiddleware_1.serviceProviderAuth, (req, res) => serviceController.getNotification(req, res));
router.patch("/notification/:id", (0, authMiddleware_1.authMiddleware)("User"), serviceProviderMiddleware_1.serviceProviderAuth, (req, res) => serviceController.markAsReadNotification(req, res));
router.patch("/ads/:adId/", (req, res) => serviceController.changeAdStatus(req, res));
exports.default = router;
