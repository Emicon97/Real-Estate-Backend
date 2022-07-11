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
exports.RefreshToken = exports.TokenCreation = exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refresh_login_1 = __importDefault(require("./../models/refresh_login"));
const TokenValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authToken = req.headers['auth-token'];
        const owner = req.headers['id'];
        const refreshInstance = yield refresh_login_1.default.findOne({ owner });
        if (refreshInstance === null)
            return res.sendStatus(403);
        const refreshToken = refreshInstance.token;
        if (!authToken)
            return res.sendStatus(401);
        const { payload: refresh } = verifyRefreshJWT(refreshToken);
        if (!refresh) {
            return res.sendStatus(403);
        }
        const { payload } = verifyJWT(authToken);
        if (payload)
            return next();
        const id = req.headers['id'];
        const token = (0, exports.TokenCreation)(id);
        res.cookie('auth-token', token);
        next();
    }
    catch (error) {
        console.log(error);
    }
});
exports.TokenValidation = TokenValidation;
const TokenCreation = (email) => {
    return jsonwebtoken_1.default.sign({ email }, process.env.TOKEN_SECRET || 'tokenPass', {
        expiresIn: 10
    });
};
exports.TokenCreation = TokenCreation;
const RefreshToken = (owner) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign({ owner }, process.env.TOKEN_REFRESH || 'tokenPass', {
        expiresIn: 60 * 60 * 8
    });
    const refresh = yield refresh_login_1.default.create({
        token,
        owner
    });
    yield refresh.save();
    return token;
});
exports.RefreshToken = RefreshToken;
function verifyJWT(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        return { payload: decoded, expired: false };
    }
    catch (error) {
        return { payload: null, expired: error.message.includes("jwt expired") };
    }
}
function verifyRefreshJWT(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_REFRESH);
        return { payload: decoded, expired: false };
    }
    catch (error) {
        console.log(error);
        if (error.message.includes("jwt expired")) {
            refresh_login_1.default.findOneAndDelete({ token });
        }
        return { payload: null, expired: error.message.includes("jwt expired") };
    }
}
