"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const { Router } = require('express');
const property_1 = __importDefault(require("./property"));
const router = Router();
router.use('/logout', property_1.default);
module.exports = router;
