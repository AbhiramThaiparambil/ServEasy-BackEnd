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
exports.getAutoSuggestions = void 0;
const tsyringe_1 = require("tsyringe");
const autoSuggestion_1 = require("../../../../application/use-case/User/location/autoSuggestion");
const HttpStatus_1 = require("../../../../constants/HttpStatus");
const getAutoSuggestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query; // Fixed typo: "query" instead of "qurey"
        console.log(req.query);
        if (!query) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: "query is required" });
            return;
        }
        const auto = tsyringe_1.container.resolve(autoSuggestion_1.AutoSuggestion);
        const suggestions = yield auto.execute(query);
        console.log(suggestions);
        res.status(HttpStatus_1.HttpStatus.OK).json(suggestions);
        return;
    }
    catch (error) {
        console.error("Error in getAutoSuggestions:", error);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", error });
        return;
    }
});
exports.getAutoSuggestions = getAutoSuggestions;
