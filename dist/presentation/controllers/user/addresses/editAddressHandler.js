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
exports.editAddressHandler = void 0;
const tsyringe_1 = require("tsyringe");
const EditAddress_1 = require("../../../../application/use-case/User/Address/EditAddress");
const editAddressHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('-9-0-0-0-0-0-0-0-0');
        console.log(req.body);
        const { address } = req.body;
        const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
        console.log("User ID:", userId, "Updated Address:", address);
        if (!userId) {
            res.status(401).json({ message: "Unauthorized: User ID missing" });
            return;
        }
        if (!address) {
            res.status(400).json({ message: "Updated address data is required" });
            return;
        }
        const editAddressUseCase = tsyringe_1.container.resolve(EditAddress_1.EditAddress);
        yield editAddressUseCase.execute(userId, address);
        res.status(200).json({ message: "Address updated successfully" });
        return;
    }
    catch (error) {
        console.error("Error updating address:", error);
        res.status(500).json({ message: "Failed to update address" });
        return;
    }
});
exports.editAddressHandler = editAddressHandler;
