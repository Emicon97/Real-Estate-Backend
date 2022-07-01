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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProperty = exports.deleteProperty = exports.getPropById = exports.getPropertyByOwner = exports.searchProperties = exports.createProperty = void 0;
const properties_1 = __importDefault(require("../models/properties"));
const users_1 = __importDefault(require("./../models/users"));
function searchProperties(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filter = req.body;
            const { location, max } = req.query;
            const allProperties = yield getPropertyManager(filter, location, max);
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
            const userProperties = yield searchByUser(user, properties, follower);
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
function getPropertyManager(filters, location, max) {
    return __awaiter(this, void 0, void 0, function* () {
        const allProperties = yield getAllProperties();
        if ((filters && Object.keys(filters).length) && location) {
            const filtered = yield searchByFilter(filters, max);
            const searched = yield searchByLocation(location, filtered);
            return searched;
        }
        else if ((filters && Object.keys(filters).length)) {
            const filtered = yield searchByFilter(filters, max);
            return filtered;
        }
        else if (location) {
            const searched = yield searchByLocation(location, allProperties);
            return searched;
        }
        else {
            return allProperties;
        }
    });
}
function getAllProperties() {
    return __awaiter(this, void 0, void 0, function* () {
        const allProperties = yield properties_1.default.find();
        if (allProperties.length) {
            return allProperties;
        }
        throw new Error("No se encontraron propiedades.");
    });
}
function searchByFilter(filtered, max) {
    return __awaiter(this, void 0, void 0, function* () {
        if (max) {
            const property = yield properties_1.default.find(filtered)
                .where('price').gt(0).lt(max);
            return property;
        }
        else {
            const property = yield properties_1.default.find(filtered);
            return property;
        }
    });
}
function searchByLocation(location, properties) {
    return __awaiter(this, void 0, void 0, function* () {
        const toFilter = [];
        const names = location.trim().split(' ');
        properties.forEach((property) => {
            names.forEach((word) => {
                var _a;
                if (word.length) {
                    if (!toFilter.includes(property) &&
                        property.city.includes(word)) {
                        toFilter.push(property);
                    }
                    else if (!toFilter.includes(property) &&
                        ((_a = property.neighbourhood) === null || _a === void 0 ? void 0 : _a.includes(word)) &&
                        property.neighbourhood !== 'No especificado') {
                        toFilter.push(property);
                    }
                }
            });
        });
        return toFilter;
    });
}
function searchByUser(user, properties, follower) {
    return __awaiter(this, void 0, void 0, function* () {
        const userProperties = [];
        const search = follower ? user.favourites : user.properties;
        search.forEach((property) => {
            properties.forEach((one) => {
                if (property.id === one.id) {
                    userProperties.push(one);
                }
            });
        });
        return userProperties;
    });
}
function getPropById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const propById = yield properties_1.default.findById(id);
        if (propById !== null) {
            return propById;
        }
        throw new Error("Esta propiedad no está disponible.");
    });
}
exports.getPropById = getPropById;
function createProperty(data, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const properties = yield properties_1.default.create(data);
        const savedProperty = yield properties.save();
        yield users_1.default.findByIdAndUpdate(id, { $push: { properties } });
        return savedProperty;
    });
}
exports.createProperty = createProperty;
function updateProperty(_id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield properties_1.default.findOneAndUpdate({ _id }, data, { new: true });
        return 'Propiedad actualizada con éxito.';
    });
}
exports.updateProperty = updateProperty;
function deleteProperty(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield properties_1.default.findByIdAndDelete(id);
        return 'Propiedad eliminada con éxito.';
    });
}
exports.deleteProperty = deleteProperty;
