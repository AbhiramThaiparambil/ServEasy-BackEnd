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
exports.MongoUserRepository = void 0;
const UserModel_1 = require("../models/UserModel");
const tsyringe_1 = require("tsyringe");
const bcrypt_1 = require("bcrypt");
const errorUtils_1 = require("../../utils/errorUtils");
let MongoUserRepository = class MongoUserRepository {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new UserModel_1.UserModel(user);
            yield newUser.save();
            return newUser;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.UserModel.findOne({ email });
        });
    }
    findByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.UserModel.findOne({ phone });
        });
    }
    HashPassword(passWord) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, bcrypt_1.hash)(passWord, 10);
        });
    }
    comparePassword(passWord1, password2) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, bcrypt_1.compare)(passWord1, password2);
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield UserModel_1.UserModel.findByIdAndUpdate(user._id, { isVerified: user.isVerified }, { new: true });
                return result !== null;
            }
            catch (error) {
                console.error("Error updating user:", (0, errorUtils_1.getErrorMessage)(error));
                return false;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.UserModel.findById(id);
        });
    }
    addServiceProviderId(userId, serviceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield UserModel_1.UserModel.findByIdAndUpdate(userId, { serviceProvider: serviceProviderId }, // Store serviceProvider ID in user document
                { new: true });
                console.log(result);
                return result !== null;
            }
            catch (error) {
                console.error("Error updating user:", (0, errorUtils_1.getErrorMessage)(error));
                return false;
            }
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.UserModel.find();
        });
    }
    updateUserField(userId, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield UserModel_1.UserModel.findByIdAndUpdate(userId, { [field]: value }, { new: true });
                return result !== null;
            }
            catch (error) {
                console.error("Error updating user:", (0, errorUtils_1.getErrorMessage)(error));
                return false;
            }
        });
    }
    updatePassword(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield UserModel_1.UserModel.updateOne({ _id: userId }, { $set: { password: newPassword } });
            return result.modifiedCount > 0;
        });
    }
    updateUserBasedId(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield UserModel_1.UserModel.findByIdAndUpdate(userId, { $set: updateData }, { new: true } // Return updated document
                );
                return !!updatedUser; // Return true if update successful, false otherwise
            }
            catch (error) {
                console.error("Error updating user:", (0, errorUtils_1.getErrorMessage)(error));
                return false;
            }
        });
    }
    // async addAddress(userId:String,address:IAddress){
    //   user
    // }
    findUsersSkipLimit(skip, limit, search) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.UserModel.find({
                $or: [
                    { userName: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                ],
            })
                .skip(skip)
                .limit(limit);
        });
    }
    userCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return UserModel_1.UserModel.countDocuments();
        });
    }
};
exports.MongoUserRepository = MongoUserRepository;
exports.MongoUserRepository = MongoUserRepository = __decorate([
    (0, tsyringe_1.injectable)()
], MongoUserRepository);
