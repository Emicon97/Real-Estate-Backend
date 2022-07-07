import refreshModel, { Refresh } from "../models/refresh_token";
const { google } = require('googleapis');
import dotenv from 'dotenv';
dotenv.config({ override: true });

const oAuth2Client = new google.auth.OAuth2(
   process.env.CLIENT_ID,
   process.env.CLIENT_SECRET,
   'mikasa-nueva.vercel.app'
);

async function createRefreshToken (code:string, owner:string) {
   const { tokens } = await oAuth2Client.getToken(code);

   if (tokens.refresh_token) {
      const refresh = await refreshModel.create({
         token: tokens.refresh_token,
         owner
      })
      await refresh.save();
   }
}

async function getRefreshByOwner (id:string):Promise<void> {
   const refresh:Refresh | null = await refreshModel.findOne({ owner: id });
   
   if (refresh !== null) {
      oAuth2Client.setCredentials({ refresh_token: refresh.token });
      return;
   }
   
   throw new Error ('No ha dado autorización para acceder al calendario.');
}

async function eventCreation (id:string, data:any) {
   await getRefreshByOwner(id);
   const { summary, location, description, startDateTime } = data;
    
    const calendar = google.calendar('v3');

    const eventStartTime = new Date()
    eventStartTime.setDate(eventStartTime.getMonth())
    eventStartTime.setDate(eventStartTime.getDay() -2)

    const eventEndTime = new Date()
    eventEndTime.setDate(eventEndTime.getMonth())
    eventEndTime.setDate(eventEndTime.getDay() -1)
   try {
      const cal = await calendar.events.insert({
         auth: oAuth2Client,
         calendarId: 'primary',
         requestBody: {
            summary: 'Venta',
            location,
            description,
            colorId: summary === 'Venta' ? 1 : 2,
            start: {
               dateTime: eventStartTime
            },
            end: {
               dateTime: eventEndTime
            },
            attendees: [ 'derleuchtturm@gmail.com' ]
         }
      });
      console.log(cal)
   } catch (error:any) {
      console.log(error)
   }
}

async function getCalendar (id:string) {
   await getRefreshByOwner(id);

   const service = google.calendar({ version: "v3", auth: oAuth2Client });
   
   var calendar:any[] = [];
   const hola = await service.events.list(
      {
         calendarId: 'primary'
      }
   )
      const events = hola.data.items;
      for (let i = 0; i < events.length; i++) {
      if (events[i].summary === 'Ventas' || events[i].summary === 'Alquiler') {
         calendar.push(events[i]);
      }
   }
   return calendar;
}

export {
   createRefreshToken,
   eventCreation,
   getCalendar
}