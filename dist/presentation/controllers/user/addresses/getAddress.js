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
exports.GetAddressHandler = void 0;
const tsyringe_1 = require("tsyringe");
const GetAddress_1 = require("../../../../application/use-case/User/Address/GetAddress");
const GetAddressHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
        console.log("User ID:", userId);
        if (!userId) {
            res.status(401).json({ message: "Unauthorized: User ID missing" });
            return;
        }
        const getAddress = tsyringe_1.container.resolve(GetAddress_1.GetAddress);
        const allAddress = yield getAddress.execute(userId);
        res.status(200).json({ allAddress });
        return;
    }
    catch (error) {
        console.error("Error fetching address:", error.message || error);
        res.status(500).json({ message: "Failed to fetch address" });
        return;
    }
});
exports.GetAddressHandler = GetAddressHandler;
