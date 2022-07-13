"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const commentControllers_1 = require("../controllers/commentControllers");
const JsonWebToken_1 = require("../libs/JsonWebToken");
const router = Router();
router.post("/:id", JsonWebToken_1.TokenValidation, commentControllers_1.postComment);
exports.default = router;
