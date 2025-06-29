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
exports.userProfileUpdate = void 0;
const tsyringe_1 = require("tsyringe");
const updateProfile_1 = require("../../../application/use-case/User/updateProfile");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const userProfileUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Request Body:", req.body);
        console.log("User ID:", req.params.userid);
        const { newEmail, newPhone, newUserName, NewProfileImage } = req.body;
        const userId = req.params.userid;
        if (!userId) {
            res
                .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                .json({ message: "User ID is required" });
            return;
        }
        const userProfile = tsyringe_1.container.resolve(updateProfile_1.UserProfileUpdate);
        if (newUserName || NewProfileImage) {
            yield userProfile.updateProfile(userId, newUserName, NewProfileImage);
        }
        let otpResponse;
        if (newEmail) {
            otpResponse = yield userProfile.sendEmailOtp(newEmail);
            if (otpResponse.errorMessage) {
                res
                    .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                    .json({ message: otpResponse.errorMessage });
                return;
            }
            res
                .status(HttpStatus_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION)
                .json({ message: otpResponse.successMessage, auth: otpResponse.auth });
            return;
        }
        if (newPhone) {
            otpResponse = yield userProfile.sendSmsOtp(newPhone);
            if (otpResponse.errorMessage) {
                res
                    .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                    .json({ message: otpResponse.errorMessage });
                return;
            }
            res
                .status(HttpStatus_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION)
                .json({ message: otpResponse.successMessage, auth: otpResponse.auth });
            return;
        }
        res.status(HttpStatus_1.HttpStatus.OK).json({ message: "Profile updated successfully" });
        return;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res
            .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "Internal Server Error" });
        return;
    }
});
exports.userProfileUpdate = userProfileUpdate;
