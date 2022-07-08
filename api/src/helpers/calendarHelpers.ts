import refreshModel, { Refresh } from "../models/refresh_token";
const { google } = require("googleapis");
import dotenv from "dotenv";
import { getOwnersEmail } from "./propertyHelpers";
import userModel from "./../models/users";
dotenv.config({ override: true });

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://mikasa-nueva.vercel.app"
);

async function checkIfAuthorized(owner: string) {
  const refresh: Refresh | null = await refreshModel.findOne({ owner });

  if (refresh !== null) return true;
  else return false;
}

async function createRefreshToken(code: string, id: string) {
  try {
    const { tokens } = await oAuth2Client.getToken(code);

    if (tokens.refresh_token) {
      const refresh = await refreshModel.create({
        token: tokens.refresh_token,
        owner: id,
      });
      await refresh.save();
    }
    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
}

async function getRefreshByOwner(id: string): Promise<void> {
  const refresh: Refresh | null = await refreshModel.findOne({ owner: id });

  if (refresh !== null) {
    oAuth2Client.setCredentials({ refresh_token: refresh.token });
    return;
  }

  throw new Error("No ha dado autorización para acceder al calendario.");
}

async function eventCreation(id: string, data: any) {
  await getRefreshByOwner(id);
  const { summary, location, startDateTime, endDateTime } = data;

  const calendar = google.calendar("v3");

  const attendee = await getOwnersEmail(location);

  try {
    const event = await calendar.events.insert({
      auth: oAuth2Client,
      calendarId: "primary",
      requestBody: {
        summary,
        location,
        colorId: summary === "Venta" ? 1 : 2,
        start: {
          dateTime: startDateTime,
        },
        end: {
          dateTime: endDateTime,
        },
        attendees: [attendee],
      },
    });
    return event;
  } catch (error: any) {
    throw new Error(error);
  }
}

async function getCalendar(id: string) {
  await getRefreshByOwner(id);

  const service = google.calendar({ version: "v3", auth: oAuth2Client });

  var calendar: any[] = [];
  const hola = await service.events.list({
    calendarId: "primary",
  });
  const events = hola.data.items;
  for (let i = 0; i < events.length; i++) {
    if (events[i].summary === "Ventas" || events[i].summary === "Alquiler") {
      calendar.push(events[i]);
    }
  }
  return calendar;
}

export { checkIfAuthorized, createRefreshToken, eventCreation, getCalendar };
