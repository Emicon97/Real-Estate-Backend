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
//ruta detalle get by id
//"_id" para postman--> "62b2748be1138fd711ff07a5",
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const propById = yield (0, propertyControllers_1.getPropById)(id);
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
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const data = req.body;
        const property = yield (0, propertyControllers_1.createProperty)(data, id);
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
router.post('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.body;
        const { location, max } = req.query;
        const allProperties = yield (0, propertyControllers_1.getPropertyManager)(filter, location, max);
        res.json(allProperties);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(404).json(error.message);
        }
        else {
            console.log('Unexpected Error', error);
        }
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const message = yield (0, propertyControllers_1.updateProperty)(id, data);
        res.status(201).send(message);
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
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.body;
        const message = yield (0, propertyControllers_1.deleteProperty)(_id);
        res.status(201).send(message);
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
