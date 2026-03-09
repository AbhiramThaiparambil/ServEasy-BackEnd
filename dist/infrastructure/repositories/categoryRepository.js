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
exports.CategoryRepository = void 0;
const tsyringe_1 = require("tsyringe");
const categoryModel_1 = require("../models/categoryModel");
let CategoryRepository = class CategoryRepository {
    addCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCategory = new categoryModel_1.CategoryModel(category);
            return yield newCategory.save();
        });
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryModel_1.CategoryModel.find();
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryModel_1.CategoryModel.findById(id).exec();
        });
    }
    updateCategory(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryModel_1.CategoryModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield categoryModel_1.CategoryModel.findByIdAndDelete(id).exec();
            return result !== null;
        });
    }
    getActiveCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield categoryModel_1.CategoryModel.find({ isHidden: false });
        });
    }
};
exports.CategoryRepository = CategoryRepository;
exports.CategoryRepository = CategoryRepository = __decorate([
    (0, tsyringe_1.injectable)()
], CategoryRepository);
