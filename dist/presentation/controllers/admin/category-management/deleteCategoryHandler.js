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
exports.deleteCategoryHandler = void 0;
const tsyringe_1 = require("tsyringe");
const deleteCategory_1 = require("../../../../application/use-case/admin/category-management/deleteCategory");
const deleteCategoryHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Category ID is required" });
            return;
        }
        const deleteCategoryUseCase = tsyringe_1.container.resolve(deleteCategory_1.DeleteCategory);
        const message = yield deleteCategoryUseCase.execute(id);
        res.status(200).json({ message });
        return;
    }
    catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.deleteCategoryHandler = deleteCategoryHandler;
