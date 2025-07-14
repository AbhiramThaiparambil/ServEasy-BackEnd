import express, { Request, Response } from 'express';

import { authMiddleware } from '../../Middlewares/authMiddleware';
import { container } from 'tsyringe';
import { AdminController } from '../controllers/AdminController';
const router = express.Router();
const adminController = container.resolve(AdminController);

router.post('/signin', (req, res) => adminController.signIn(req, res));
router.get('/profile', authMiddleware('Admin'), (req, res) => adminController.getProfile(req, res));

router.get('/users', authMiddleware('Admin'), authMiddleware('Admin'), (req, res) =>
  adminController.getAllUsers(req, res)
);

router.patch('/users/block-unblock', authMiddleware('Admin'), (req, res) =>
  adminController.blockUnblockUser(req, res)
);
router.get('/serviceProvider', authMiddleware('Admin'), (req, res) =>
  adminController.getServiceProviders(req, res)
);
router.patch('/serviceProvider/reject', authMiddleware('Admin'), (req, res) =>
  adminController.serviceProviderReject(req, res)
);

router.patch('/serviceProvider/verify', authMiddleware('Admin'), (req, res) =>
  adminController.serviceProviderVerify(req, res)
);

router.get('/service', authMiddleware('Admin'), (req, res) =>
  adminController.getAllServices(req, res)
);
router.patch('/service', authMiddleware('Admin'), (req, res) =>
  adminController.blockUnblockService(req, res)
);
router.patch('/serviceprovider', authMiddleware('Admin'), (req, res) =>
  adminController.blockUnblockServiceProvider(req, res)
);
router.post('/category', authMiddleware('Admin'), (req, res) =>
  adminController.addCategory(req, res)
);
router.get('/category', authMiddleware('Admin'), (req, res) =>
  adminController.getCategory(req, res)
);
router.put('/category', authMiddleware('Admin'), (req, res) =>
  adminController.editCategory(req, res)
);
router.patch('/category', authMiddleware('Admin'), (req, res) =>
  adminController.blockUnblockCategory(req, res)
);
router.delete('/category/:id', authMiddleware('Admin'), (req, res) =>
  adminController.deleteCategory(req, res)
);

router.post('/category/service', authMiddleware('Admin'), (req, res) =>
  adminController.addService(req, res)
);
router.patch('/category/service', (req, res) => adminController.blockUnblockService(req, res));
router.patch('/category/service', authMiddleware('Admin'), (req, res) =>
  adminController.blockUnblockCategory(req, res)
);
router.put('/category/service', authMiddleware('Admin'), (req, res) =>
  adminController.addService(req, res)
);

router.delete('/category/service/:categoryId/:serviceId', authMiddleware('Admin'), (req, res) =>
  adminController.deleteService(req, res)
);
router.get('/logout', authMiddleware('Admin'), (req, res) => adminController.logoutAdmin(req, res));

router.get('/dashboard/payment-info', authMiddleware('Admin'), (req, res) =>
  adminController.getPaymentInfoForChart(req, res)
);

router.post('/site-settings/add', authMiddleware('Admin'), (req, res) =>
  adminController.addSiteSettings(req, res)
);
router.delete('/site-settings/delete', authMiddleware('Admin'), (req, res) =>
  adminController.deleteSiteSettings(req, res)
);
router.put('/site-settings/activate', authMiddleware('Admin'), (req, res) =>
  adminController.makeActiveSiteSettings(req, res)
);
router.get('/site-settings', authMiddleware('Admin'), (req, res) =>
  adminController.getSiteSettings(req, res)
);
router.get('/logs', (req, res) => adminController.getCurrentLog(req, res));
router.post('/coupons', (req, res) => adminController.createCoupon(req, res));
router.get('/coupons',(req, res) => adminController.getAllCoupon(req, res))
router.patch('/coupons/:id/deactivate',(req, res) => adminController.activeInActiveCoupons(req, res))
router.patch('/coupons/:id/banner',(req, res) => adminController.showCouponsInBanner(req, res))
 
export default router;
