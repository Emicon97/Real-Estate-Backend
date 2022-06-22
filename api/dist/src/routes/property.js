"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const propertyControllers_1 = require("../controllers/propertyControllers");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(404).json(error);
        }
        else {
            console.log('Unexpected Error', error);
        }
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { address, area, type, rooms, status, city, bathrooms, neighbourhood, constructionDate, renovationDate, parkingSlot, rentPrice, sellPrice } = req.body;
        const property = yield (0, propertyControllers_1.createProperty)(address, area, type, rooms, status, city, bathrooms, neighbourhood, constructionDate, renovationDate, parkingSlot, rentPrice, sellPrice);
        res.status(201).send(property);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(404).json(error);
        }
        else {
            console.log('Unexpected Error', error);
        }
    }
}));
exports.default = router;
