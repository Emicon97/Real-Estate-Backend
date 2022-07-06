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
exports.getCalendar = exports.eventCreation = exports.createRefreshToken = void 0;
const refresh_token_1 = __importDefault(require("../models/refresh_token"));
const { google } = require('googleapis');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ override: true });
const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 'http://localhost:3000');
function createRefreshToken(code, owner) {
    return __awaiter(this, void 0, void 0, function* () {
        const { tokens } = yield oAuth2Client.getToken(code);
        if (tokens.refresh_token) {
            const refresh = yield refresh_token_1.default.create({
                token: tokens.refresh_token,
                owner
            });
            yield refresh.save();
        }
    });
}
exports.createRefreshToken = createRefreshToken;
function getRefreshByOwner(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const refresh = yield refresh_token_1.default.findOne({ owner: id });
        if (refresh !== null) {
            oAuth2Client.setCredentials({ refresh_token: refresh.token });
            return;
        }
        throw new Error('No ha dado autorización para acceder al calendario.');
    });
}
function eventCreation(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield getRefreshByOwner(id);
        const { summary, location, description, dateTime } = data;
        const calendar = google.calendar('v3');
        const eventStartTime = new Date();
        eventStartTime.setDate(eventStartTime.getMonth());
        eventStartTime.setDate(eventStartTime.getDay());
        const eventEndTime = new Date();
        eventEndTime.setDate(eventEndTime.getMonth());
        eventEndTime.setDate(eventEndTime.getDay());
        try {
            yield calendar.events.insert({
                auth: oAuth2Client,
                calendarId: 'primary',
                requestBody: {
                    summary,
                    location,
                    description,
                    colorId: summary === 'Venta' ? 1 : 2,
                    start: {
                        dateTime: eventStartTime
                    },
                    end: {
                        dateTime: eventEndTime
                    },
                    attendees: ['derleuchtturm@gmail.com']
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.eventCreation = eventCreation;
function getCalendar(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield getRefreshByOwner(id);
        const service = google.calendar({ version: "v3", auth: oAuth2Client });
        var calendar = [];
        const hola = yield service.events.list({
            calendarId: 'primary'
        });
        const events = hola.data.items;
        for (let i = 0; i < events.length; i++) {
            if (events[i].summary === 'Ventas' || events[i].summary === 'Alquiler') {
                calendar.push(events[i]);
            }
        }
        return calendar;
    });
}
exports.getCalendar = getCalendar;
