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
exports.CouponRepository = void 0;
const couponModel_1 = require("../models/couponModel");
const tsyringe_1 = require("tsyringe");
const mongoose_1 = require("mongoose");
let CouponRepository = class CouponRepository {
    findAllCoupons() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield couponModel_1.CouponModel.find().lean();
        });
    }
    createCoupon(coupon) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCoupon = new couponModel_1.CouponModel(coupon);
            return yield newCoupon.save();
        });
    }
    makeCouponInactive(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield couponModel_1.CouponModel.updateOne({ _id: new mongoose_1.Types.ObjectId(id) }, { isActive: false }).exec();
        });
    }
    toggleShowInBanner(id, show) {
        return __awaiter(this, void 0, void 0, function* () {
            yield couponModel_1.CouponModel.updateOne({ _id: new mongoose_1.Types.ObjectId(id) }, { showInBanner: show }).exec();
        });
    }
    findAllActiveCoupons() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield couponModel_1.CouponModel.find({
                isActive: true,
                validFrom: { $lte: new Date() },
                validTo: { $gte: new Date() },
            }).lean();
        });
    }
    updateCouponShowInBanner(id, action) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield couponModel_1.CouponModel.updateOne({ _id: id }, { $set: { showInBanner: action } });
            return result.modifiedCount > 0;
        });
    }
    updateCouponStatus(id, action) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield couponModel_1.CouponModel.updateOne({ _id: id }, { $set: { isActive: action } });
            return result.modifiedCount > 0;
        });
    }
    findFeaturedCoupons(skip) {
        return __awaiter(this, void 0, void 0, function* () {
            const total = yield couponModel_1.CouponModel.countDocuments({
                isActive: true,
                showInBanner: true,
                validFrom: { $lte: new Date() },
                validTo: { $gte: new Date() },
            });
            if (total === 0)
                return { coupon: null, total: 0 };
            const coupon = yield couponModel_1.CouponModel.findOne({
                isActive: true,
                showInBanner: true,
                validFrom: { $lte: new Date() },
                validTo: { $gte: new Date() },
            })
                .select("code description discountValue validTo")
                .sort({ createdAt: -1 })
                .skip(skip)
                .lean();
            return {
                coupon: coupon || null,
                total,
            };
        });
    }
    findByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield couponModel_1.CouponModel.findOne({ code }).lean();
        });
    }
    hasUserUsedCoupon(code, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongoose_1.Types.ObjectId(userId);
            const record = yield couponModel_1.CouponModel.findOne({ code, usedBy: objectId });
            return !!record;
        });
    }
    checkIsExceedMaxUseLimit(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield couponModel_1.CouponModel.findById(_id);
            if (!record)
                return true;
            if (!record.usageLimit)
                return false;
            return record.usedBy.length >= record.usageLimit;
        });
    }
    markUsedByUser(code, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield couponModel_1.CouponModel.updateOne({ code }, { $addToSet: { usedBy: new mongoose_1.Types.ObjectId(userId) } });
        });
    }
    removeCoupon(userId, couponId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield couponModel_1.CouponModel.updateOne({ _id: couponId }, { $pull: { usedBy: userId } });
        });
    }
};
exports.CouponRepository = CouponRepository;
exports.CouponRepository = CouponRepository = __decorate([
    (0, tsyringe_1.injectable)()
], CouponRepository);
