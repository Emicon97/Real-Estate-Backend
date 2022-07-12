"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const subscriptionControllers_1 = require("../controllers/subscriptionControllers");
const router = Router();
router.get("/:id", subscriptionControllers_1.getSubscription);
router.post("/", subscriptionControllers_1.postSubscription);
router.put("/:id", subscriptionControllers_1.updateSubscription);
exports.default = router;
