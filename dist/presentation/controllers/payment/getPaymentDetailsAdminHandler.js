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
exports.getPaymentDetailsAdminHandler = void 0;
const tsyringe_1 = require("tsyringe");
const getServiceProviderUseCase_1 = require("../../../application/use-case/payment/getServiceProviderUseCase");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const getPaymentDetailsAdminHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 0;
        const skip = page * limit;
        const search = req.query.search || '';
        const status = req.query.status || '';
        const statusType = req.query.statusType || 'serviceStatus';
        const getPaymentInfo = yield tsyringe_1.container.resolve(getServiceProviderUseCase_1.GetPaymentInfoServiceProviderUseCase);
        const data = yield getPaymentInfo.adminPaymentInfo(skip, limit, search, status, statusType);
        res.status(HttpStatus_1.HttpStatus.OK).json(data);
    }
    catch (error) { }
});
exports.getPaymentDetailsAdminHandler = getPaymentDetailsAdminHandler;
