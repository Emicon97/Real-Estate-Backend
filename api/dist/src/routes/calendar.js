"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calendarControllers_1 = require("../controllers/calendarControllers");
const JsonWebToken_1 = require("../libs/JsonWebToken");
const router = (0, express_1.Router)();
router.get('/:id', JsonWebToken_1.TokenValidation, calendarControllers_1.getCalendarEvents);
router.post('/:id', JsonWebToken_1.TokenValidation, calendarControllers_1.calendarToken);
router.post('/:id/event', JsonWebToken_1.TokenValidation, calendarControllers_1.createEvent);
exports.default = router;
