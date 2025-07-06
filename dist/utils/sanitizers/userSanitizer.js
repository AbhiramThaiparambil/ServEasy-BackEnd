"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSanitizer = void 0;
const mongoose_1 = require("mongoose");
const userSanitizer = (user) => {
    const safeUser = {
        _id: user._id,
        userName: user.userName,
        email: user.email || null,
        phone: user.phone || null,
        isBlocked: user.isBlocked || false,
        profileImage: user.profileImage,
        isAdmin: user.isAdmin
    };
    if (user.serviceProvider instanceof mongoose_1.Types.ObjectId) {
        safeUser.serviceProvider = user.serviceProvider;
    }
    return safeUser;
};
exports.userSanitizer = userSanitizer;
