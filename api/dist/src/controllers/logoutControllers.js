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
exports.logout = void 0;
const refresh_login_1 = __importDefault(require("./../models/refresh_login"));
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { owner } = req.params;
            yield refresh_login_1.default.findOneAndDelete({ owner });
            res.status(200).send('¡Adiós!');
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error);
                res.status(403);
            }
            else {
                console.log("Unexpected Error", error);
            }
        }
    });
}
exports.logout = logout;
