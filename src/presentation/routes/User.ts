import { Router } from "express";
import { Request, Response } from "express";
import { register } from "../controllers/userController";
import { verifyOtp } from "../controllers/verifyOtp";
const userRouter = Router();

userRouter.post("/signup", register);
userRouter.post("/verify-otp",verifyOtp);

// /signIn



// userRouter.get("/", (req: Request, res: Response) => {
//   res.send("isWorking");
// });
export default userRouter;
