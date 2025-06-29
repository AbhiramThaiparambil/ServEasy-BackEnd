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
exports.addReviewHandler = void 0;
const tsyringe_1 = require("tsyringe");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const AddReviewUseCase_1 = require("../../../application/use-case/bookService/AddReviewUseCase");
const addReviewHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookedServiceId, serviceId, rating, comment } = req.body;
        console.log(req.body);
        if (!bookedServiceId || !serviceId || rating === undefined) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                message: "bookedServiceId, serviceId, and rating are required.",
            });
            return;
        }
        if (comment && typeof comment !== "string") {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({
                message: "Comment must be a string.",
            });
            return;
        }
        const addReviewUseCase = tsyringe_1.container.resolve(AddReviewUseCase_1.AddReviewUseCase);
        yield addReviewUseCase.execute(bookedServiceId, serviceId, rating, comment);
        res
            .status(HttpStatus_1.HttpStatus.CREATED)
            .json({ message: "Review added successfully!" });
    }
    catch (error) {
        console.error("Error adding review:", error);
        res
            .status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "Failed to add review." });
    }
});
exports.addReviewHandler = addReviewHandler;
