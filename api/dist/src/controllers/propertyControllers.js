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
exports.updateProperty = exports.deleteProperty = exports.getPropById = exports.getPropertyManager = exports.createProperty = void 0;
const properties_1 = __importDefault(require("../models/properties"));
function getPropertyManager(filters, location) {
    return __awaiter(this, void 0, void 0, function* () {
        const allProperties = yield getAllProperties();
        if (filters && location) {
            const filtered = yield searchByFilter(filters);
            const searched = yield searchByLocation(location, filtered);
            return searched;
        }
        else if (filters) {
            const filtered = yield searchByFilter(filters);
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
exports.getPropertyManager = getPropertyManager;
function getAllProperties() {
    return __awaiter(this, void 0, void 0, function* () {
        const allProperties = yield properties_1.default.find();
        if (allProperties.length) {
            return allProperties;
        }
        throw new Error("No se encontraron propiedades.");
    });
}
function searchByFilter(filtered) {
    return __awaiter(this, void 0, void 0, function* () {
        const property = yield properties_1.default.find(filtered);
        return property;
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
function createProperty(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const property = yield properties_1.default.create(data);
        const savedProperty = yield property.save();
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
