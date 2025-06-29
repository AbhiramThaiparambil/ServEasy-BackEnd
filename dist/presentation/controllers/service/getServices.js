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
exports.getServices = void 0;
const tsyringe_1 = require("tsyringe");
const getServices_1 = require("../../../application/service-management/getServices");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const getServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getService = tsyringe_1.container.resolve(getServices_1.GetService);
        const serviceProviderId = res.locals.serviceProvider_id;
        if (!serviceProviderId) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: "Service Provider ID is required." });
            return;
        }
        const result = yield getService.execute(serviceProviderId);
        res.status(HttpStatus_1.HttpStatus.OK).json({ allServices: result });
        return;
    }
    catch (e) {
        console.error(e);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred while fetching services." });
        return;
    }
});
exports.getServices = getServices;
