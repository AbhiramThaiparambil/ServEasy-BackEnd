import { Router } from "express";
import { Request, Response } from "express";
import {  register} from "../controllers/user/auth/signIn";
import { verifyOtp } from "../controllers/user/auth/verifyOtp";
import { resendOtp} from "../controllers/user/auth/resendOtp";
import {signIn} from "../controllers/user/auth/SignUp"
import  {authMiddleware} from '../../Middlewares/authMiddleware'
import { userProfile } from "../controllers/user/home";
import { sendOtp } from "../controllers/user/auth/forgotPassword/sendOtp";
import { forgotVerifyOtp} from "../controllers/user/auth/forgotPassword/verifyOtp";
import {resetPassword} from "../controllers/user/auth/forgotPassword/resetPassword";

const userRouter = Router();

userRouter.post("/signup", register);
userRouter.post("/signin/:method", signIn);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/resend-otp", resendOtp);
userRouter.get('/profile',authMiddleware,userProfile)
userRouter.post("/forgot-password",sendOtp);
userRouter.post("/forgot-password/verify-otp",forgotVerifyOtp);
userRouter.post("/forgot-password/reset",resetPassword);

// /signIn

// userRouter.get("/", (req: Request, res: Response) => {
//   res.send("isWorking");
// });
export default userRouter;
