import refreshModel, { Refresh } from "../models/refresh_token";
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

   if (tokens.refresh_token) {
      console.log(tokens.refresh_token)
      const refresh = await refreshModel.create({
         token: tokens.refresh_token,
         owner
      })
      const done = await refresh.save();
   }
}

async function getRefreshByOwner (id:string):Promise<void> {
   const refresh:Refresh | null = await refreshModel.findOne({ owner: '62b77256748ecce00e66f578' });
   
   if (refresh !== null) {
      oAuth2Client.setCredentials({ refresh_token: refresh.token });
      return;
   }
   
   throw new Error ('No ha dado autorización para acceder al calendario.');
}

async function eventCreation (id:string, data:any) {
   // await getRefreshByOwner(id);
   // oAuth2Client.setCredentials({ refresh_token: '1//0d4jKteBcsAybCgYIARAAGA0SNwF-L9IrYuIk7ykOcfYJN4Ci7oyWSch9bNqujtYP51wddNQ_fY8ywNxOWYjbUHbED30LFMsZeQA' });

   // const calendar = google.calendar('v3');

   // const eventStartTime = new Date()
   // eventStartTime.setDate(eventStartTime.getMonth() + 3)
   // eventStartTime.setDate(eventStartTime.getDay() + 3)

   // const eventEndTime = new Date()
   // eventEndTime.setDate(eventEndTime.getMonth() + 5)
   // console.log(eventEndTime);
   // eventEndTime.setDate(eventEndTime.getDay() + 3)
   // eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)
   
   // await calendar.events.insert({
   //    auth: oAuth2Client,
   //    calendarId: 'primary',
   //    resource: {
   //       summary: 'Alquiler',
   //       colorId: '8',
   //       start: {
   //          dateTime: '2022-07-11T05:04:04.275Z'
   //       },
   //       end: {
   //          dateTime: '2022-07-11T05:04:04.275Z'
   //       }
   //    }
   // })
   oAuth2Client.setCredentials({
      refresh_token: '1//0d4jKteBcsAybCgYIARAAGA0SNwF-L9IrYuIk7ykOcfYJN4Ci7oyWSch9bNqujtYP51wddNQ_fY8ywNxOWYjbUHbED30LFMsZeQA'
    });
    
    const calendar = google.calendar('v3');

    const eventStartTime = new Date()
    eventStartTime.setDate(eventStartTime.getMonth() + 3)
    eventStartTime.setDate(eventStartTime.getDay() + 3)

    const eventEndTime = new Date()
    eventEndTime.setDate(eventEndTime.getMonth() + 5)
    eventEndTime.setDate(eventEndTime.getDay() + 3)
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)
   try {
      await calendar.events.insert({
         calendarId: 'primary',
         requestBody: {
            summary: 'Ventas',
            location: 'tu casa',
            description: 'hola',
            colorId: '8',
            start: {
               dateTime: eventStartTime
            },
            end: {
               dateTime: eventEndTime
            }
         }
      })
   } catch (error:any) {
      console.log(error)
   }
   // console.log(response)
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
   return calendar.length;
}

export {
   createRefreshToken,
   eventCreation,
   getCalendar
}