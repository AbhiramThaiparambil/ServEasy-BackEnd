import express,{Request,Response} from "express";
import {signIn} from "../controllers/admin/signin"
import {adminProfile} from "../controllers/admin/adminProfile"
import { adminAuthMiddleware } from "../../Middlewares/adminAuthMiddleware";
import { getAllUsers } from "../controllers/admin/userManagement/getAllUsers";
import { blockUnblock } from "../controllers/admin/userManagement/blockUnblock";
const router = express.Router();

router.post("/signin",signIn)
router.get('/profile',adminAuthMiddleware,adminProfile)
// router.post('/profile',adminAuthMiddleware,adminProfile)


// getAllUsers:'/admin/users',
//     blockUser:'/admin/users/block',
//     unblockUser:'/admin/users/unblock'

// adminAuthMiddleware
router.get('/users',getAllUsers)
router.patch('/users/block-unblock',adminAuthMiddleware,blockUnblock)












router.get("/r",adminAuthMiddleware,(req: Request, res: Response) => {

    console.log('hey r is called ')
  res.send("isWorking");
});



export default router;