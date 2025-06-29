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
exports.addNewAddressHandler = void 0;
const tsyringe_1 = require("tsyringe");
const AddNewAddress_1 = require("../../../../application/use-case/User/Address/AddNewAddress");
const addNewAddressHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { address } = req.body;
        const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
        console.log(userId, address);
        if (!userId) {
            res.status(401).json({ message: "Unauthorized: User ID missing" });
            return;
        }
        if (!address) {
            res.status(400).json({ message: "Address is required" });
            return;
        }
        const addNewAddress = tsyringe_1.container.resolve(AddNewAddress_1.AddNewAddress);
        const resd = yield addNewAddress.execute(userId, address);
        console.log(resd);
        res.status(200).json({ message: "Address added successfully" });
        return;
    }
    catch (error) {
        console.error("Error adding new address:", error);
        res.status(500).json({ message: "Failed to add new address" });
        return;
    }
});
exports.addNewAddressHandler = addNewAddressHandler;
