"use strict";
// router.post("/refresh-token", refreshAccessToken);
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
exports.refreshAccessToken = void 0;
const TokenService_1 = require("../../../services/auth/TokenService");
const tsyringe_1 = require("tsyringe");
const UserRepositoriey_1 = require("../../../infrastructure/repositories/UserRepositoriey");
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        res.status(401).json({ error: "Refresh token is missing" });
        return;
    }
    try {
        const tokenService = tsyringe_1.container.resolve(TokenService_1.TokenService);
        const userRepo = tsyringe_1.container.resolve(UserRepositoriey_1.MongoUserRepository);
        const decoded = tokenService.verifyRefreshToken(refreshToken);
        if (!decoded) {
            res.status(401).json({ error: "Refresh token is missing" });
            return;
        }
        console.log(decoded.userId);
        const user = yield userRepo.findById(decoded.userId);
        console.log(user);
        if (!user) {
            res.status(404).json({ error: "user no found" });
            return;
        }
        const newAccessToken = yield tokenService.generateAccessToken(user._id + "", "userId");
        res.json({ accessToken: newAccessToken });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
        return;
    }
});
exports.refreshAccessToken = refreshAccessToken;
