import { Router } from "express";
import { Request, Response } from "express";
import { register } from "../controllers/user/auth/siginIn";
import { verifyOtp } from "../controllers/verifyOtp";
import { resendOtp} from "../controllers/user/auth/resendOtp";
import {signIn} from "../controllers/user/auth/SignUp"
import  {authMiddleware} from '../../Middlewares/authMiddleware'
import { userProfile } from "../controllers/home";
const userRouter = Router();

userRouter.post("/signup", register);
userRouter.post("/signin/:method", signIn);

userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/resend-otp", resendOtp);
userRouter.get('/profile',authMiddleware,userProfile)

// /signIn

// userRouter.get("/", (req: Request, res: Response) => {
//   res.send("isWorking");
// });
export default userRouter;
