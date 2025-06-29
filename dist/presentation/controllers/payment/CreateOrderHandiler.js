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
exports.createOrderHandler = void 0;
const tsyringe_1 = require("tsyringe");
const CreateOrderUseCase_1 = require("../../../application/use-case/payment/CreateOrderUseCase");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const createOrderHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceid } = req.body;
    if (!serviceid) {
        res.status(HttpStatus_1.HttpStatus.BAD_REQUEST);
        res.json({ success: false, message: "Missing or invalid service ID" });
        return;
    }
    try {
        const createOrder = tsyringe_1.container.resolve(CreateOrderUseCase_1.CreateOrderUseCase);
        const result = yield createOrder.execute(serviceid);
        if (!result || result.success === false) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST);
            res.json(result);
            return;
        }
        res.status(HttpStatus_1.HttpStatus.OK);
        res.json(result);
        return;
    }
    catch (error) {
        console.error("Order creation failed:", error);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR);
        res.json({ success: false, message: "Failed to create Razorpay order" });
        return;
    }
});
exports.createOrderHandler = createOrderHandler;
