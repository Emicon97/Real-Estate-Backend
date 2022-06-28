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
exports.logIn = void 0;
const users_1 = __importDefault(require("../models/users"));
function logIn(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (email && password) {
            let user = yield users_1.default.findOne({ email, password });
            if (user !== null)
                return user;
            return false;
        }
        else {
            throw new Error('Complete the required fields.');
        }
    });
}
exports.logIn = logIn;