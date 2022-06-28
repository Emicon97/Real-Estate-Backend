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
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.createUser = void 0;
const users_1 = __importDefault(require("../models/users."));
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
        yield users_1.default.findOneAndUpdate({ _id }, data, { new: true });
        return 'Usuario actualizado con éxito.';
    });
}
exports.updateUser = updateUser;
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield users_1.default.findByIdAndDelete(id);
        return 'Usuario eliminado con éxito.';
    });
}
exports.deleteUser = deleteUser;
