import { Router } from "express";
import { addNewService } from "../controllers/service/addnewService";
import { getServices } from "../controllers/service/getServices";
import { authMiddleware } from "../../Middlewares/authMiddleware";
import { verifyServiceProvider } from "../controllers/serviceProvider/verifyServiceProvider";
import { serviceProviderAuth } from "../../Middlewares/serviceProviderMiddleware";
import { blockUnblockService } from "../controllers/service/activeAndInactive";
import { updateService } from "../controllers/service/updateService";

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

export default serviceRouter;
