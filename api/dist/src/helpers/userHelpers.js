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
exports.deleteUser = exports.cart = exports.favs = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = exports.getUserProperties = void 0;
const users_1 = __importDefault(require("../models/users"));
const subscriptionHelpers_1 = require("./subscriptionHelpers");
function getUserProperties(id, follower) {
    return __awaiter(this, void 0, void 0, function* () {
        var user;
        if (!follower) {
            user = yield users_1.default.findById(id).populate({ path: "properties" });
        }
        else {
            user = yield users_1.default.findById(id).populate({ path: "favourites" });
        }
        if (user !== null) {
            return user;
        }
        throw new Error("No hemos encontrado ninguna propiedad.");
    });
}
exports.getUserProperties = getUserProperties;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield users_1.default
            .findById(id)
            .populate([{ path: "properties" }, { path: "flags" }]);
        if (user !== null) {
            yield (0, subscriptionHelpers_1.rangeManager)(id);
            return user;
        }
        throw new Error("Hubo un error al procesar sus datos.");
    });
}
exports.getUserById = getUserById;
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const allUsers = yield users_1.default.find();
        if (allUsers.length) {
            return allUsers;
        }
        throw new Error("No se encontraron usuarios.");
    });
}
exports.getAllUsers = getAllUsers;
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield users_1.default.create(data);
        const savedUser = yield user.save();
        return savedUser;
    });
}
exports.createUser = createUser;
function updateUser(_id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield users_1.default.findOneAndUpdate({ _id }, data);
        if (user !== null)
            return user;
        throw new Error("No hay datos disponibles.");
    });
}
exports.updateUser = updateUser;
function favs(id, favourites) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield users_1.default.findById(id);
        if (user === null)
            throw new Error("No encontramos sus datos.");
        const properties = user === null || user === void 0 ? void 0 : user.favourites;
        if (properties.includes(favourites)) {
            yield users_1.default.findByIdAndUpdate(id, { $pull: { favourites } });
        }
        else {
            yield users_1.default.findByIdAndUpdate(id, { $push: { favourites } });
        }
        return user;
    });
}
exports.favs = favs;
function cart(id, title) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield users_1.default.findById(id);
        if (user === null)
            throw new Error("No encontramos sus datos.");
        const cart = { title, quantity: 1, unit_price: 10000 };
        const cartItems = user === null || user === void 0 ? void 0 : user.cart;
        for (let property of cartItems) {
            if (property.title === title) {
                const updated = yield users_1.default.findByIdAndUpdate(id, { $pull: { cart } }, { new: true });
                if (updated)
                    return updated;
            }
        }
        const added = yield users_1.default.findByIdAndUpdate(id, { $push: { cart } }, { new: true });
        if (added)
            return added;
        throw new Error('No se pudo conectar con el carrito de compras.');
    });
}
exports.cart = cart;
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield users_1.default
            .findByIdAndUpdate(id, { range: "banned" })
            .populate({ path: "properties" });
        if (user)
            yield (0, subscriptionHelpers_1.propertyStatusManager)(user, "banned");
        const users = yield getAllUsers();
        return users;
    });
}
exports.deleteUser = deleteUser;
