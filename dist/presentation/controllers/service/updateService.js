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
exports.updateService = void 0;
const tsyringe_1 = require("tsyringe");
const EditService_1 = require("../../../application/service-management/EditService");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serviceId } = req.params;
        if (!serviceId) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ error: "Bad Request: Missing serviceId" });
            return;
        }
        const { serviceName, description, serviceType, category, location, estimatedPrice, serviceImage, serviceProviderId, } = req.body;
        // Validate required fields
        if (!serviceName || !description || !serviceType || !category || !location || !estimatedPrice || !serviceImage || !serviceProviderId) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ error: "Bad Request: Missing required fields" });
            return;
        }
        const serviceData = {
            serviceName,
            description,
            serviceType,
            category,
            location,
            estimatedPrice,
            serviceImage: "",
            serviceProviderId,
        };
        const editService = tsyringe_1.container.resolve(EditService_1.EditService);
        const updatedService = yield editService.execute(serviceId, serviceData, serviceImage);
        if (!updatedService) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ error: "Service not found or not updated" });
            return;
        }
        res.status(HttpStatus_1.HttpStatus.OK).json({ message: "Service updated successfully", data: updatedService });
    }
    catch (error) {
        console.error(error);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    }
});
exports.updateService = updateService;
