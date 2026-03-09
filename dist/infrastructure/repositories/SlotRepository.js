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
exports.SlotRepository = void 0;
const mongoose_1 = require("mongoose");
const SlotModel_1 = require("../models/SlotModel");
const tsyringe_1 = require("tsyringe");
let SlotRepository = class SlotRepository {
    createSlot(slot) {
        return __awaiter(this, void 0, void 0, function* () {
            const slotToSave = Object.assign(Object.assign({}, slot), { serviceId: new mongoose_1.Types.ObjectId(slot.serviceId) });
            const created = new SlotModel_1.SlotModel(slotToSave);
            const saved = yield created.save();
            return {
                _id: saved._id.toString(),
                serviceId: saved.serviceId,
                startTime: saved.startTime,
                endTime: saved.endTime,
                booked: saved.booked,
                createdAt: saved.createdAt,
            };
        });
    }
    deleteSlotById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield SlotModel_1.SlotModel.findByIdAndDelete(id);
            return !!result;
        });
    }
    markSlotAsBooked(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const doc = yield SlotModel_1.SlotModel.findByIdAndUpdate(id, { booked: true }, { new: true }).lean();
            return doc
                ? {
                    _id: (_a = doc._id) === null || _a === void 0 ? void 0 : _a.toString(),
                    serviceId: doc.serviceId,
                    startTime: doc.startTime,
                    endTime: doc.endTime,
                    booked: doc.booked,
                    createdAt: doc.createdAt,
                }
                : null;
        });
    }
    getSlotById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const doc = yield SlotModel_1.SlotModel.findById(id).lean();
            return doc
                ? {
                    _id: (_a = doc._id) === null || _a === void 0 ? void 0 : _a.toString(),
                    serviceId: doc.serviceId,
                    startTime: doc.startTime,
                    endTime: doc.endTime,
                    booked: doc.booked,
                    createdAt: doc.createdAt,
                }
                : null;
        });
    }
    getSlotByServiceId(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SlotModel_1.SlotModel.find({ serviceId });
        });
    }
    getSlotByServiceIdLearn(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SlotModel_1.SlotModel.find({ serviceId }).lean();
        });
    }
    getActiveSlotsByServiceId(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            return SlotModel_1.SlotModel.find({
                serviceId: new mongoose_1.Types.ObjectId(serviceId),
                startTime: { $gt: now },
                booked: false,
            })
                .sort({ startTime: 1 })
                .lean();
        });
    }
    cleanupOldSlots() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield SlotModel_1.SlotModel.deleteMany({
                $expr: {
                    $lt: [
                        "$startTime",
                        {
                            $dateTrunc: {
                                date: "$$NOW",
                                unit: "day",
                                timezone: "Asia/Kolkata",
                            },
                        },
                    ],
                },
            });
            return (_a = result.deletedCount) !== null && _a !== void 0 ? _a : 0;
        });
    }
};
exports.SlotRepository = SlotRepository;
exports.SlotRepository = SlotRepository = __decorate([
    (0, tsyringe_1.injectable)()
], SlotRepository);
