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
exports.getServiceProvider = void 0;
const tsyringe_1 = require("tsyringe");
const getServiceProvider_1 = require("../../../application/use-case/serviceProvider/auth/getServiceProvider");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const getServiceProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getServiceProvider = tsyringe_1.container.resolve(getServiceProvider_1.GetServiceProvider);
        const user = res.locals.user;
        const result = yield getServiceProvider.execute(user.userId);
        res.status(HttpStatus_1.HttpStatus.CREATED).json({ serviceProvider: result });
    }
    catch (error) { }
});
exports.getServiceProvider = getServiceProvider;
