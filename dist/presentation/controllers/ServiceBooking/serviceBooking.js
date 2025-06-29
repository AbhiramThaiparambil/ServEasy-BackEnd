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
exports.bookServiceHandler = void 0;
const tsyringe_1 = require("tsyringe");
const bookService_1 = require("../../../application/use-case/bookService/bookService");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const console_1 = require("console");
const bookServiceHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        (0, console_1.log)("bookServiceHandler called with body:");
        const { address, serviceId, isOnline, preferredServiceTime, liveLocation, slotId } = req.body;
        const userId = (_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId;
        console.log(userId + "userId", serviceId + "serviceId", isOnline + "isOnline", address + "address");
        if (!userId || !serviceId || (!isOnline && !address)) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                error: "Bad Request: Missing required fields (serviceId, address or userId)",
            });
            return;
        }
        const bookService = tsyringe_1.container.resolve(bookService_1.BookService);
        const bookedService = isOnline
            ? yield bookService.bookOnlineService(userId, serviceId, preferredServiceTime, slotId)
            : yield bookService.execute(userId, serviceId, address, preferredServiceTime, liveLocation);
        res.status(HttpStatus_1.HttpStatus.CREATED).json({
            message: "Service booked successfully",
            data: bookedService,
        });
    }
    catch (error) {
        console.error("Error in bookServiceHandler:", error);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
});
exports.bookServiceHandler = bookServiceHandler;
