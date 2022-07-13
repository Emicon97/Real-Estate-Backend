"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const commentControllers_1 = require("../controllers/commentControllers");
const router = Router();
router.post("/:id", commentControllers_1.postComment);
exports.default = router;
