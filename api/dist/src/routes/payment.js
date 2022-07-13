"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const paymentController_1 = require("../controllers/paymentController");
const JsonWebToken_1 = require("./../libs/JsonWebToken");
const router = Router();
router.get("/:id", paymentController_1.getPayment);
router.post("/", JsonWebToken_1.TokenValidation, paymentController_1.postPayment);
exports.default = router;
