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
exports.NotificationUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const NotificationRepository_1 = require("../../../infrastructure/repositories/NotificationRepository");
const mongoose_1 = require("mongoose");
let NotificationUseCase = class NotificationUseCase {
    constructor(NotificationRepository) {
        this.NotificationRepository = NotificationRepository;
    }
    getNotification(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const notifications = yield this.NotificationRepository.findNotificationsByUserId(new mongoose_1.Types.ObjectId(userId));
            const unreadedNotification = yield this.NotificationRepository.findNotificationsUnreaded(new mongoose_1.Types.ObjectId(userId));
            return { notifications, unreadedNotification };
        });
    }
    markAsRead(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.NotificationRepository.markNotificationAsRead(new mongoose_1.Types.ObjectId(id));
        });
    }
    create(content, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.NotificationRepository.createNotification({ content, userId: new mongoose_1.Types.ObjectId(id) });
        });
    }
    deleteSingleNotification(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.NotificationRepository.delteSingleNotification(new mongoose_1.Types.ObjectId(userId));
            return yield this.NotificationRepository.findNotificationsByUserId(new mongoose_1.Types.ObjectId(userId));
        });
    }
    delteAllNotification(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.NotificationRepository.deleteUserAllNotification(new mongoose_1.Types.ObjectId(userId));
        });
    }
};
exports.NotificationUseCase = NotificationUseCase;
exports.NotificationUseCase = NotificationUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('NotificationRepository')),
    __metadata("design:paramtypes", [NotificationRepository_1.NotificationRepository])
], NotificationUseCase);
