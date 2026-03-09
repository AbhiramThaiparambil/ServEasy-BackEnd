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
exports.checkUserBlocked = void 0;
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../constants/tokens");
const checkUserBlocked = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res
                .status(401)
                .json({ message: "Unauthorized: User not found in request" });
            return;
        }
        const userRepository = tsyringe_1.container.resolve(tokens_1.REPOSITORY_TOKENS.UserRepository);
        const user = yield userRepository.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if (user.isBlocked) {
            res.status(403).json({ message: "User is blocked" });
            return;
        }
        next();
    }
    catch (error) {
        console.error("Error in checkUserBlocked middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.checkUserBlocked = checkUserBlocked;
