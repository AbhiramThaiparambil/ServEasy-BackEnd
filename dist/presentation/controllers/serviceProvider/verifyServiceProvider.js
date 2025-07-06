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
exports.verifyServiceProvider = void 0;
const VerifyServiceProvider_1 = require("../../../application/use-case/serviceProvider/VerifyServiceProvider");
const tsyringe_1 = require("tsyringe");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const setAuthCookies_1 = require("../../../utils/setAuthCookies");
const verifyServiceProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verifyServiceProvideruseCase = tsyringe_1.container.resolve(VerifyServiceProvider_1.VerifyServiceProvider);
        const user = res.locals.user;
        if (!user || !user.userId) {
            res
                .status(HttpStatus_1.HttpStatus.UNAUTHORIZED)
                .json({ message: "Unauthorized access" });
            return;
        }
        const refreshToken = yield verifyServiceProvideruseCase.execute(user.userId);
        if (!refreshToken) {
            res
                .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                .json({ message: "Not a valid service provider" });
            return;
        }
        (0, setAuthCookies_1.setAuthCookies)(res, 'serviceProviderToken', refreshToken);
        res.status(HttpStatus_1.HttpStatus.OK).json({ message: "Service provider verified" });
        return;
    }
    catch (error) {
        console.error("Error in getServiceProvider:", error);
        res
            .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "Internal server error" });
        return;
    }
});
exports.verifyServiceProvider = verifyServiceProvider;
