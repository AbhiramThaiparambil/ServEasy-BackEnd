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
exports.blockUnblockServiceHandler = void 0;
const tsyringe_1 = require("tsyringe");
const blockUnblockService_1 = require("../../../../application/use-case/admin/category-management/blockUnblockService ");
const blockUnblockServiceHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId, serviceId } = req.body;
        console.log(req.body);
        if (!categoryId || !serviceId) {
            res.status(400).json({ message: "Category ID and Service ID are required" });
            return;
        }
        const blockUnblockCategoryUseCase = tsyringe_1.container.resolve(blockUnblockService_1.BlockUnblockCategoryService);
        const message = yield blockUnblockCategoryUseCase.execute(categoryId, serviceId);
        res.status(200).json({ message });
        return;
    }
    catch (error) {
        console.error("Error updating service visibility:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.blockUnblockServiceHandler = blockUnblockServiceHandler;
