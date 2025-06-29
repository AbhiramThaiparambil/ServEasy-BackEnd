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
exports.verifyOtp = void 0;
const VerifyOtp_1 = require("../../../../application/use-case/User/auth/VerifyOtp");
const tsyringe_1 = require("tsyringe");
const HttpStatus_1 = require("../../../../constants/HttpStatus");
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp, sender } = req.body;
        const verifyOtpUseCase = tsyringe_1.container.resolve(VerifyOtp_1.VerifyOtp);
        const result = yield verifyOtpUseCase.execute(sender, otp);
        console.log(result);
        if (result.success) {
            res.status(HttpStatus_1.HttpStatus.OK).json({ message: result.success });
        }
        else if (result.errorMessage) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ errorMessage: result.errorMessage });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.verifyOtp = verifyOtp;
