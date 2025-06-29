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
exports.addServiceHandler = void 0;
const tsyringe_1 = require("tsyringe");
const addService_1 = require("../../../../application/use-case/admin/category-management/addService");
const addServiceHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId, newServiceName, newServiceDescription } = req.body;
        const addService = tsyringe_1.container.resolve(addService_1.AddService);
        const service = yield addService.execute(categoryId, {
            serviceName: newServiceName,
            serviceDescription: newServiceDescription,
            isHidden: false,
        });
        res.status(200).json({ message: service });
    }
    catch (error) {
        console.error("Error adding service:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.addServiceHandler = addServiceHandler;
