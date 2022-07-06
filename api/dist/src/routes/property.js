"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const propertyControllers_1 = require("../controllers/propertyControllers");
const userControllers_1 = require("../controllers/userControllers");
const JsonWebToken_1 = require("./../libs/JsonWebToken");
const router = (0, express_1.Router)();
router.get('/getownersphone/:id', propertyControllers_1.getOwnersTelephoneByProperty);
router.get('/:id', propertyControllers_1.getPropertyById);
router.post('/search', propertyControllers_1.searchProperties);
router.post('/:id', JsonWebToken_1.TokenValidation, propertyControllers_1.postProperty);
router.post('/:id/search', JsonWebToken_1.TokenValidation, propertyControllers_1.searchProperties, userControllers_1.getOwnerById, propertyControllers_1.getPropertyByOwner);
router.post('/:follower/favourites', JsonWebToken_1.TokenValidation, propertyControllers_1.searchProperties, userControllers_1.getOwnerById, propertyControllers_1.getPropertyByOwner);
router.put('/:id', JsonWebToken_1.TokenValidation, propertyControllers_1.updateProperties);
router.delete('/', JsonWebToken_1.TokenValidation, propertyControllers_1.deleteProperties);
exports.default = router;
