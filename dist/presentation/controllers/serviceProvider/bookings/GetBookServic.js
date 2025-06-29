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
exports.GetServiceProviderBookServiceHandler = void 0;
const tsyringe_1 = require("tsyringe");
const fetchBookedService_1 = require("../../../../application/use-case/bookService/fetchBookedService");
const HttpStatus_1 = require("../../../../constants/HttpStatus");
const GetServiceProviderBookServiceHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceProviderId = res.locals.serviceProvider_id;
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 0;
        const skip = page * limit;
        if (!serviceProviderId) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ error: "Service provider ID is required." });
            return;
        }
        const getBookService = tsyringe_1.container.resolve(fetchBookedService_1.GetBookService);
        const { service, count } = yield getBookService.ServiceProviderBookedServices(serviceProviderId, skip, limit);
        res.status(HttpStatus_1.HttpStatus.OK).json({ service, count });
    }
    catch (error) {
        console.error("Error in GetBookServiceHandler:", error.message, error.stack);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error", details: error.message });
    }
});
exports.GetServiceProviderBookServiceHandler = GetServiceProviderBookServiceHandler;
