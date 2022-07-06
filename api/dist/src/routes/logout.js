"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logoutControllers_1 = require("../controllers/logoutControllers");
const router = (0, express_1.Router)();
router.get('/:owner', logoutControllers_1.logout);
exports.default = router;
