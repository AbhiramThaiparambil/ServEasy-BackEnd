import express, { Request, Response } from "express";
import { container } from "tsyringe";
import { UserController } from "../controllers/UserController";
import { AdminController } from "../controllers/AdminController";

const router = express.Router();
const userController = container.resolve(UserController);
const adminController = container.resolve(AdminController);

router.post("/refresh-token", (req, res) => userController.refreshToken(req, res));
router.post("/admin-refresh-token", (req, res) => adminController.refreshToken(req, res));
export default router;
