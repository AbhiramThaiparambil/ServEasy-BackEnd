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
exports.blockUnblockServiceProvider = void 0;
const tsyringe_1 = require("tsyringe");
const blockUnblockProvider_1 = require("../../../../application/use-case/admin/serviceProviderManagement/blockUnblockProvider");
const blockUnblockServiceProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { providerId, action } = req.body;
        if (!providerId || !action) {
            res.status(400).json({ message: "serviceId and action are required" });
            return;
        }
        const blockUnblockService = tsyringe_1.container.resolve(blockUnblockProvider_1.BlockUnblockSericeProvider);
        let result;
        if (action === "Block") {
            result = yield blockUnblockService.blockServiceProvider(providerId);
        }
        else if (action === "Unblock") {
            result = yield blockUnblockService.unblockServiceProvider(providerId);
        }
        else {
            res.status(400).json({ message: "Invalid action. Use 'Block' or 'Unblock'." });
            return;
        }
        if (result) {
            res.status(200).json({ message: `Service Provider ${action.toLowerCase()}ed successfully` });
            return;
        }
        else {
            res.status(400).json({ message: `Service Provider  to ${action.toLowerCase()} service` });
            return;
        }
    }
    catch (error) {
        console.error("Error in blockUnblockService:", error);
        res.status(500).json({ message: error.message || "Internal server error" });
        return;
    }
});
exports.blockUnblockServiceProvider = blockUnblockServiceProvider;
