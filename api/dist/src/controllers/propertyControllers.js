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
exports.getPropById = exports.getAllProperties = exports.createProperty = void 0;
const properties_1 = __importDefault(require("../models/properties"));
function getAllProperties() {
    return __awaiter(this, void 0, void 0, function* () {
        const allProperties = yield properties_1.default.find();
        if (allProperties.length) {
            return allProperties;
        }
        throw new Error("No se encontraron propiedades.");
    });
}
exports.getAllProperties = getAllProperties;
function getPropById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const propById = yield properties_1.default.findById(id);
        if (propById) {
            return propById;
        }
        throw new Error("Esta propiedad no está disponible.");
    });
}
exports.getPropById = getPropById;
function createProperty({ address, area, type, rooms, city, bathrooms, neighbourhood, constructionDate, renovationDate, parkingSlot, rentPrice, sellPrice, pictures }) {
    return __awaiter(this, void 0, void 0, function* () {
        const property = yield properties_1.default.create({
            address,
            area,
            type,
            rooms,
            city,
            bathrooms,
            neighbourhood,
            constructionDate: constructionDate ? constructionDate : undefined,
            renovationDate: renovationDate ? renovationDate : undefined,
            parkingSlot,
            rentPrice: rentPrice ? rentPrice : 'No se alquila',
            sellPrice: sellPrice ? sellPrice : 'No está a la venta',
            pictures: pictures && pictures.length ? pictures : undefined
        });
        const savedProperty = yield property.save();
        return savedProperty;
    });
}
exports.createProperty = createProperty;
