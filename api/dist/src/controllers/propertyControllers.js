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
exports.deleteProperties = exports.updateProperties = exports.getPropertyById = exports.getPropertyByOwner = exports.searchProperties = exports.postProperty = void 0;
const propertyHelpers_1 = require("../helpers/propertyHelpers");
const filters_1 = require("../helpers/filters");
function searchProperties(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filter = req.body;
            const { location, max } = req.query;
            const allProperties = yield (0, propertyHelpers_1.getPropertyManager)(filter, location, max);
            const { id: owner, follower } = req.params;
            if (owner !== undefined || follower !== undefined) {
                req.properties = allProperties;
                return next();
            }
            else {
                res.json(allProperties);
            }
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
    });
}
exports.searchProperties = searchProperties;
function getPropertyByOwner(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const properties = req.properties;
            const { follower } = req.params;
            const userProperties = yield (0, filters_1.searchByUser)(user, properties, follower);
            res.json(userProperties);
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
    });
}
exports.getPropertyByOwner = getPropertyByOwner;
function postProperty(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = req.body;
            const property = yield (0, propertyHelpers_1.createProperty)(data, id);
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
    });
}
exports.postProperty = postProperty;
function getPropertyById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const propById = yield (0, propertyHelpers_1.getPropById)(id);
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
    });
}
exports.getPropertyById = getPropertyById;
function updateProperties(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = req.body;
            const message = yield (0, propertyHelpers_1.updateProperty)(id, data);
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
    });
}
exports.updateProperties = updateProperties;
function deleteProperties(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            const message = yield (0, propertyHelpers_1.deleteProperty)(id);
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
    });
}
exports.deleteProperties = deleteProperties;
