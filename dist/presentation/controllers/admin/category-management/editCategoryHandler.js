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
exports.editCategoryHandler = void 0;
const tsyringe_1 = require("tsyringe");
const editCategory_1 = require("../../../../application/use-case/admin/category-management/editCategory");
const editCategoryHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId, categoryName } = req.body;
        if (!categoryId || !categoryName) {
            res.status(400).json({ message: "Category ID and name are required" });
            return;
        }
        const editCategoryUseCase = tsyringe_1.container.resolve(editCategory_1.EditCategory);
        const data = yield editCategoryUseCase.execute(categoryId, categoryName);
        res.status(200).json({ message: "Category updated successfully", data });
        return;
    }
    catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.editCategoryHandler = editCategoryHandler;
