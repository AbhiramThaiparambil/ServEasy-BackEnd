import { Router } from "express";

import { authMiddleware } from "../../Middlewares/authMiddleware";
import { container } from "tsyringe";
import { UserController } from "../controllers/UserController";
const userController= container.resolve(UserController)
const userRouter = Router();



userRouter.post("/signup",userController.registerUserController);
userRouter.post("/signin/:method", userController.signInUserController);
userRouter.post("/verify-otp", userController.verifyOtpController);
userRouter.post("/resend-otp", userController.resendOtpController);
userRouter.get("/profile", authMiddleware("User"), userController.userProfileController);

userRouter.post("/forgot-password", userController.sendOtpController);
userRouter.post("/forgot-password/verify-otp", userController.forgotVerifyOtp);
userRouter.post("/forgot-password/reset", userController.resetPassword);
userRouter.put("/updateProfile/:userid", userController.userProfileUpdateController);
userRouter.post("/updateProfile/verifyotp", userController.profileUpdateOtpController);
userRouter.get("/logout", userController.logoutUserController);

userRouter.get("/user/service/:id", userController.getSingleServiceHandler);
userRouter.get("/user/profile/:id", userController.userProfileController);
userRouter.get("/getactive/services",authMiddleware("User"),userController.getActiveServices);

userRouter
  .route("/user/addresses")
  .get(authMiddleware("User"), userController.getAddress) 
  .post(authMiddleware("User"), userController.addNewAddress)
  .put(authMiddleware("User"), userController.editAddress);

userRouter.delete(
  "/user/addresses:id",
  authMiddleware("User"),
  userController.deleteAddress
);

userRouter.route("/reviews").post(userController.addReview);


userRouter.get(
  "/user/profile/serviceprovider-chat/:id",userController.getServiceProviderInfoChat);

userRouter.get("/notification",  authMiddleware("User"),userController.getNotification);
userRouter.patch("/notification/:id",  authMiddleware("User"),userController.markAsReadNotification);

userRouter.delete("/notification/:id",authMiddleware("User"),userController.deleteNotification);
export default userRouter;
