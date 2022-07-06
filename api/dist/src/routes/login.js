"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginControllers_1 = require("../controllers/loginControllers");
const router = (0, express_1.Router)();
router.post('/', loginControllers_1.standardLogIn, loginControllers_1.googleLogIn, loginControllers_1.tokenManagement);
exports.default = router;
