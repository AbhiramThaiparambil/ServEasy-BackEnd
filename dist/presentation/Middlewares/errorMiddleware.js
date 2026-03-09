"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const HttpStatus_1 = require("../../constants/HttpStatus");
const errorMiddleware = (err, _req, res, _next) => {
    console.error(err);
    if (err instanceof Error) {
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
        return;
    }
    res
        .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
};
exports.errorMiddleware = errorMiddleware;
