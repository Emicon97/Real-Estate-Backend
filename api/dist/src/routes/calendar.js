"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calendarControllers_1 = require("../controllers/calendarControllers");
const router = (0, express_1.Router)();
router.get('/:id', calendarControllers_1.getCalendarEvents);
router.post('/:id', calendarControllers_1.calendarToken);
router.post('/:id/event', calendarControllers_1.createEvent);
exports.default = router;
