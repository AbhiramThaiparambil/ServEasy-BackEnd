import { Router } from "express";

import { authMiddleware } from "../../Middlewares/authMiddleware";
import { container } from "tsyringe";
import { UserController } from "../controllers/UserController";
import { checkUserBlocked } from "../../Middlewares/checkUserBlocked";
import { clickLimiter } from "../../Middlewares/clickLimiter";
const userController = container.resolve(UserController);
const userRouter = Router();

userRouter.post("/signup", userController.registerUserController);
userRouter.post("/signin/:method", userController.signInUserController);
userRouter.post("/verify-otp", userController.verifyOtpController);
userRouter.post("/resend-otp", userController.resendOtpController);
userRouter.get(
  "/profile",
  authMiddleware("User"),
  checkUserBlocked,
  userController.userProfileController
);

userRouter.post("/forgot-password", userController.sendOtpController);
userRouter.post("/forgot-password/verify-otp", userController.forgotVerifyOtp);
userRouter.post(
  "/forgot-password/reset",
  authMiddleware("User"),
  checkUserBlocked,
  userController.resetPassword
);
userRouter.put(
  "/updateProfile/:userid",
  authMiddleware("User"),
  checkUserBlocked,
  userController.userProfileUpdateController
);
userRouter.post(
  "/updateProfile/verifyotp",
  userController.profileUpdateOtpController
);
userRouter.get("/logout", userController.logoutUserController);

userRouter.get("/user/service/:id", userController.getSingleServiceHandler);
userRouter.get("/user/profile/:id", userController.userProfileController);
// userRouter.get("/getactive/services",userController.getActiveServices);
userRouter.get("/getactive/services/", userController.getActiveNearbyServices);

userRouter
  .route("/user/addresses")
  .get(authMiddleware("User"), checkUserBlocked, userController.getAddress)
  .post(authMiddleware("User"), checkUserBlocked, userController.addNewAddress)
  .put(authMiddleware("User"), checkUserBlocked, userController.editAddress);

userRouter.delete(
  "/user/addresses:id",
  authMiddleware("User"),
  checkUserBlocked,
  userController.deleteAddress
);

userRouter.route("/reviews").post(userController.addReview);

userRouter.get(
  "/user/profile/serviceprovider-chat/:id",
  userController.getServiceProviderInfoChat
);

userRouter.get(
  "/notification",
  authMiddleware("User"),
  userController.getNotification
);
userRouter.patch(
  "/notification/:id",
  authMiddleware("User"),
  userController.markAsReadNotification
);

userRouter.delete(
  "/notification/:id",
  authMiddleware("User"),
  userController.deleteNotification
);
userRouter.get("/banners/active", userController.getSiteBanners);
userRouter.get("/themes", userController.getSiteThemes);
userRouter.get("/ads/recommend", userController.getRecommendedAds);

// userRouter.get('/services/active-names',userController.getActiveServiceNames)
userRouter.patch(
  "/ads/:adId/click",
  clickLimiter,
  userController.increaseClicks
);

userRouter.get("/coupons/featured", userController.findFeatureCoupons);
export default userRouter;
