import { Router } from "express";
import { addNewService } from "../controllers/service/addnewService";
import { getServices } from "../controllers/service/getServices";
import { serviceProviderAuth } from "../../Middlewares/serviceProviderMiddleware";
import { blockUnblockService } from "../controllers/service/activeAndInactive";
import { updateService } from "../controllers/service/updateService";
import { authMiddleware } from "../../Middlewares/authMiddleware";
import { uploadBillsHandler } from "../controllers/ServiceBooking/uploadBills";
import { ServiceController } from "../controllers/ServiceController";
import { container } from "tsyringe";
import { checkUserBlocked } from "../../Middlewares/checkUserBlocked";
import { BookingController } from "../controllers/BookingController";
const bookingController = container.resolve(BookingController);
const serviceController = container.resolve(ServiceController);
const router = Router();
router.put("/:serviceId", updateService);

router
  .route("/")
  .post(addNewService)
  .get(authMiddleware("User"), serviceProviderAuth, getServices);

router.patch(
  "/block-unblock",
  authMiddleware("User"),
  serviceProviderAuth,
  blockUnblockService
);

router.post(
  "/bookings/:bookingId/coupon/apply",
  authMiddleware("User"),
  checkUserBlocked,
  (req, res) => serviceController.applyCoupon(req, res)
);

router.delete(
  "/bookings/:bookingId/coupon/remove",
  authMiddleware("User"),
  checkUserBlocked,
  (req, res) => serviceController.removeCoupon(req, res)
);

router.post(
  "/book",
  authMiddleware("User"),
  checkUserBlocked,
  bookingController.createBooking.bind(bookingController)
);

router.post(
  "/book-online",
  authMiddleware("User"),
  checkUserBlocked,
  bookingController.createOnlineBooking.bind(bookingController)
);

router.get(
  "/bookings",
  authMiddleware("User"),
  checkUserBlocked,
  bookingController.getUserBookedServices.bind(bookingController)
);

router.get(
  "/bookings/serviceprovider",
  authMiddleware("User"),
  serviceProviderAuth,

  bookingController.getBookedServicesForProvider.bind(bookingController)
);

router.get("/online-services/with-slots/:serviceId", (req, res) =>
  serviceController.getOnlineServiceWithSlotHandler(req, res)
);

router.get("/online-services/slots/:id", (req, res) =>
  serviceController.getOnlineServiceSlotsHandler(req, res)
);

router.delete("/slots/:id", (req, res) =>
  serviceController.deleteSlotHandler(req, res)
);

router.post("/slots", (req, res) =>
  serviceController.createSlotHandler(req, res)
);

router.post("/service-provider/uploadbills/:id/", uploadBillsHandler);

// router.put(
//   "/service-provider/bookings/:id/:action",
//   authMiddleware("User"),
//   serviceProviderAuth,
//   serviceProviderStatusChange
// );

router.patch(
  "/service-provider/booking/:id/status",
  bookingController.updateBookingStatus.bind(bookingController)
);
router.patch(
  "/service-provider/booking/:id/confirm",
  bookingController.confirmBooking.bind(bookingController)
);
router.patch(
  "/service-provider/booking/:id/cancel",
  bookingController.cancelBooking.bind(bookingController)
);
router.patch(
  "/service-provider/booking/:id/payment-request",
  bookingController.requestPayment.bind(bookingController)
);

// router.put("/bookings/:id/cancel", (req, res) =>
//   serviceController.cancelUserBooking(req, res)
// );

router.get(
  "/bookings/serviceProvider/:id",
  bookingController.getBookedServiceDetailsForProvider.bind(bookingController)
);

router.get(
  "/bookings:id",
  bookingController.getBookedServiceDetailsForUser.bind(bookingController)
);

router.patch(
  "/online-bookings/:bookingId/reschedule",
  bookingController.RescheduleOnlineService.bind(bookingController)
);

export default router;
