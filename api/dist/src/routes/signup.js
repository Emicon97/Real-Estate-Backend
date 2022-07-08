"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signUpControllers_1 = require("../controllers/signUpControllers");
const loginControllers_1 = require("../controllers/loginControllers");
const router = (0, express_1.Router)();
router.post('/', signUpControllers_1.googleSignUp, loginControllers_1.tokenManagement);
exports.default = router;
