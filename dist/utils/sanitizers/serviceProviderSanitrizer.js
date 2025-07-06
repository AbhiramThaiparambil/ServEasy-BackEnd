"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceProviderSanitizer = void 0;
const serviceProviderSanitizer = (sp) => {
    var _a;
    return {
        _id: (_a = sp._id) === null || _a === void 0 ? void 0 : _a.toString(),
        serviceProviderName: sp.serviceProviderName,
        serviceProviderEmail: sp.serviceProviderEmail,
        serviceProviderPhone: sp.serviceProviderPhone,
        description: sp.description,
        experience: sp.experience,
        profileImage: sp.profileImage,
        isVerified: sp.isVerified || "pending",
        createdAt: sp.createdAt,
        location: sp.location || "",
        services: sp.services || [],
        isBlocked: sp.isBlocked
    };
};
exports.serviceProviderSanitizer = serviceProviderSanitizer;
