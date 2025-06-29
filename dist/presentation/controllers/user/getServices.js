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
exports.getActiveServices = void 0;
const tsyringe_1 = require("tsyringe");
const getAllService_1 = require("../../../application/use-case/User/getAllService");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const getActiveServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getService = tsyringe_1.container.resolve(getAllService_1.GetAllActiveService);
        console.log(req.query);
        const userLongitude = Number(req.query.userLongitude);
        const userLatitude = Number(req.query.userLatitude);
        let result;
        if (!isNaN(userLongitude) && !isNaN(userLatitude)) {
            result = yield getService.getNearByservices(userLongitude, userLatitude);
        }
        else {
        }
        res.status(HttpStatus_1.HttpStatus.OK).json({ allServices: result });
        return;
    }
    catch (e) {
        console.error(e);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred while fetching services." });
        return;
    }
});
exports.getActiveServices = getActiveServices;
