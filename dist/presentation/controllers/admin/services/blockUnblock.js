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
exports.blockUnblockService = void 0;
const tsyringe_1 = require("tsyringe");
const blockUnblock_1 = require("../../../../application/use-case/admin/service-management/blockUnblock");
const blockUnblockService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serviceId, action } = req.body;
        if (!serviceId || !action) {
            res.status(400).json({ message: "serviceId and action are required" });
            return;
        }
        const blockUnblockService = tsyringe_1.container.resolve(blockUnblock_1.BlockUnblockSericeAdmin);
        let result;
        if (action === "Block") {
            result = yield blockUnblockService.blockService(serviceId);
        }
        else if (action === "Unblock") {
            result = yield blockUnblockService.unblockService(serviceId);
        }
        else {
            res.status(400).json({ message: "Invalid action. Use 'Block' or 'Unblock'." });
            return;
        }
        if (result) {
            res.status(200).json({ message: `Service ${action.toLowerCase()}ed successfully` });
            return;
        }
        else {
            res.status(400).json({ message: `Failed to ${action.toLowerCase()} service` });
            return;
        }
    }
    catch (error) {
        console.error("Error in blockUnblockService:", error);
        res.status(500).json({ message: error.message || "Internal server error" });
        return;
    }
});
exports.blockUnblockService = blockUnblockService;
