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
exports.createProperty = void 0;
const properties_1 = __importDefault(require("../models/properties"));
function createProperty(address, area, type, rooms, status, city, bathrooms, neighbourhood, constructionDate, renovationDate, parkingSlot, rentPrice, sellPrice) {
    return __awaiter(this, void 0, void 0, function* () {
        const property = yield properties_1.default.create({
            address,
            area,
            type,
            rooms,
            status,
            city,
            bathrooms: bathrooms ? bathrooms : 1,
            neighbourhood: neighbourhood ? neighbourhood : undefined,
            constructionDate: constructionDate ? constructionDate : undefined,
            renovationDate: renovationDate ? renovationDate : undefined,
            parkingSlot: parkingSlot ? parkingSlot : undefined,
            rentPrice: rentPrice ? rentPrice : 'No se alquila',
            sellPrice: sellPrice ? sellPrice : 'No está a la venta'
        });
        const savedProperty = yield property.save();
        return savedProperty;
    });
}
exports.createProperty = createProperty;
