import { Router } from "express";
import { Request, Response } from "express";
import { register, sendOtp } from "../controllers/userController";
const userRouter = Router();

userRouter.post("/signup", register);
userRouter.post("/signin", (req,res)=>{
    console.log('-------------------');
    
  console.log(req.body);
  res.status(200)
  
});

// /signIn
userRouter.post("/send-otp", sendOtp);



userRouter.get("/", (req: Request, res: Response) => {
  res.send("isWorking");
});
export default userRouter;
