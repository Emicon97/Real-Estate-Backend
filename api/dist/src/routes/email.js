"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailControllers_1 = require("../controllers/emailControllers");
const router = (0, express_1.Router)();
router.post("/", emailControllers_1.emailSender);
exports.default = router;
