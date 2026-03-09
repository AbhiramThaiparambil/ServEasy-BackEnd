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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.SubscriptionCheckJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const tokens_1 = require("../../../constants/tokens");
const tsyringe_1 = require("tsyringe");
let SubscriptionCheckJob = class SubscriptionCheckJob {
    constructor(manageSubscriptionUseCase) {
        this.manageSubscriptionUseCase = manageSubscriptionUseCase;
        //    ( async () => {
        //                   console.log("Running subscription check... (first call,)");
        //     await this.manageSubscriptionUseCase.execute()})()
    }
    schedule() {
        node_cron_1.default.schedule("27 13 * * *", () => __awaiter(this, void 0, void 0, function* () {
            console.log(" Running subscription check... (test every second)");
            const result = yield this.manageSubscriptionUseCase.execute();
            console.log(`Processed ${result.processedCount} subscriptions.`);
        }));
    }
};
exports.SubscriptionCheckJob = SubscriptionCheckJob;
exports.SubscriptionCheckJob = SubscriptionCheckJob = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.USE_CASE_TOKENS.ManageServiceProviderSubscriptionsUseCase)),
    __metadata("design:paramtypes", [Object])
], SubscriptionCheckJob);
