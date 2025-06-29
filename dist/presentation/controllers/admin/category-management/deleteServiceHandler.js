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
exports.deleteServiceHandler = void 0;
const tsyringe_1 = require("tsyringe");
const deleteService_1 = require("../../../../application/use-case/admin/category-management/deleteService");
const deleteServiceHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('-----------------------------');
        const { categoryId, serviceId } = req.params;
        console.log(req.params);
        if (!categoryId || !serviceId) {
            res.status(400).json({ message: "Category ID and Service ID are required" });
            return;
        }
        const deleteServiceUseCase = tsyringe_1.container.resolve(deleteService_1.DeleteService);
        const message = yield deleteServiceUseCase.execute(categoryId, serviceId);
        res.status(200).json({ message });
    }
    catch (error) {
        console.error("Error deleting service from category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteServiceHandler = deleteServiceHandler;
