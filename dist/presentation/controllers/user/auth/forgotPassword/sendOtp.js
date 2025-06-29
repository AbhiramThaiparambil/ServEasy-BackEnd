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
exports.sendOtp = void 0;
const sendOtp_1 = require("../../../../../application/use-case/User/auth/forgotPassword/sendOtp");
const tsyringe_1 = require("tsyringe");
const HttpStatus_1 = require("../../../../../constants/HttpStatus");
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, phone } = req.body;
        console.log(email);
        if (!email && !phone) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ Message: "Email or phone number is required" });
            return;
        }
        const sendOtp = tsyringe_1.container.resolve(sendOtp_1.SendOtp);
        if (email) {
            const message = yield sendOtp.sendEmailOtp(email);
            if (message.successMessage) {
                res.status(HttpStatus_1.HttpStatus.OK).json({ Message: message });
            }
            if (message.errorMessage) {
                res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ Message: message.errorMessage });
            }
        }
        if (phone) {
            const message = yield sendOtp.sendSmsOtp(phone);
            if (message.successMessage) {
                res.status(HttpStatus_1.HttpStatus.OK).json({ Message: message });
            }
            if (message.errorMessage) {
                res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ Message: message.errorMessage });
            }
        }
    }
    catch (e) {
        console.log(e);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong. Please try again later." });
        return;
    }
});
exports.sendOtp = sendOtp;
