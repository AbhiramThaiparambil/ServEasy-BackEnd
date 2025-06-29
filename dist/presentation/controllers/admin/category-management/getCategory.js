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
exports.getCategoryHandler = void 0;
const tsyringe_1 = require("tsyringe");
const GetCategory_1 = require("../../../../application/use-case/admin/category-management/GetCategory");
const getCategoryHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getCategoryUseCase = tsyringe_1.container.resolve(GetCategory_1.GetCategory);
        const categories = yield getCategoryUseCase.getActiveCategory();
        res.status(200).json(categories);
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
exports.getCategoryHandler = getCategoryHandler;
