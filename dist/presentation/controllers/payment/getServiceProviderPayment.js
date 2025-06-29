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
exports.getPaymentDetailsHandler = void 0;
const tsyringe_1 = require("tsyringe");
const getServiceProviderUseCase_1 = require("../../../application/use-case/payment/getServiceProviderUseCase");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const getPaymentDetailsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getPaymentInfo = yield tsyringe_1.container.resolve(getServiceProviderUseCase_1.GetPaymentInfoServiceProviderUseCase);
        const serviceProviderId = res.locals.serviceProvider_id;
        const data = yield getPaymentInfo.serviceProviderInfo(serviceProviderId);
        res.status(HttpStatus_1.HttpStatus.OK).json(data);
    }
    catch (error) {
    }
});
exports.getPaymentDetailsHandler = getPaymentDetailsHandler;
