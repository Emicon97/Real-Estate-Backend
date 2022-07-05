"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const router = (0, express_1.Router)();
router.get('/:id', userControllers_1.getOwnerById);
router.get('/', userControllers_1.getUsers);
router.post('/', userControllers_1.postUser);
router.put('/addfavs/:id', userControllers_1.addFavs);
router.put('/:id', userControllers_1.updateData);
router.delete('/', userControllers_1.banUser);
exports.default = router;
