import { Router } from "express";
import { Request, Response } from "express";
import { register } from "../controllers/userController";
import { verifyOtp } from "../controllers/verifyOtp";
import { resendOtp } from "../controllers/resendOtp";
import {signIn} from "../controllers/SignUp"
const userRouter = Router();

userRouter.post("/signup", register);
userRouter.post("/signin", signIn);

userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/resend-otp", resendOtp);



// /signIn

// userRouter.get("/", (req: Request, res: Response) => {
//   res.send("isWorking");
// });
export default userRouter;
