"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactControllers_1 = require("../controllers/contactControllers");
const JsonWebToken_1 = require("../libs/JsonWebToken");
const router = (0, express_1.Router)();
router.get('/:id', JsonWebToken_1.TokenValidation, contactControllers_1.getContact);
router.post('/', JsonWebToken_1.TokenValidation, contactControllers_1.postContactForm);
exports.default = router;
