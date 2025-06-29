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
exports.EmailOtpService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const tsyringe_1 = require("tsyringe");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let EmailOtpService = class EmailOtpService {
    constructor() {
        console.log(process.env.EMAIL_SERVICE_HOST);
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.EMAIL_SERVICE_HOST,
            port: Number(process.env.EMAIL_SERVICE_PORT),
            secure: process.env.EMAIL_SERVICE_SECURE === "true", // true for port 465, false for other ports
            auth: {
                user: process.env.EMAIL_SERVICE_EMAIL,
                pass: process.env.EMAIL_SERVICE_PASSWORD,
            },
        });
    }
    sendEmail(toEmail, Otp) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(toEmail + "to email is this ");
            const mail = {
                from: process.env.EMAIL_SERVICE_EMAIL,
                to: toEmail,
                subject: `your otp is ${Otp}`,
            };
            console.log(`your otp is ${Otp}`);
            yield this.transporter.sendMail(mail);
        });
    }
};
exports.EmailOtpService = EmailOtpService;
exports.EmailOtpService = EmailOtpService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], EmailOtpService);
