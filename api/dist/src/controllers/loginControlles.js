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
exports.tokenManagement = exports.googleLogIn = exports.standardLogIn = void 0;
const JsonWebToken_1 = require("../libs/JsonWebToken");
const google_auth_library_1 = require("google-auth-library");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ override: true });
const users_1 = __importDefault(require("../models/users"));
const client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID);
function standardLogIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { email, password } = req.body;
            if (!password)
                next();
            let user = yield dataBaseCheck(email, password);
            req.user = user;
            next();
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(403);
            }
            else {
                console.log('Unexpected Error', error);
            }
        }
    });
}
exports.standardLogIn = standardLogIn;
function googleLogIn(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (req.user)
            next();
        try {
            const { tokenId } = req.body;
            const ticket = yield client.verifyIdToken({
                idToken: tokenId,
                audience: process.env.CLIENT_ID
            });
            const email = (_a = ticket.getPayload()) === null || _a === void 0 ? void 0 : _a.email;
            if (email !== undefined) {
                let user = yield dataBaseCheck(email);
                req.user = user;
                next();
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error);
                res.status(403);
            }
            else {
                console.log('Unexpected Error', error);
            }
        }
    });
}
exports.googleLogIn = googleLogIn;
function dataBaseCheck(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (email && password) {
            let user = yield users_1.default.findOne({ email, password });
            if (user !== null)
                return user;
            throw new Error('Los datos ingresados son incorrectos.');
        }
        else if (email) {
            let user = yield users_1.default.findOne({ email });
            if (user !== null)
                return user;
            throw new Error('No se encuentra registrado.');
        }
        else {
            throw new Error('Complete los campos requeridos.');
        }
    });
}
function tokenManagement(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const token = (0, JsonWebToken_1.TokenCreation)(user.name);
            const refresh = (0, JsonWebToken_1.RefreshToken)(user.email);
            const userData = [user, token, refresh];
            res.cookie('refresh-token', refresh);
            res.status(200).cookie('auth-token', token).json(userData);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error);
                res.status(403);
            }
            else {
                console.log('Unexpected Error', error);
            }
        }
    });
}
exports.tokenManagement = tokenManagement;
