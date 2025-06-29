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
exports.googleAuth = void 0;
const tsyringe_1 = require("tsyringe");
const googleAuth_1 = require("../../../../application/use-case/User/auth/googleAuth");
const HttpStatus_1 = require("../../../../constants/HttpStatus");
const setAuthCookies_1 = require("../../../../utils/setAuthCookies");
const googleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { googleToken } = req.body;
        if (!googleToken) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: "google token is Required" });
        }
        const googleUseCase = tsyringe_1.container.resolve(googleAuth_1.GoogleAuthUseCase);
        const result = yield googleUseCase.execute(googleToken);
        (0, setAuthCookies_1.setAuthCookies)(res, result === null || result === void 0 ? void 0 : result.refreshToken);
        res.status(HttpStatus_1.HttpStatus.OK).json({ accessToken: result === null || result === void 0 ? void 0 : result.accessToken });
    }
    catch (error) {
        console.error(error);
    }
});
exports.googleAuth = googleAuth;
