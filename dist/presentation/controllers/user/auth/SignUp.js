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
exports.signIn = void 0;
const dotenv_1 = require("dotenv");
const HttpStatus_1 = require("../../../../constants/HttpStatus");
const setAuthCookies_1 = require("../../../../utils/setAuthCookies");
const SignIn_1 = require("../../../../application/use-case/User/auth/SignIn");
(0, dotenv_1.config)();
const signInUseCase = SignIn_1.SignIn.create();
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { method } = req.params;
    try {
        if (method === "email") {
            const { email, password } = req.body;
            if (!email || !password) {
                res
                    .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                    .json({ error: "Email and password are required" });
                return;
            }
            const result = yield signInUseCase.signInWithEmail(email, password);
            console.log(result);
            if (result === null || result === void 0 ? void 0 : result.errorMessage) {
                res.status(401).json({ error: result.errorMessage });
                return;
            }
            if (result === null || result === void 0 ? void 0 : result.refreshToken) {
                (0, setAuthCookies_1.setAuthCookies)(res, "refreshToken", result === null || result === void 0 ? void 0 : result.refreshToken);
            }
            res.status(HttpStatus_1.HttpStatus.OK).json({ accessToken: result === null || result === void 0 ? void 0 : result.accessToken });
            return;
        }
        if (method === "phone") {
            console.log("Phone Sign-In");
            const { phone, password } = req.body;
            if (!phone || !password) {
                res
                    .status(HttpStatus_1.HttpStatus.BAD_REQUEST)
                    .json({ error: "Phone and password are required" });
                return;
            }
            const result = yield signInUseCase.signInWithPhone(phone, password);
            if (result === null || result === void 0 ? void 0 : result.errorMessage) {
                res
                    .status(HttpStatus_1.HttpStatus.UNAUTHORIZED)
                    .json({ error: result.errorMessage });
                return;
            }
            if (result === null || result === void 0 ? void 0 : result.refreshToken) {
                (0, setAuthCookies_1.setAuthCookies)(res, "refreshToken", result === null || result === void 0 ? void 0 : result.refreshToken);
            }
            res.status(HttpStatus_1.HttpStatus.OK).json({ accessToken: result === null || result === void 0 ? void 0 : result.accessToken });
            return;
        }
    }
    catch (error) {
        console.error(error);
        res
            .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: "Internal Server Error" });
        return;
    }
});
exports.signIn = signIn;
