import express, { Request, Response } from "express";
import { signIn } from "../controllers/admin/signin";
import { adminProfile } from "../controllers/admin/adminProfile";
import { adminAuthMiddleware } from "../../Middlewares/adminAuthMiddleware";
import { getAllUsers } from "../controllers/admin/userManagement/getAllUsers";
import { blockUnblock } from "../controllers/admin/userManagement/blockUnblock";
import { getServiceProviders } from "../controllers/admin/serviceProviders/getServiceProviders";
import { serviceProviderVerify } from "../controllers/admin/serviceProviders/verifyServiceProvider";
import { serviceProviderReject } from "../controllers/admin/serviceProviders/serviceProviderReject";

const router = express.Router();

router.post("/signin", signIn);
router.get("/profile", adminAuthMiddleware, adminProfile);
// router.post('/profile',adminAuthMiddleware,adminProfile)

router.get("/users", getAllUsers);
router.patch("/users/block-unblock", adminAuthMiddleware, blockUnblock);
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

router.get("/r", adminAuthMiddleware, (req: Request, res: Response) => {
  console.log("hey r is called ");
  res.send("isWorking");
});

export default router;
