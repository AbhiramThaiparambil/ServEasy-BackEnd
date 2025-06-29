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
exports.forgotVerifyOtp = void 0;
const forgotVerifyOtp_1 = require("../../../../../application/use-case/User/auth/forgotPassword/forgotVerifyOtp");
const tsyringe_1 = require("tsyringe");
const HttpStatus_1 = require("../../../../../constants/HttpStatus");
const forgotVerifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp, key } = req.body;
        if (!otp || !key) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: "OTP and key are required." });
            return;
        }
        const verifyOtp = tsyringe_1.container.resolve(forgotVerifyOtp_1.ForgotVerifyOtp);
        const result = yield verifyOtp.execute(otp, key);
        if (result === true) {
            res.status(HttpStatus_1.HttpStatus.OK).json({ Message: "OTP verified successfully." });
            return;
        }
        else {
            res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ Message: "OTP expired or invalid." });
            return;
        }
    }
    catch (error) {
        console.error("Error in verifyOtp:", error);
        res
            .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ Message: "Something went wrong. Please try again later." });
    }
    return;
});
exports.forgotVerifyOtp = forgotVerifyOtp;
