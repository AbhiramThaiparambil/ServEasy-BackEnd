import express, { Request, Response } from "express";
import { signIn } from "../controllers/admin/signin";
import { adminProfile } from "../controllers/admin/adminProfile";
import { adminAuthMiddleware } from "../../Middlewares/adminAuthMiddleware";
import { getAllUsers } from "../controllers/admin/userManagement/getAllUsers";
import { blockUnblock } from "../controllers/admin/userManagement/blockUnblock";
import { getServiceProviders } from "../controllers/admin/serviceProviders/getServiceProviders";
import { serviceProviderVerify } from "../controllers/admin/serviceProviders/verifyServiceProvider";
import { serviceProviderReject } from "../controllers/admin/serviceProviders/serviceProviderReject";
import { getAllServices } from "../controllers/admin/services/getAllServices";
import { blockUnblockService } from "../controllers/admin/services/blockUnblock";
import { blockUnblockServiceProvider } from "../controllers/admin/serviceProviders/blockUnblockProvider";

const router = express.Router();

router.post("/signin", signIn);
router.get("/profile", adminProfile); // adminAuthMiddleware
// router.post('/profile',adminAuthMiddleware,adminProfile)

router.get("/users", getAllUsers);
router.patch("/users/block-unblock", blockUnblock); //adminAuthMiddleware
router.get("/serviceProvider", getServiceProviders);

router.patch(
  "/serviceProvider/reject",
  adminAuthMiddleware,
  serviceProviderReject
);

router.patch(
  "/serviceProvider/verify",
  adminAuthMiddleware,
  serviceProviderVerify
);

// router.patch(/service)


router.get('/service',getAllServices)
router.patch('/service',blockUnblockService)
router.patch('/serviceprovider',blockUnblockServiceProvider)



export default router;
