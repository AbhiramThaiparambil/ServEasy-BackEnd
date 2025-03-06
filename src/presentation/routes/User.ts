import { Router } from "express";
import { register } from "../controllers/user/auth/signIn";
import { verifyOtp } from "../controllers/user/auth/verifyOtp";
import { resendOtp } from "../controllers/user/auth/resendOtp";
import { signIn } from "../controllers/user/auth/SignUp";
import { authMiddleware } from "../../Middlewares/authMiddleware";
import { userProfile } from "../controllers/user/home";
import { userProfileUpdate } from "../controllers/user/userProfileUpdate";

const userRouter = Router();

userRouter.post("/signup", register);
userRouter.post("/signin/:method", signIn);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/resend-otp", resendOtp);
userRouter.get("/profile", authMiddleware, userProfile);
userRouter.post("/profile", authMiddleware, userProfileUpdate);
// /signIn

// userRouter.get("/", (req: Request, res: Response) => {
//   res.send("isWorking");
// });
export default userRouter;
