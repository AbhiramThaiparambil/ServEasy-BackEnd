"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getString = void 0;
const getString = (value) => {
    if (typeof value === 'string') {
        return value;
    }
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
        return value[0];
    }
    return '';
};
exports.getString = getString;
