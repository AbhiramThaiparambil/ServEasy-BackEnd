"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AutoSuggestionController_1 = require("../controllers/AutoSuggestionController");
const locationRouter = (0, express_1.Router)();
locationRouter.get('/autocomplete', AutoSuggestionController_1.getAutoSuggestions);
exports.default = locationRouter;
