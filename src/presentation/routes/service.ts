import { Router } from "express";
import { addNewService } from "../controllers/service/addnewService";
import { getServices } from "../controllers/service/getServices";
import { authMiddleware } from "../../Middlewares/authMiddleware";
import { serviceProviderAuth } from "../../Middlewares/serviceProviderMiddleware";
import { blockUnblockService } from "../controllers/service/activeAndInactive";
import { updateService } from "../controllers/service/updateService";
import { bookServiceHandler } from "../controllers/ServiceBooking/serviceBooking";
import { GetbookServiceHandler } from "../controllers/ServiceBooking/getBookedService";
import { getSingleBookedServiceHandler } from "../controllers/ServiceBooking/getSingleBookedService";
import { GetServiceProviderBookServiceHandler } from "../controllers/serviceProvider/bookings/GetBookServic";
import { getServiceDetailsServiceProvider } from "../controllers/ServiceBooking/getServiceDetailsServiceProvider";
import { serviceProviderStatusChange } from "../controllers/ServiceBooking/serviceProviderStausChange";

const serviceRouter = Router();
serviceRouter.put("/:serviceId", updateService);

serviceRouter
  .route("/")
  .post(addNewService)
  .get(authMiddleware, serviceProviderAuth, getServices);

serviceRouter.patch(
  "/block-unblock",
  authMiddleware,
  serviceProviderAuth,
  blockUnblockService
);

serviceRouter.post("/book",authMiddleware,bookServiceHandler)

serviceRouter.get("/bookings",authMiddleware,GetbookServiceHandler)
serviceRouter.get(
  "/bookings/serviceprovider",
  authMiddleware,
  serviceProviderAuth,
  GetServiceProviderBookServiceHandler
);
serviceRouter.put("/service-provider/bookings/:id/:action",serviceProviderStatusChange)

serviceRouter.get("/bookings/serviceProvider/:id",getServiceDetailsServiceProvider)

serviceRouter.get("/bookings:id",getSingleBookedServiceHandler)

export default serviceRouter;
