"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const UserController_1 = require("../controllers/UserController");
const AdminController_1 = require("../controllers/AdminController");
const router = express_1.default.Router();
const userController = tsyringe_1.container.resolve(UserController_1.UserController);
const adminController = tsyringe_1.container.resolve(AdminController_1.AdminController);
router.post("/refresh-token", (req, res) => userController.refreshToken(req, res));
router.post("/admin-refresh-token", (req, res) => adminController.refreshToken(req, res));
exports.default = router;
