import express,{Request,Response} from "express";
 import {RegistrationServiceProvider} from "../controllers/serviceProvider/Registration";

const router = express.Router();

router.post("/register",RegistrationServiceProvider);
router.get("/r", (req: Request, res: Response) => {
  res.send("isWorking");
});

export default router;
