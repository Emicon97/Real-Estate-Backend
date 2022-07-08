"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const paymentControllers_1 = require("../controllers/paymentControllers");
const router = Router();
router.get('/:id', paymentControllers_1.getPayment);
router.post('/', paymentControllers_1.postPayment);
router.put('/', paymentControllers_1.updatePayment);
exports.default = router;
