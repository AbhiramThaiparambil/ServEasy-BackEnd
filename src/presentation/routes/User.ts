import { Router } from "express";
import { Request, Response } from "express";
import { register } from "../controllers/user/auth/signIn";
import { verifyOtp } from "../controllers/user/auth/verifyOtp";
import { resendOtp } from "../controllers/user/auth/resendOtp";
import { signIn } from "../controllers/user/auth/SignUp";
import { authMiddleware } from "../../Middlewares/authMiddleware";
import { userProfile } from "../controllers/user/home";
import { sendOtp } from "../controllers/user/auth/forgotPassword/sendOtp";
import { forgotVerifyOtp } from "../controllers/user/auth/forgotPassword/verifyOtp";
import { resetPassword } from "../controllers/user/auth/forgotPassword/resetPassword";
import { userProfileUpdate } from "../controllers/user/userProfileUpdate";
import { profileUpdateOtp } from "../controllers/user/profileUpdateOtp";
import { logoutUser } from "../controllers/user/logoutUser";
import { getActiveServices } from "../controllers/user/getServices";
import { getSingleServiceHandler } from "../controllers/user/getSingleServiceHandile";
import { addNewAddressHandler } from "../controllers/user/addresses/addNewAddressHandiler";
import { deleteAddressHandler } from "../controllers/user/addresses/deleteAddressHandiler";
import { setDefaultAddressHandiler } from "../controllers/user/addresses/setDefaultAddressHandiler";
import { GetAddressHandler } from "../controllers/user/addresses/getAddress";
import { editAddressHandler } from "../controllers/user/addresses/editAddressHandler";

const userRouter = Router();
userRouter.post("/signup", register);
userRouter.post("/signin/:method", signIn);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/resend-otp", resendOtp);
userRouter.get("/profile", authMiddleware, userProfile);
userRouter.post("/forgot-password", sendOtp);
userRouter.post("/forgot-password/verify-otp", forgotVerifyOtp);
userRouter.post("/forgot-password/reset", resetPassword);
userRouter.put("/updateProfile/:userid", userProfileUpdate);
userRouter.post("/updateProfile/verifyotp", profileUpdateOtp);
userRouter.get("/logout", logoutUser);
userRouter.get("/user/service/:id", getSingleServiceHandler);
userRouter.get("/getactive/services", authMiddleware,getActiveServices);

userRouter.route("/user/addresses").get(authMiddleware,GetAddressHandler).post(authMiddleware,addNewAddressHandler).put(authMiddleware,editAddressHandler)

userRouter.delete("/user/addresses:id",authMiddleware,deleteAddressHandler)
//.patch(setDefaultAddressHandiler)
export default userRouter;
