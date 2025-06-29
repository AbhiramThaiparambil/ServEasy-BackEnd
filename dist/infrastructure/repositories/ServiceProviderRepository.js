"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.ServiceProviderRepository = void 0;
const tsyringe_1 = require("tsyringe");
const ServiceProviderModel_1 = __importDefault(require("../models/ServiceProviderModel")); // Mongoose Model
let ServiceProviderRepository = class ServiceProviderRepository {
    create(serviceProvider) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(serviceProvider.bankDetails);
            const newProvider = new ServiceProviderModel_1.default(serviceProvider);
            return yield newProvider.save();
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceProviderModel_1.default.findOne({ email });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceProviderModel_1.default.findById(id);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceProviderModel_1.default.findByIdAndUpdate(id, data, {
                new: true,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ServiceProviderModel_1.default.findByIdAndDelete(id);
            return result !== null;
        });
    }
    findServiceProviderSkipLimit(skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceProviderModel_1.default.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        });
    }
    findServiceProvidersCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceProviderModel_1.default.countDocuments();
        });
    }
    findByUserID(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceProviderModel_1.default.findOne({ userId: userId });
        });
    }
    blockService(ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ServiceProviderModel_1.default.updateOne({ _id: ProviderId }, { $set: { isBlocked: true } });
                return result.modifiedCount > 0;
            }
            catch (error) {
                throw error;
            }
        });
    }
    unblockService(ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ServiceProviderModel_1.default.updateOne({ _id: ProviderId }, { $set: { isBlocked: false } });
                return result.modifiedCount > 0;
            }
            catch (error) {
                throw error;
            }
        });
    }
    editProvider(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data._id) {
                throw new Error("Provider ID is required to edit provider.");
            }
            const existingProvider = yield this.findById(data._id + "");
            if (!existingProvider) {
                throw new Error("Service Provider not found.");
            }
            const isUnchanged = Object.keys(data).every((key) => {
                // @ts-ignore 
                return data[key] === existingProvider[key];
            });
            if (isUnchanged) {
                return true;
            }
            yield ServiceProviderModel_1.default.findByIdAndUpdate(data._id, data, { new: true });
            return true;
        });
    }
};
exports.ServiceProviderRepository = ServiceProviderRepository;
exports.ServiceProviderRepository = ServiceProviderRepository = __decorate([
    (0, tsyringe_1.injectable)()
], ServiceProviderRepository);
