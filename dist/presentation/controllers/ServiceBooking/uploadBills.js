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
exports.uploadBillsHandler = void 0;
const uploadBills_1 = require("../../../application/use-case/bookService/uploadBills");
const tsyringe_1 = require("tsyringe");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const uploadBillsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { invoices } = req.body;
        if (!Array.isArray(invoices) || invoices.length === 0) {
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ message: "No invoice images provided." });
            return;
        }
        const uploadBills = tsyringe_1.container.resolve(uploadBills_1.UploadBills);
        yield uploadBills.execute(id, invoices);
        res.status(HttpStatus_1.HttpStatus.CREATED).json({ message: "Invoice images uploaded successfully." });
    }
    catch (error) {
        console.error("Error uploading invoice bills:", error);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Failed to upload invoice images." });
    }
});
exports.uploadBillsHandler = uploadBillsHandler;
