"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const google_1 = require("../controllers/user/auth/google");
const googleRouter = (0, express_1.Router)();
googleRouter.post("/signin", google_1.googleAuth);
exports.default = googleRouter;
