"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginControlles_1 = require("../controllers/loginControlles");
const router = (0, express_1.Router)();
router.post('/', loginControlles_1.standardLogIn, loginControlles_1.googleLogIn, loginControlles_1.tokenManagement);
exports.default = router;
