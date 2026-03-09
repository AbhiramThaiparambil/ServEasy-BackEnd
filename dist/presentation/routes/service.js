"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceProviderMiddleware_1 = require("../Middlewares/serviceProviderMiddleware");
const authMiddleware_1 = require("../Middlewares/authMiddleware");
const ServiceController_1 = require("../controllers/ServiceController");
const tsyringe_1 = require("tsyringe");
const checkUserBlocked_1 = require("../Middlewares/checkUserBlocked");
const BookingController_1 = require("../controllers/BookingController");
const bookingController = tsyringe_1.container.resolve(BookingController_1.BookingController);
const serviceController = tsyringe_1.container.resolve(ServiceController_1.ServiceController);
const router = (0, express_1.Router)();
router.put("/:serviceId", (req, res) => serviceController.updateService(req, res));
router
    .route("/")
    .post((req, res) => serviceController.addNewService(req, res))
    .get((0, authMiddleware_1.authMiddleware)("User"), serviceProviderMiddleware_1.serviceProviderAuth, (req, res) => serviceController.getServices(req, res));
router.patch("/block-unblock", (0, authMiddleware_1.authMiddleware)("User"), serviceProviderMiddleware_1.serviceProviderAuth, (req, res) => serviceController.blockUnblockService(req, res));
router.post("/bookings/:bookingId/coupon/apply", (0, authMiddleware_1.authMiddleware)("User"), checkUserBlocked_1.checkUserBlocked, (req, res) => serviceController.applyCoupon(req, res));
router.delete("/bookings/:bookingId/coupon/remove", (0, authMiddleware_1.authMiddleware)("User"), checkUserBlocked_1.checkUserBlocked, (req, res) => serviceController.removeCoupon(req, res));
router.post("/book", (0, authMiddleware_1.authMiddleware)("User"), checkUserBlocked_1.checkUserBlocked, bookingController.createBooking.bind(bookingController));
router.post("/book-online", (0, authMiddleware_1.authMiddleware)("User"), checkUserBlocked_1.checkUserBlocked, bookingController.createOnlineBooking.bind(bookingController));
router.get("/bookings", (0, authMiddleware_1.authMiddleware)("User"), checkUserBlocked_1.checkUserBlocked, bookingController.getUserBookedServices.bind(bookingController));
router.get("/bookings/serviceprovider", (0, authMiddleware_1.authMiddleware)("User"), serviceProviderMiddleware_1.serviceProviderAuth, bookingController.getBookedServicesForProvider.bind(bookingController));
router.get("/online-services/with-slots/:serviceId", (req, res) => serviceController.getOnlineServiceWithSlotHandler(req, res));
router.get("/online-services/slots/:id", (req, res) => serviceController.getOnlineServiceSlotsHandler(req, res));
router.delete("/slots/:id", (req, res) => serviceController.deleteSlotHandler(req, res));
router.post("/slots", (req, res) => serviceController.createSlotHandler(req, res));
router.post("/service-provider/uploadbills/:id/", bookingController.uploadBills.bind(bookingController));
// router.put(
//   "/service-provider/bookings/:id/:action",
//   authMiddleware("User"),
//   serviceProviderAuth,
//   serviceProviderStatusChange
// );
router.patch("/service-provider/booking/:id/status", bookingController.updateBookingStatus.bind(bookingController));
router.patch("/service-provider/booking/:id/confirm", bookingController.confirmBooking.bind(bookingController));
router.patch("/service-provider/booking/:id/cancel", bookingController.cancelBooking.bind(bookingController));
router.patch("/service-provider/booking/:id/payment-request", bookingController.requestPayment.bind(bookingController));
// router.put("/bookings/:id/cancel", (req, res) =>
//   serviceController.cancelUserBooking(req, res)
// );
router.get("/bookings/serviceProvider/:id", bookingController.getBookedServiceDetailsForProvider.bind(bookingController));
router.get("/bookings:id", bookingController.getBookedServiceDetailsForUser.bind(bookingController));
router.patch("/online-bookings/:bookingId/reschedule", bookingController.RescheduleOnlineService.bind(bookingController));
router.get("/bookings/serviceProvider/payment-summary/:id", (0, authMiddleware_1.authMiddleware)("User"), serviceProviderMiddleware_1.serviceProviderAuth, bookingController.getBookingPaymentSummary.bind(bookingController));
exports.default = router;
