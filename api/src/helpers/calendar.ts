import refreshModel from "../models/refresh_token";
const { google } = require('googleapis');
import dotenv from 'dotenv';
dotenv.config({ override: true });

const oAuth2Client = new google.auth.OAuth2(
   process.env.CLIENT_ID,
   process.env.CLIENT_SECRET,
   'http://localhost:3000'
);

async function createRefreshToken (code:string, owner:string) {
   const { tokens } = await oAuth2Client.getToken(code);
      
   if (tokens.refresh_token) await refreshModel.create({
      token: tokens.refresh_token,
      owner
   })
}

async function getRefreshByOwner (id:string) {
   const refresh = await refreshModel.find({ owner: id });
   if (refresh !== null) return refresh;
   
   throw new Error ('No ha dado autorización para acceder al calendario.');
}

async function eventCreation (id:string, data:any) {
   const refresh_token = await getRefreshByOwner(id);

   oAuth2Client.setCredentials({ refresh_token });
   
   const calendar = google.calendar('v3');

   const eventStartTime = new Date()
   eventStartTime.setDate(eventStartTime.getMonth() + 3)
   eventStartTime.setDate(eventStartTime.getDay() + 3)

   const eventEndTime = new Date()
   eventEndTime.setDate(eventEndTime.getMonth() + 5)
   eventEndTime.setDate(eventEndTime.getDay() + 3)
   eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

   const response = await calendar.events.insert({
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
   })
}

async function getCalendar (id:string) {
   const refresh_token = await getRefreshByOwner(id);

   oAuth2Client.setCredentials({ refresh_token });

   const service = google.calendar({ version: "v3", auth: oAuth2Client });

   const calendar:any[] = [];

   service.events.list(
   {
      calendarId: 'primary',
      singleEvents: true,
   },
   (err:any, res:any) => {
      if (err) {
         console.log(err);
         return;
      }
      const genial = res.data;
      for (let i = 0; i < genial.items.length; i++) {
         if (i  >= (genial.items.length-5)) genial.items[i].summary
      }
   });
}

export {
   createRefreshToken,
   getRefreshByOwner,
   eventCreation,
   getCalendar
}