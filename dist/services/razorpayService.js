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
exports.RazorpayService = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const tsyringe_1 = require("tsyringe");
const razorpay_utils_1 = require("razorpay/dist/utils/razorpay-utils");
// import { IBankDetails } from "../domain/entities/IServiceProvider";
let RazorpayService = class RazorpayService {
    constructor() {
        console.log(process.env.RAZORPAY_KEY_ID);
        console.log(process.env.RAZORPAY_KEY_SECRET);
        this.razorpay = new razorpay_1.default({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }
    // async createLinkedAccountTest(bankInfo:IBankDetails): Promise<string> {
    //   const serviceProvider = {
    //     name: bankInfo.accountHolderName,
    //     ifsc: bankInfo.ifscCode,
    //     accountNumber: bankInfo.accountNumber,
    //   };
    //   const response = await axios.post(
    //     "https://api.razorpay.com/v1/accounts",
    //     {
    //       type: "individual",
    //       legal_business_name: serviceProvider.name,
    //       business_type: "individual",
    //       contact_name: serviceProvider.name,
    //       bank_account: {
    //         name: serviceProvider.name,
    //         ifsc: serviceProvider.ifsc,
    //         account_number: serviceProvider.accountNumber,
    //       },
    //     },
    //     {
    //       auth: {
    //         username: process.env.RAZORPAY_KEY_ID!,
    //         password: process.env.RAZORPAY_KEY_SECRET!,
    //       },
    //     }
    //   );
    //   console.log("✅ Linked Account Created:", response.data);
    //   return response.data.id; 
    // }
    createOrder(payment, linkedAccountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const providerShare = Math.round(payment.total - payment.convenienceFee);
            const order = yield this.razorpay.orders.create({
                amount: payment.total * 100,
                currency: "INR",
                payment_capture: true,
                receipt: `receipt_${Date.now()}`,
                // transfers: [
                //   {
                //     account: linkedAccountId, 
                //     amount: providerShare,
                //     currency: "INR",
                //     notes: {
                //       description: "90% to service provider",
                //     },
                //     on_hold: false,
                //   },
                // ],
            });
            return order;
        });
    }
    verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
        return __awaiter(this, void 0, void 0, function* () {
            const isValid = (0, razorpay_utils_1.validatePaymentVerification)({
                order_id: razorpay_order_id,
                payment_id: razorpay_payment_id,
            }, razorpay_signature, process.env.RAZORPAY_KEY_SECRET);
            if (!isValid) {
                throw new Error("Invalid Razorpay signature");
            }
            const paymentDetails = yield this.razorpay.payments.fetch(razorpay_payment_id);
            return {
                id: paymentDetails.id,
                status: paymentDetails.status,
                method: paymentDetails.method,
                amount: paymentDetails.amount,
                currency: paymentDetails.currency,
                captured: paymentDetails.captured,
                email: paymentDetails.email,
                contact: paymentDetails.contact,
                created_at: paymentDetails.created_at,
                notes: paymentDetails.notes,
                fee: paymentDetails.fee,
                tax: paymentDetails.tax,
            };
        });
    }
};
exports.RazorpayService = RazorpayService;
exports.RazorpayService = RazorpayService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], RazorpayService);
