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
exports.logoutUser = void 0;
const HttpStatus_1 = require("../../../constants/HttpStatus");
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        if (req.cookies.serviceProviderToken) {
            res.clearCookie("serviceProviderToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
        }
        res.status(HttpStatus_1.HttpStatus.OK).json({ message: "User logged out successfully" });
        return;
    }
    catch (error) {
        console.error("Logout error:", error);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        return;
    }
});
exports.logoutUser = logoutUser;
