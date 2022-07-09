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
exports.getOwnersId = exports.getOwnersTelephone = exports.deleteProperty = exports.updateProperty = exports.getPropertyById = exports.createProperty = exports.getPropertyManager = void 0;
const properties_1 = __importDefault(require("../models/properties"));
const users_1 = __importDefault(require("./../models/users"));
const filters_1 = require("./filters");
function getPropertyManager(filters, location, max) {
    return __awaiter(this, void 0, void 0, function* () {
        const allProperties = yield getAllProperties();
        if (filters && Object.keys(filters).length && location) {
            const filtered = yield (0, filters_1.searchByFilter)(filters, max);
            const searched = yield (0, filters_1.searchByLocation)(location, filtered);
            return searched;
        }
        else if (filters && Object.keys(filters).length) {
            const filtered = yield (0, filters_1.searchByFilter)(filters, max);
            return filtered;
        }
        else if (location) {
            const searched = yield (0, filters_1.searchByLocation)(location, allProperties);
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
function getPropertyById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const propById = yield properties_1.default.findById(id);
        if (propById !== null) {
            return propById;
        }
        throw new Error("Esta propiedad no está disponible.");
    });
}
exports.getPropertyById = getPropertyById;
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
        return "Propiedad actualizada con éxito.";
    });
}
exports.updateProperty = updateProperty;
function deleteProperty(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield properties_1.default.findByIdAndDelete(id);
        return "Propiedad eliminada con éxito.";
    });
}
exports.deleteProperty = deleteProperty;
function getOwnersTelephone(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const owner = yield users_1.default.findOne({ properties: id });
        if (owner)
            return owner.telephone;
        throw new Error("No fue posible encontrar datos sobre el dueño.");
    });
}
exports.getOwnersTelephone = getOwnersTelephone;
function getOwnersId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const owner = yield users_1.default.findOne({ properties: id });
        if (owner)
            return owner.id;
        throw new Error("No fue posible encontrar datos sobre el dueño.");
    });
}
exports.getOwnersId = getOwnersId;
