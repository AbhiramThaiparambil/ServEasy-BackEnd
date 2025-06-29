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
exports.userProfile = void 0;
const tsyringe_1 = require("tsyringe");
const TokenService_1 = require("../../../services/auth/TokenService");
const GetProfile_1 = require("../../../application/use-case/User/GetProfile");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const userProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUserProfileUseCase = tsyringe_1.container.resolve(GetProfile_1.GetUserProfileUseCase);
        if (req.params.id) {
            const user = yield getUserProfileUseCase.execute(req.params.id);
            res.status(HttpStatus_1.HttpStatus.OK).json({
                userAvatar: user === null || user === void 0 ? void 0 : user.profileImage,
                userName: user === null || user === void 0 ? void 0 : user.userName,
            });
            return;
        }
        else {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(401).json({ message: "Unauthorized: No token provided" });
                return;
            }
            const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
            const tokenService = tsyringe_1.container.resolve(TokenService_1.TokenService);
            const getUserProfileUseCase = tsyringe_1.container.resolve(GetProfile_1.GetUserProfileUseCase);
            const decoded = yield tokenService.verifyAccessToken(token);
            if (!decoded || !decoded.userId) {
                res.status(401).json({ message: "User not found" });
                return;
            }
            const user = yield getUserProfileUseCase.execute(decoded.userId);
            res.status(200).json({ user });
        }
    }
    catch (error) {
        console.error("Error in userProfile:", error);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
});
exports.userProfile = userProfile;
