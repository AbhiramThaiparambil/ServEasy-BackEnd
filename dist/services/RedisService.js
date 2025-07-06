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
exports.RedisService = void 0;
const tsyringe_1 = require("tsyringe");
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let RedisService = class RedisService {
    constructor() {
        const redisUrl = process.env.REDIS_URL;
        if (!redisUrl) {
            throw new Error('"REDIS_URL is not defined in the environment variables"');
        }
        this.client = new ioredis_1.default(redisUrl);
        this.client.on('error', err => {
            console.log('redis Error ');
            console.log(err);
        });
    }
    set(key, otp, expiry) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.set(key, otp, 'EX', expiry);
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.get(key);
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.del(key);
        });
    }
    setLock(key, ttlSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.set(key, 'locked', 'EX', ttlSeconds, 'NX');
            return result === 'OK';
        });
    }
    releaseLock(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.del(key);
        });
    }
    isLocked(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.get(key);
            return !!result;
        });
    }
    saveUser(userKey, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const ttlSeconds = 60 * 2;
            const userData = JSON.stringify(user);
            yield this.client.set(userKey, userData, 'EX', ttlSeconds);
        });
    }
    getUser(userKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.client.get(userKey);
            if (!data)
                return null;
            return JSON.parse(data);
        });
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], RedisService);
