"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAutoSuggestions_1 = require("../controllers/user/location/getAutoSuggestions");
const locationRouter = (0, express_1.Router)();
locationRouter.get('/autocomplete', getAutoSuggestions_1.getAutoSuggestions);
exports.default = locationRouter;
