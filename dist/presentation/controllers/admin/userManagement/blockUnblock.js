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
exports.blockUnblock = void 0;
const tsyringe_1 = require("tsyringe");
const blockUnblockUsersUseCase_1 = require("../../../../application/use-case/admin/userManagement/blockUnblockUsersUseCase");
const blockUnblock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, action } = req.body;
        const blockUnblock = tsyringe_1.container.resolve(blockUnblockUsersUseCase_1.blockUnblockUsersUseCase);
        let data;
        if (action == "Block") {
            data = yield blockUnblock.blockUser(userId);
            res.status(200).json({ data });
        }
        else {
            data = yield blockUnblock.unblockUser(userId);
            res.status(200).json({ data });
        }
        if (data) {
            res.status(200).json({ data });
        }
        else {
            res.status(404).json({ message: "User not found or update failed." });
        }
    }
    catch (error) { }
});
exports.blockUnblock = blockUnblock;
