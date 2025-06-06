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
import { container } from "tsyringe";
import { AdminController } from "../controllers/AdminController";
const router = express.Router();
const adminController = container.resolve(AdminController);


router.post("/signin", (req, res) => adminController.signIn(req, res));
router.get("/profile", authMiddleware("Admin"), (req, res) => adminController.getProfile(req, res));

router.get("/users", authMiddleware("Admin"),authMiddleware("Admin"), (req, res) => adminController.getAllUsers(req, res));

router.patch("/users/block-unblock", authMiddleware("Admin"), (req, res) => adminController.blockUnblockUser(req, res));
router.get("/serviceProvider", authMiddleware("Admin"), (req, res) => adminController.getServiceProviders(req, res));
router.patch("/serviceProvider/reject",authMiddleware("Admin"),(req, res) => adminController.serviceProviderReject(req, res));

router.patch("/serviceProvider/verify",authMiddleware("Admin"),(req, res) => adminController.serviceProviderVerify(req, res));



router.get("/service", authMiddleware("Admin"), (req, res) => adminController.getAllServices(req, res));
router.patch("/service", authMiddleware("Admin"), (req, res) => adminController.blockUnblockService(req, res));
router.patch("/serviceprovider",authMiddleware("Admin"),(req, res) => adminController.blockUnblockServiceProvider(req, res));
router.post("/category",authMiddleware("Admin"), (req, res) => adminController.addCategory(req, res));
router.get("/category", authMiddleware("Admin"),(req, res) => adminController.getCategory(req, res));
router.put("/category", authMiddleware("Admin"),(req, res) => adminController.editCategory(req, res));
router.patch("/category",authMiddleware("Admin"), (req, res) => adminController.blockUnblockCategory(req, res));
router.delete("/category/:id",authMiddleware("Admin"), (req, res) => adminController.deleteCategory(req, res));

router.post("/category/service", authMiddleware("Admin"),(req, res) => adminController.addService(req, res));
router.patch("/category/service",(req, res) =>adminController.blockUnblockService(req, res));
router.patch("/category/service",authMiddleware("Admin"), (req, res) => adminController.blockUnblockCategory(req, res));
router.put("/category/service",authMiddleware("Admin"), (req, res) => adminController.addService(req, res));

router.delete("/category/service/:categoryId/:serviceId",authMiddleware("Admin"),(req, res) =>  adminController.deleteService(req, res));
router.get("/logout",authMiddleware("Admin"),(req, res) =>  adminController.logoutAdmin(req, res));

router.get("/dashboard/payment-info", authMiddleware("Admin"),(req, res) =>adminController.getPaymentInfoForChart(req, res));


router.post('/site-settings/add',authMiddleware("Admin"), (req, res) => adminController.addSiteSettings(req, res));
router.delete('/site-settings/delete',authMiddleware("Admin"), (req, res) => adminController.deleteSiteSettings(req, res));
router.put('/site-settings/activate', authMiddleware("Admin"),(req, res) => adminController.makeActiveSiteSettings(req, res));
router.get('/site-settings',authMiddleware("Admin"), (req, res) => adminController.getSiteSettings(req, res));
export default router;



