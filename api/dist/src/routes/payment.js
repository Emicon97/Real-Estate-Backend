"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const paymentController_1 = require("../controllers/paymentController");
const router = Router();
router.get("/:id", paymentController_1.getPayment);
router.post("/", paymentController_1.postPayment);
exports.default = router;
