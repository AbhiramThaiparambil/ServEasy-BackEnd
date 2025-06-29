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
exports.profileUpdateOtp = void 0;
const tsyringe_1 = require("tsyringe");
const profileUpdateOtp_1 = require("../../../application/use-case/User/profileUpdateOtp");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const profileUpdateOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, key, otp } = req.body;
        const profileUpdateOtp = tsyringe_1.container.resolve(profileUpdateOtp_1.ProfileUpdateOtp);
        const result = yield profileUpdateOtp.execute(userId, key, otp);
        if (result.success) {
            res.status(HttpStatus_1.HttpStatus.OK).json({ message: result.success });
        }
        else if (result.errorMessage) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ errorMessage: result.errorMessage });
        }
        else {
            res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ errorMessage: "Internal server error" });
        }
    }
    catch (error) {
        console.error("Error in profileUpdateOtp:", error);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ errorMessage: "Internal server error" });
    }
});
exports.profileUpdateOtp = profileUpdateOtp;
