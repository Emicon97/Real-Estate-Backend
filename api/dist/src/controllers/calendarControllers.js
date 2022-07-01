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
exports.createEvent = exports.calendarToken = void 0;
const { google } = require('googleapis');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ override: true });
const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 'http://localhost:3000');
function calendarToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { code } = req.body;
            const { tokens } = yield oAuth2Client.getToken(code);
            console.log(tokens);
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
exports.calendarToken = calendarToken;
function createEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { summary, location, startDateTime, endDateTime } = req.body;
            oAuth2Client.setCredentials({
                refresh_token: '1//0d2IN27EnqD-mCgYIARAAGA0SNwF-L9Ir4I2q0gz3yUATxT40Io6tH3jPiUWBo_zCFlT5-Kv48mdXVJFrwQ_R9FiDr0xX393v8k0'
            });
            const calendar = google.calendar('v3');
            const eventStartTime = new Date();
            eventStartTime.setDate(eventStartTime.getMonth() + 3);
            eventStartTime.setDate(eventStartTime.getDay() + 3);
            const eventEndTime = new Date();
            eventEndTime.setDate(eventEndTime.getMonth() + 5);
            eventEndTime.setDate(eventEndTime.getDay() + 3);
            eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);
            const response = yield calendar.events.insert({
                auth: oAuth2Client,
                calendarId: 'primary',
                requestBody: {
                    summary: 'Ventas',
                    description: 'hola',
                    location,
                    colorId: '8',
                    start: {
                        dateTime: eventStartTime
                    },
                    end: {
                        dateTime: eventEndTime
                    }
                }
            });
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
exports.createEvent = createEvent;
function getCalendar() {
    return __awaiter(this, void 0, void 0, function* () {
        oAuth2Client.setCredentials({
            refresh_token: '1//0d2IN27EnqD-mCgYIARAAGA0SNwF-L9Ir4I2q0gz3yUATxT40Io6tH3jPiUWBo_zCFlT5-Kv48mdXVJFrwQ_R9FiDr0xX393v8k0'
        });
        const service = google.calendar({ version: "v3", auth: oAuth2Client }); // Modified
        service.events.list({
            calendarId: 'primary',
            singleEvents: true,
        }, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            const genial = res.data;
            for (let i = 0; i < genial.items.length; i++) {
                if (i >= (genial.items.length - 5))
                    console.log(genial.items[i].summary);
            }
            console.log(genial.items.length);
        });
    });
}
getCalendar();
