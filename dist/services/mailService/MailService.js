"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const tsyringe_1 = require("tsyringe");
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
(0, dotenv_1.config)();
let EmailService = class EmailService {
    constructor() {
        console.log(process.env.EMAIL_SERVICE_HOST);
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.EMAIL_SERVICE_HOST,
            port: Number(process.env.EMAIL_SERVICE_PORT),
            secure: process.env.EMAIL_SERVICE_SECURE === "true",
            auth: {
                user: process.env.EMAIL_SERVICE_EMAIL,
                pass: process.env.EMAIL_SERVICE_PASSWORD,
            },
        });
    }
    sendProviderRejectedEmail(toEmail, providerName, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = `Hello ${providerName !== null && providerName !== void 0 ? providerName : "User"}, unfortunately your provider request was rejected. Reason: ${reason !== null && reason !== void 0 ? reason : "Not specified."}`;
            yield this.transporter.sendMail({
                from: process.env.EMAIL_SERVICE_EMAIL,
                to: toEmail,
                subject: "Account Rejected",
                text: message,
            });
        });
    }
    sendOtpEmail(toEmail, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const templatePath = path_1.default.join(__dirname, "templates", "otp.html");
            let htmlContent = (0, fs_1.readFileSync)(templatePath, "utf8");
            htmlContent = htmlContent.replace(/{{otp}}/g, otp);
            const mail = {
                from: process.env.EMAIL_SERVICE_EMAIL,
                to: toEmail,
                subject: `Your OTP is ${otp}`,
                html: htmlContent,
            };
            console.log("OTP : " + otp);
            yield this.transporter.sendMail(mail);
        });
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
