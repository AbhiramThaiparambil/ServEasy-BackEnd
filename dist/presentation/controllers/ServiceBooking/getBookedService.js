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
exports.GetbookServiceHandler = void 0;
const tsyringe_1 = require("tsyringe");
const fetchBookedService_1 = require("../../../application/use-case/bookService/fetchBookedService");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const GetbookServiceHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const bookService = tsyringe_1.container.resolve(fetchBookedService_1.GetBookService);
        const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (req.query.count) {
            const count = yield bookService.findBookedServiceUserCount(userId);
            res.status(HttpStatus_1.HttpStatus.OK).json({ count });
            return;
        }
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 0;
        const skip = page * limit;
        const service = yield bookService.UserBookedServices(userId, skip, limit);
        res.status(HttpStatus_1.HttpStatus.OK).json({ service });
    }
    catch (error) {
        console.error("Error in bookServiceHandler:", error);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
});
exports.GetbookServiceHandler = GetbookServiceHandler;
