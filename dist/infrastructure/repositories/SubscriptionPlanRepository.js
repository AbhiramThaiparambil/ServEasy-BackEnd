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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionPlanRepository = void 0;
const tsyringe_1 = require("tsyringe");
const SubscriptionPlanModel_1 = require("../models/SubscriptionPlanModel");
const mongoose_1 = require("mongoose");
const errorUtils_1 = require("../../utils/errorUtils");
let SubscriptionPlanRepository = class SubscriptionPlanRepository {
    createSubscriptionPlan(plan) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPlan = new SubscriptionPlanModel_1.SubscriptionPlanModel(plan);
                return (yield newPlan.save()).toObject();
            }
            catch (error) {
                console.log((0, errorUtils_1.getErrorMessage)(error));
                return null;
            }
        });
    }
    findSubscriptionPlanById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SubscriptionPlanModel_1.SubscriptionPlanModel.findById(new mongoose_1.Types.ObjectId(id));
        });
    }
    findAllSubscriptionPlans() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SubscriptionPlanModel_1.SubscriptionPlanModel.find();
        });
    }
    updateSubscriptionPlanById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield SubscriptionPlanModel_1.SubscriptionPlanModel.findByIdAndUpdate(id, data, { new: true });
            }
            catch (error) {
                console.log((0, errorUtils_1.getErrorMessage)(error));
                return null;
            }
        });
    }
    deleteSubscriptionPlanById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield SubscriptionPlanModel_1.SubscriptionPlanModel.findByIdAndDelete(id);
            return !!result;
        });
    }
};
exports.SubscriptionPlanRepository = SubscriptionPlanRepository;
exports.SubscriptionPlanRepository = SubscriptionPlanRepository = __decorate([
    (0, tsyringe_1.injectable)()
], SubscriptionPlanRepository);
