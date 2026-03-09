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
const autoSuggestion_1 = require("../../application/use-case/user/location/autoSuggestion");
const HttpStatus_1 = require("../../constants/HttpStatus");
const errorUtils_1 = require("../../utils/errorUtils");
const getAutoSuggestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        console.log(req.query);
        if (!query) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: "query is required" });
            return;
        }
        const auto = tsyringe_1.container.resolve(autoSuggestion_1.AutoSuggestion);
        const dto = { query: query };
        const suggestions = yield auto.execute(dto);
        console.log(suggestions);
        res.status(HttpStatus_1.HttpStatus.OK).json(suggestions);
        return;
    }
    catch (error) {
        console.error("Error in getAutoSuggestions:", (0, errorUtils_1.getErrorMessage)(error));
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", error: (0, errorUtils_1.getErrorMessage)(error) });
        return;
    }
});
exports.getAutoSuggestions = getAutoSuggestions;
