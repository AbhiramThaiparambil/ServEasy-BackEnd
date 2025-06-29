"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../../Middlewares/authMiddleware");
const tsyringe_1 = require("tsyringe");
const UserController_1 = require("../controllers/UserController");
const userController = tsyringe_1.container.resolve(UserController_1.UserController);
const userRouter = (0, express_1.Router)();
userRouter.post("/signup", userController.registerUserController);
userRouter.post("/signin/:method", userController.signInUserController);
userRouter.post("/verify-otp", userController.verifyOtpController);
userRouter.post("/resend-otp", userController.resendOtpController);
userRouter.get("/profile", (0, authMiddleware_1.authMiddleware)("User"), userController.userProfileController);
userRouter.post("/forgot-password", userController.sendOtpController);
userRouter.post("/forgot-password/verify-otp", userController.forgotVerifyOtp);
userRouter.post("/forgot-password/reset", userController.resetPassword);
userRouter.put("/updateProfile/:userid", userController.userProfileUpdateController);
userRouter.post("/updateProfile/verifyotp", userController.profileUpdateOtpController);
userRouter.get("/logout", userController.logoutUserController);
userRouter.get("/user/service/:id", userController.getSingleServiceHandler);
userRouter.get("/user/profile/:id", userController.userProfileController);
// userRouter.get("/getactive/services",userController.getActiveServices);
userRouter.get("/getactive/services/", userController.getActiveNearbyServices);
userRouter
    .route("/user/addresses")
    .get((0, authMiddleware_1.authMiddleware)("User"), userController.getAddress)
    .post((0, authMiddleware_1.authMiddleware)("User"), userController.addNewAddress)
    .put((0, authMiddleware_1.authMiddleware)("User"), userController.editAddress);
userRouter.delete("/user/addresses:id", (0, authMiddleware_1.authMiddleware)("User"), userController.deleteAddress);
userRouter.route("/reviews").post(userController.addReview);
userRouter.get("/user/profile/serviceprovider-chat/:id", userController.getServiceProviderInfoChat);
userRouter.get("/notification", (0, authMiddleware_1.authMiddleware)("User"), userController.getNotification);
userRouter.patch("/notification/:id", (0, authMiddleware_1.authMiddleware)("User"), userController.markAsReadNotification);
userRouter.delete("/notification/:id", (0, authMiddleware_1.authMiddleware)("User"), userController.deleteNotification);
userRouter.get("/banners/active", userController.getSiteBanners);
userRouter.get("/themes", userController.getSiteThemes);
// userRouter.get('/services/active-names',userController.getActiveServiceNames)
exports.default = userRouter;
