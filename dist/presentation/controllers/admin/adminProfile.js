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
exports.adminProfile = void 0;
const tsyringe_1 = require("tsyringe");
const TokenService_1 = require("../../../services/auth/TokenService");
const profile_1 = require("../../../application/use-case/admin/profile");
const adminProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ message: "Unauthorized: No token provided" });
            return;
        }
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        console.log(authHeader);
        const tokenService = tsyringe_1.container.resolve(TokenService_1.TokenService);
        const getAdminProfileUseCase = tsyringe_1.container.resolve(profile_1.GetAdminProfileUseCase);
        const decoded = yield tokenService.verifyAccessToken(token);
        console.log('--------admin-profile-------');
        console.log(decoded);
        if (!decoded || !decoded.adminId) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        const data = yield getAdminProfileUseCase.execute(decoded.adminId);
        res.status(200).json({ data });
    }
    catch (error) { }
});
exports.adminProfile = adminProfile;
