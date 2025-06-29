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
exports.getServiceProviderInfoChatHandiler = void 0;
const tsyringe_1 = require("tsyringe");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const getServiceProviderInfoUseCase_1 = require("../../../application/use-case/User/getServiceProviderInfoUseCase");
const getServiceProviderInfoChatHandiler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getServiceProviderInfoUseCase = tsyringe_1.container.resolve(getServiceProviderInfoUseCase_1.GetServiceProviderInfoUseCase);
        if (req.params.id) {
            const user = yield getServiceProviderInfoUseCase.execute(req.params.id);
            res.status(HttpStatus_1.HttpStatus.OK).json({
                userAvatar: user === null || user === void 0 ? void 0 : user.profileImage,
                userName: user === null || user === void 0 ? void 0 : user.serviceProviderName,
            });
            return;
        }
    }
    catch (error) {
        console.error("Error in userProfile:", error);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
});
exports.getServiceProviderInfoChatHandiler = getServiceProviderInfoChatHandiler;
