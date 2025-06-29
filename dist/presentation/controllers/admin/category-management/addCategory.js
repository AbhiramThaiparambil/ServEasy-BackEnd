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
exports.addCategoryHandler = void 0;
const tsyringe_1 = require("tsyringe");
const addCategory_1 = require("../../../../application/use-case/admin/category-management/addCategory");
const addCategoryHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { newCategory } = req.body;
        console.log(newCategory);
        if (!newCategory) {
            res.status(400).json({ message: "Category is required" });
            return;
        }
        const addCategoryUseCase = tsyringe_1.container.resolve(addCategory_1.AddCategory);
        const data = yield addCategoryUseCase.execute({ category: newCategory });
        res.status(200).json({ data });
        return;
    }
    catch (error) {
        console.error("Error adding category:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.addCategoryHandler = addCategoryHandler;
