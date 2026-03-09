"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSanitizer = void 0;
const userSanitizer = (user) => {
    const safeUser = {
        _id: user._id,
        userName: user.userName,
        email: user.email || null,
        phone: user.phone || null,
        isBlocked: user.isBlocked || false,
        profileImage: user.profileImage,
        isAdmin: user.isAdmin,
    };
    if (user.serviceProvider) {
        safeUser.serviceProvider = user.serviceProvider;
    }
    return safeUser;
};
exports.userSanitizer = userSanitizer;
