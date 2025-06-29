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
exports.register = void 0;
const RegisterUser_1 = require("../../../../application/use-case/User/auth/RegisterUser");
const tsyringe_1 = require("tsyringe");
const HttpStatus_1 = require("../../../../constants/HttpStatus");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registerUser = tsyringe_1.container.resolve(RegisterUser_1.RegisterUser);
        const { userName, email, password, phone } = req.body;
        if (!userName || !password) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: "Username and password are required" });
        }
        const data = {
            userName,
            password,
        };
        if (phone) {
            data.phone = phone;
        }
        else if (email) {
            data.email = email;
        }
        else {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: "Either phone or email is required" });
        }
        const result = yield registerUser.execute(data);
        if (result.user) {
            const regInfo = result.user.phone ? result.user.phone : result.user.email;
            const message = result.user.phone
                ? "OTP sent to phone"
                : "Your account has been successfully created";
            res.status(HttpStatus_1.HttpStatus.CREATED).json({ message, regInfo });
        }
        else if (result.errorMessage) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: result.errorMessage });
        }
    }
    catch (error) {
        let errorMessage = "";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error("Registration error:", errorMessage);
        res
            .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
            .json({ message: errorMessage || "An unexpected error occurred" });
    }
});
exports.register = register;
