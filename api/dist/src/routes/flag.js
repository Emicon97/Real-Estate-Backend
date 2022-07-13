"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flagControllers_1 = require("../controllers/flagControllers");
const JsonWebToken_1 = require("../libs/JsonWebToken");
const router = (0, express_1.Router)();
router.get("/:id", JsonWebToken_1.TokenValidation, flagControllers_1.getReportsByOwner);
router.post("/:id", flagControllers_1.postReport);
exports.default = router;
