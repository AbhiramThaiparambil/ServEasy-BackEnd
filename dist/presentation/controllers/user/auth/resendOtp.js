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
exports.resendOtp = void 0;
const ResendOtp_1 = require("../../../../application/use-case/User/auth/ResendOtp");
const tsyringe_1 = require("tsyringe");
const HttpStatus_1 = require("../../../../constants/HttpStatus");
const resendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resendOtp = yield tsyringe_1.container.resolve(ResendOtp_1.ResendOtp);
    if (req.body.email) {
        const result = yield resendOtp.sendEmailOtp(req.body.email);
        console.log(result);
        res.status(HttpStatus_1.HttpStatus.OK).json({ message: result });
        return;
    }
    else if (req.body.phone) {
        const result = yield resendOtp.sendSmsOtp(req.body.phone);
        res.status(HttpStatus_1.HttpStatus.OK).json({ message: result });
        return;
    }
    else {
        res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ errorMessage: "email or phone is required" });
    }
    try {
    }
    catch (error) {
        console.log(error);
    }
});
exports.resendOtp = resendOtp;
