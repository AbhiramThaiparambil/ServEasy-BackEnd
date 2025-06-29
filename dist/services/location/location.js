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
exports.LocationService = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = require("dotenv");
const tsyringe_1 = require("tsyringe");
(0, dotenv_1.config)();
let LocationService = class LocationService {
    constructor() {
        this.locationUrl = "https://us1.locationiq.com/v1/search.php";
        this.locationIqApiKey = process.env.LOCATIONIQ_API_KEY;
    }
    getLocation(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.locationIqApiKey) {
                    throw new Error("LocationIQ API key is not defined");
                }
                const response = yield axios_1.default.get(this.locationUrl, {
                    params: {
                        key: this.locationIqApiKey,
                        q: query,
                        format: "json",
                    },
                });
                if (!response.data.length)
                    return null;
                const result = response.data[0];
                return {
                    address: result.display_name,
                    latitude: parseFloat(result.lat),
                    longitude: parseFloat(result.lon),
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getAutoSuggestions(query) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!this.locationIqApiKey) {
                    throw new Error("LocationIQ API key is not defined");
                }
                const response = yield axios_1.default.get("https://us1.locationiq.com/v1/autocomplete.php", {
                    params: {
                        key: this.locationIqApiKey,
                        q: query,
                        limit: 5,
                        format: "json",
                    },
                });
                const suggestions = response.data.map((item) => ({
                    address: item.display_name,
                    latitude: parseFloat(item.lat),
                    longitude: parseFloat(item.lon),
                }));
                console.log("Auto-suggestions:", suggestions);
                return suggestions; // ✅ Added return statement
            }
            catch (error) {
                console.error("Error in getAutoSuggestions:", ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message || error);
                throw new Error((error === null || error === void 0 ? void 0 : error.message) || "Failed to fetch auto suggestions");
            }
        });
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, tsyringe_1.injectable)()
], LocationService);
