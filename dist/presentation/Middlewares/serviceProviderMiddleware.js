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
exports.serviceProviderAuth = void 0;
const tsyringe_1 = require("tsyringe");
const TokenService_1 = require("../../services/token/TokenService");
const errorUtils_1 = require("../../utils/errorUtils");
const serviceProviderAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Auth middleware called");
    if (!req.cookies.serviceProviderToken) {
        res
            .status(400)
            .json({ message: "Unauthorized: No ServiceProvider token provided" });
        return;
    }
    const tokenService = tsyringe_1.container.resolve(TokenService_1.TokenService);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("No token provided");
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = tokenService.verifyAccessToken(token);
        console.log("Token decoded:", decoded);
        if (!decoded.userId) {
            console.log("Invalid token data");
            res.status(403).json({ message: "Forbidden: Invalid token payload" });
            return;
        }
        const decodedServiceProvider = tokenService.verifyRefreshToken(req.cookies.serviceProviderToken);
        if (!decodedServiceProvider.serviceProvider || !decodedServiceProvider) {
            res
                .status(403)
                .json({ message: "Forbidden: Invalid token serviceProvider" });
            return;
        }
        console.log(decodedServiceProvider.serviceProvider);
        res.locals.serviceProvider_id = decodedServiceProvider.serviceProvider;
        res.locals.user = decoded;
        next();
    }
    catch (error) {
        console.log("Token verification failed:", (0, errorUtils_1.getErrorMessage)(error));
        res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
        return;
    }
});
exports.serviceProviderAuth = serviceProviderAuth;
