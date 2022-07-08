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
Object.defineProperty(exports, "__esModule", { value: true });
exports.banUser = exports.updateData = exports.addFavs = exports.getOwnerById = exports.postUser = exports.getUsers = void 0;
const userHelpers_1 = require("../helpers/userHelpers");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, userHelpers_1.getAllUsers)();
            res.json(data);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.status(404).json(error);
            }
            else {
                console.log('Unexpected Error', error);
            }
        }
    });
}
exports.getUsers = getUsers;
function postUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const property = yield (0, userHelpers_1.createUser)(data);
            res.status(201).json(property);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.status(404).json(error);
            }
            else {
                console.log('Unexpected Error', error);
            }
        }
    });
}
exports.postUser = postUser;
function getOwnerById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, follower } = req.params;
            const properties = req.properties;
            if (properties && !follower) {
                const owner = yield (0, userHelpers_1.getUserProperties)(id);
                req.user = owner;
                return next();
            }
            else if (properties) {
                const followed = yield (0, userHelpers_1.getUserProperties)(follower, true);
                req.user = followed;
                return next();
            }
            else {
                const user = yield (0, userHelpers_1.getUserById)(id);
                res.json(user);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.status(404).json(error);
            }
            else {
                console.log('Unexpected Error', error);
            }
        }
    });
}
exports.getOwnerById = getOwnerById;
function addFavs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { property } = req.body;
            const message = yield (0, userHelpers_1.favs)(id, property);
            res.status(201).json(message);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.status(404).json(error);
            }
            else {
                console.log('Unexpected Error', error);
            }
        }
    });
}
exports.addFavs = addFavs;
function updateData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = req.body;
            const message = yield (0, userHelpers_1.updateUser)(id, data);
            res.status(201).json(message);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.status(404).json(error);
            }
            else {
                console.log('Unexpected Error', error);
            }
        }
    });
}
exports.updateData = updateData;
function banUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body.id;
            const message = yield (0, userHelpers_1.deleteUser)(data);
            res.status(201).json(message);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.status(404).json(error);
            }
            else {
                console.log('Unexpected Error', error);
            }
        }
    });
}
exports.banUser = banUser;
