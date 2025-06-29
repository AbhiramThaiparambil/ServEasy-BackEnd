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
exports.resetPassword = void 0;
const tsyringe_1 = require("tsyringe");
const resetPassword_1 = require("../../../../../application/use-case/User/auth/forgotPassword/resetPassword");
const HttpStatus_1 = require("../../../../../constants/HttpStatus");
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email, phone } = req.body;
        if (!password) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ Message: 'email password is required' });
            return;
        }
        else if (!email && !phone) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ Message: 'email or phone is required' });
            return;
        }
        const resetPassword = tsyringe_1.container.resolve(resetPassword_1.ResetPassword);
        if (email) {
            const result = yield resetPassword.resetPasswordEmail(password, email);
            res.status(HttpStatus_1.HttpStatus.OK).json({ Message: result });
        }
        else if (phone) {
            const result = yield resetPassword.resetPasswordPhone(password, phone);
            res.status(HttpStatus_1.HttpStatus.OK).json({ Message: result });
        }
    }
    catch (error) {
        console.error("Error in resetPassword:", error);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ Message: "Something went wrong. Please try again later." });
        return;
    }
});
exports.resetPassword = resetPassword;
