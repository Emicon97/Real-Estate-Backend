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
        let allP = yield (0, propertyControllers_1.getAllProperties)();
        res.json(allP);
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
//ruta detalle get by id
//"_id" para postman--> "62b2748be1138fd711ff07a5",
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        let propById = yield (0, propertyControllers_1.getPropById)(id);
        res.json(propById);
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
        const data = req.body;
        const property = yield (0, propertyControllers_1.createProperty)(data);
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
