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
exports.getSingleServiceHandler = void 0;
const tsyringe_1 = require("tsyringe");
const GetServics_1 = require("../../../application/use-case/User/GetServics");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const getSingleServiceHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        if (!id) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: "Service ID is required" });
            return;
        }
        const getService = tsyringe_1.container.resolve(GetServics_1.GetServics);
        const data = yield getService.execute(id);
        if (!data.services) {
            res.status(HttpStatus_1.HttpStatus.NOT_FOUND).json({ message: "Service not found" });
            return;
        }
        res.status(HttpStatus_1.HttpStatus.OK).json(data);
    }
    catch (error) {
        console.error("Error fetching service:", error);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
});
exports.getSingleServiceHandler = getSingleServiceHandler;
