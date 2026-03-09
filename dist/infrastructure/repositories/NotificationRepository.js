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
exports.NotificationRepository = void 0;
const NotificationModel_1 = __importDefault(require("../models/NotificationModel"));
const tsyringe_1 = require("tsyringe");
let NotificationRepository = class NotificationRepository {
    findNotificationsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return NotificationModel_1.default.find({ userId: userId }).sort({
                notificationTime: -1,
            });
        });
    }
    markNotificationAsRead(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(yield NotificationModel_1.default.findOne({ _id: id }));
            yield NotificationModel_1.default.findByIdAndUpdate({ _id: id }, { $set: { read: true } });
        });
    }
    findNotificationsUnreaded(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return NotificationModel_1.default.countDocuments({ userId: userId, read: false });
        });
    }
    createNotification(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            yield NotificationModel_1.default.create(notification);
        });
    }
    delteSingleNotification(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield NotificationModel_1.default.deleteOne({ _id: id });
        });
    }
    deleteUserAllNotification(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield NotificationModel_1.default.deleteMany({ userId: id });
        });
    }
};
exports.NotificationRepository = NotificationRepository;
exports.NotificationRepository = NotificationRepository = __decorate([
    (0, tsyringe_1.injectable)()
], NotificationRepository);
