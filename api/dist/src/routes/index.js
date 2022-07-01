"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const { Router } = require('express');
const login_1 = __importDefault(require("./login"));
const property_1 = __importDefault(require("./property"));
const user_1 = __importDefault(require("./user"));
const calendar_1 = __importDefault(require("./calendar"));
const router = Router();
router.use('/login', login_1.default);
router.use('/property', property_1.default);
router.use('/user', user_1.default);
router.use('/calendar', calendar_1.default);
module.exports = router;
