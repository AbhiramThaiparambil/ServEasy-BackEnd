import express, { Request, Response } from "express";
import { signIn } from "../controllers/admin/signin";
import { adminProfile } from "../controllers/admin/adminProfile";
import { getAllUsers } from "../controllers/admin/userManagement/getAllUsers";
import { blockUnblock } from "../controllers/admin/userManagement/blockUnblock";
import { getServiceProviders } from "../controllers/admin/serviceProviders/getServiceProviders";
import { serviceProviderVerify } from "../controllers/admin/serviceProviders/verifyServiceProvider";
import { serviceProviderReject } from "../controllers/admin/serviceProviders/serviceProviderReject";
import { getAllServices } from "../controllers/admin/services/getAllServices";
import { blockUnblockService } from "../controllers/admin/services/blockUnblock";
import { blockUnblockServiceProvider } from "../controllers/admin/serviceProviders/blockUnblockProvider";
import { logoutAdmin } from "../controllers/admin/Logout";
import { addCategoryHandler } from "../controllers/admin/category-management/addCategory";
import { getCategoryHandler } from "../controllers/admin/category-management/getCategory";
import { addServiceHandler } from "../controllers/admin/category-management/addService";
import { editCategoryHandler } from "../controllers/admin/category-management/editCategoryHandler";
import { blockUnblockCategoryHandler } from "../controllers/admin/category-management/blockUnblockCategoryHandler";
import { deleteCategoryHandler } from "../controllers/admin/category-management/deleteCategoryHandler";
import { blockUnblockServiceHandler } from "../controllers/admin/category-management/blockUnblockServiceHandler";
import { deleteServiceHandler } from "../controllers/admin/category-management/deleteServiceHandler";
import { authMiddleware } from "../../Middlewares/authMiddleware";
const router = express.Router();

router.post("/signin", signIn);
router.get("/profile", authMiddleware("Admin"), adminProfile); 
// router.post('/profile',adminAuthMiddleware,adminProfile)

router.get("/users",authMiddleware("Admin"),getAllUsers);
router.patch("/users/block-unblock", authMiddleware("Admin"), blockUnblock); 
router.get("/serviceProvider", authMiddleware("Admin"), getServiceProviders);

router.patch(
  "/serviceProvider/reject",
  authMiddleware("Admin"),
  serviceProviderReject
);

router.patch(
  "/serviceProvider/verify",
  authMiddleware("Admin"),
  serviceProviderVerify
);
blockUnblockCategoryHandler
router.get("/service", authMiddleware("Admin"), getAllServices);
router.patch("/service", authMiddleware("Admin"), blockUnblockService);
router.patch("/serviceprovider",authMiddleware("Admin"), blockUnblockServiceProvider);
router.post("/category",addCategoryHandler)
router.get("/category",getCategoryHandler)
router.put("/category",editCategoryHandler)
router.patch("/category",blockUnblockCategoryHandler)
router.delete("/category/:id",deleteCategoryHandler)


router.post("/category/service",addServiceHandler)
router.patch("/category/service",blockUnblockServiceHandler)

router.put("/category/service",addServiceHandler)
router.delete("/category/service/:categoryId/:serviceId", deleteServiceHandler);
router.get("/logout",logoutAdmin)
export default router;
