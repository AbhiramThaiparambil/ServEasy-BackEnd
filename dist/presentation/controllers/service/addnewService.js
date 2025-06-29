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
exports.addNewService = void 0;
const tsyringe_1 = require("tsyringe");
const addnewService_1 = require("../../../application/service-management/addnewService");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const addNewService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serviceName, description, serviceType, category, location, estimatedPrice, serviceImage, serviceProviderId } = req.body;
        if (!serviceName ||
            !description ||
            !serviceType ||
            !category ||
            !location ||
            !estimatedPrice ||
            !serviceImage ||
            !serviceProviderId) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ error: 'Bad Request: Missing required fields' });
            return;
        }
        const updateLocation = {
            type: "Point",
            coordinates: [location.longitude, location.latitude],
            address: location.address
        };
        const serviceData = {
            serviceName,
            description,
            serviceType,
            category,
            location: updateLocation,
            estimatedPrice,
            serviceImage,
            serviceProviderId
        };
        const addNewService = tsyringe_1.container.resolve(addnewService_1.AddNewService);
        const service = yield addNewService.execute(serviceData);
        res.status(HttpStatus_1.HttpStatus.CREATED).json({ data: service });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        return;
    }
});
exports.addNewService = addNewService;
