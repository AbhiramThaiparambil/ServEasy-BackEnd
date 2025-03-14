import { Router } from "express";
import {googleAuth} from '../controllers/user/auth/google'
const googleRouter=Router()

googleRouter.post("/signin",googleAuth);


export default googleRouter
