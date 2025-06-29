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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleBookedServiceHandler = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = __importDefault(require("mongoose"));
const GetBookedServiceById_1 = require("../../../application/use-case/bookService/GetBookedServiceById");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const getSingleBookedServiceHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ error: "Invalid service booking ID" });
            return;
        }
        const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
        console.log("Authenticated User ID:", userId);
        const bookService = tsyringe_1.container.resolve(GetBookedServiceById_1.GetBookSingleService);
        const service = yield bookService.userBookedService(new mongoose_1.default.Types.ObjectId(id));
        res.status(HttpStatus_1.HttpStatus.OK).json({ service });
    }
    catch (error) {
        console.error("Error in getSingleBookedServiceHandler:", error);
        res
            .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
            .json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
});
exports.getSingleBookedServiceHandler = getSingleBookedServiceHandler;
