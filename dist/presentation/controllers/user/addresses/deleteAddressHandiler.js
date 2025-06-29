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
exports.deleteAddressHandler = void 0;
const tsyringe_1 = require("tsyringe");
const DeleteAddress_1 = require("../../../../application/use-case/User/Address/DeleteAddress");
const deleteAddressHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        console.log(id);
        const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
        console.log("User ID:", userId, "Address ID:", id);
        if (!userId) {
            res.status(401).json({ message: "Unauthorized: User ID missing" });
            return;
        }
        if (!id) {
            res.status(400).json({ message: "Address ID is required" });
            return;
        }
        const deleteAddressUseCase = tsyringe_1.container.resolve(DeleteAddress_1.DeleteAddress);
        yield deleteAddressUseCase.execute(userId, id);
        res.status(200).json({ message: "Address deleted successfully" });
        return;
    }
    catch (error) {
        console.error("Error deleting address:", error);
        res.status(500).json({ message: "Failed to delete address" });
        return;
    }
});
exports.deleteAddressHandler = deleteAddressHandler;
