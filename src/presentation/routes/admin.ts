import express,{Request,Response} from "express";
import {signIn} from "../controllers/admin/signin"
import { adminAuthMiddleware } from "../../Middlewares/adminAuthMiddleware";
const router = express.Router();

router.post("/signin",signIn)
router.get("/r",adminAuthMiddleware,(req: Request, res: Response) => {

    console.log('hey r is called ')
  res.send("isWorking");
});



export default router;