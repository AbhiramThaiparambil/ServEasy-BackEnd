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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetWalletUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const tokens_1 = require("../../../../../constants/tokens");
let GetWalletUseCase = class GetWalletUseCase {
    constructor(walletRepository) {
        this.walletRepository = walletRepository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const wallet = yield this.walletRepository.findProviderWalletWithPaginatedTransactions(data.serviceProviderId, data.limit, data.skip);
            if (!wallet) {
                return null;
            }
            const count = yield this.walletRepository.findCountOfTransactions(data.serviceProviderId);
            return {
                _id: (_a = wallet.serviceProviderId) === null || _a === void 0 ? void 0 : _a.toString(),
                serviceProviderId: ((_b = wallet.serviceProviderId) === null || _b === void 0 ? void 0 : _b.toString()) || "",
                balance: wallet.balance,
                transactions: ((_c = wallet.transactions) === null || _c === void 0 ? void 0 : _c.map(tx => ({
                    amount: tx.amount,
                    type: tx.type,
                    status: tx.status || "none",
                    date: tx.date || new Date(),
                    note: tx.note || undefined
                }))) || [],
                totalTransactions: count
            };
        });
    }
};
exports.GetWalletUseCase = GetWalletUseCase;
exports.GetWalletUseCase = GetWalletUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.WalletRepository)),
    __metadata("design:paramtypes", [Object])
], GetWalletUseCase);
