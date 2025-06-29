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
exports.serviceProviderVerify = void 0;
const tsyringe_1 = require("tsyringe");
const serviceProviderRejectUseCase_1 = require("../../../../application/use-case/admin/serviceProviderManagement/serviceProviderRejectUseCase");
const serviceProviderVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serviceProviderId, reason } = req.body;
        const serviceProvider = tsyringe_1.container.resolve(serviceProviderRejectUseCase_1.ServiceProviderRejectVerify);
        const data = yield serviceProvider.verifyServiceProvider(serviceProviderId);
        console.log(data);
        if (data) {
            res.status(200).json({ data });
        }
        else {
            res.status(404).json({ message: "User not found or update failed." });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.serviceProviderVerify = serviceProviderVerify;
