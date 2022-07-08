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
exports.getCalendarEvents = exports.createEvent = exports.calendarToken = void 0;
const calendarHelpers_1 = require("../helpers/calendarHelpers");
function calendarToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { code } = req.body;
            yield (0, calendarHelpers_1.createRefreshToken)(code, id);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json(error);
            }
            else {
                console.log('Unexpected Error', error);
            }
        }
    });
}
exports.calendarToken = calendarToken;
function createEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = req.body;
            const event = yield (0, calendarHelpers_1.eventCreation)(id, data);
            res.json(event);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json(error);
            }
            else {
                console.log('Unexpected Error', error);
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
                res.status(404).json(error);
            }
            else {
                console.log('Unexpected Error', error);
            }
        }
    });
}
exports.getCalendarEvents = getCalendarEvents;
