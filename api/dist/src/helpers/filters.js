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
exports.searchByUser = exports.searchByLocation = exports.searchByFilter = void 0;
const properties_1 = __importDefault(require("../models/properties"));
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
exports.searchByFilter = searchByFilter;
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
exports.searchByLocation = searchByLocation;
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
exports.searchByUser = searchByUser;
