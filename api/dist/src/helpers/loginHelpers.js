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
exports.dataBaseCheck = void 0;
const users_1 = __importDefault(require("./../models/users"));
function dataBaseCheck(email, password, name, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (email && password) {
            let user = yield users_1.default.findOne({ email, password });
            if (user !== null)
                return user;
            throw new Error("Los datos ingresados son incorrectos.");
        }
        else if (email) {
            let user = yield users_1.default.findOne({ email });
            if (user)
                return user;
            if (!user && name) {
                const user = yield users_1.default.create({ name, lastName, email });
                const savedUser = yield user.save();
                return savedUser;
            }
            throw new Error("No se encuentra registrado.");
        }
        else {
            throw new Error("Complete los campos requeridos.");
        }
    });
}
exports.dataBaseCheck = dataBaseCheck;
