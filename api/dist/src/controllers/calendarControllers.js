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
exports.getCalendarEvents = exports.createEvent = exports.calendarToken = exports.authorization = void 0;
const calendarHelpers_1 = require("../helpers/calendarHelpers");
const userHelpers_1 = require("../helpers/userHelpers");
const refresh_token_1 = __importDefault(require("./../models/refresh_token"));
function authorization(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const authorized = yield (0, calendarHelpers_1.checkIfAuthorized)(id);
            res.json(authorized);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json(error);
            }
            else {
                console.log("Unexpected Error", error);
            }
        }
    });
}
exports.authorization = authorization;
function calendarToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { code } = req.body;
            const authorized = yield (0, calendarHelpers_1.createRefreshToken)(code, id);
            res.json(authorized);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json(false);
            }
            else {
                console.log("Unexpected Error", error);
            }
        }
    });
}
exports.calendarToken = calendarToken;
function createEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const event = yield (0, calendarHelpers_1.eventCreation)(data);
            res.json(event);
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error);
                res.status(404).json(error);
            }
            else {
                console.log("Unexpected Error", error);
            }
        }
    });
}
exports.createEvent = createEvent;
function getCalendarEvents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const calendar = yield (0, calendarHelpers_1.getCalendar)(id);
            res.json(calendar);
        }
        catch (error) {
            if (error instanceof Error) {
                const { id } = req.params;
                console.log(error);
                const user = yield (0, userHelpers_1.updateUser)(id, { authorized: false });
                yield refresh_token_1.default.findOneAndDelete({ owner: id });
                res.status(404).json(user);
            }
            else {
                console.log("Unexpected Error", error);
            }
        }
    });
}
exports.getCalendarEvents = getCalendarEvents;
