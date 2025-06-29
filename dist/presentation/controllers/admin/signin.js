"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const signin_1 = require("../../../application/use-case/admin/auth/signin");
const dotenv_1 = require("dotenv");
const tsyringe_1 = require("tsyringe");
(0, dotenv_1.config)();
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, phone, password } = req.body;
        console.log(email, phone, password);
        if (!password || (!email && !phone)) {
            res
                .status(400)
                .json({ error: "Email or phone and password are required" });
            return;
        }
        const signInUseCase = tsyringe_1.container.resolve(signin_1.Signin);
        let result;
        if (email) {
            console.log("Email Sign-In");
            result = yield signInUseCase.signByEmail(email, password);
        }
        else if (phone) {
            console.log("Phone Sign-In");
            result = yield signInUseCase.signByPhone(phone, password);
        }
        if (!result) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const { accessToken, refreshToken, user } = result;
        res.cookie("adminToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        });
        res.status(200).json({ accessToken, user });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
});
exports.signIn = signIn;
