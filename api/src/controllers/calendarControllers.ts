import { Request, Response } from "express";
const { google } = require('googleapis');
import dotenv from 'dotenv'
dotenv.config({ override: true });

const oAuth2Client = new google.auth.OAuth2(
   process.env.CLIENT_ID,
   process.env.CLIENT_SECRET,
   'http://localhost:3000'
)

import userModel from '../models/users';
import { User } from './../models/users';

async function calendarToken (req:Request, res:Response) {
   try {
   const { code } = req.body;

   const { tokens } = await oAuth2Client.getToken(code);
   console.log(tokens)
   } catch (error) {
      if (error instanceof Error) {
         res.status(403);
      } else {
         console.log('Unexpected Error', error);
      }
   }
}

async function createEvent (req:Request, res:Response) {
   try {
      const { summary, location, startDateTime, endDateTime } = req.body;

      oAuth2Client.setCredentials({
        refresh_token: '1//0d2IN27EnqD-mCgYIARAAGA0SNwF-L9Ir4I2q0gz3yUATxT40Io6tH3jPiUWBo_zCFlT5-Kv48mdXVJFrwQ_R9FiDr0xX393v8k0'
      });
      
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
      // calendar.freebusy.query(
      //    {
      //      resource: {
      //        timeMin: eventStartTime,
      //        timeMax: eventEndTime,
      //        timeZone: 'America/Denver',
      //        items: [{ id: 'primary' }],
      //      },
      //    },
      //    (err:any, res:any) => {
      //      // Check for errors in our query and log them if they exist.
      //      if (err) return console.error('Free Busy Query Error: ', err)
       
      //      // Create an array of all events on our calendar during that time.
      //      const eventArr = res.data.calendars.primary.busy
       
      //      // Check if event array is empty which means we are not busy
      //      if (eventArr.length === 0)
      //        // If we are not busy create a new calendar event.
      //        return calendar.events.insert(
      //          { calendarId: 'primary', resource: response },
      //          (err:any) => {
      //            // Check for errors and log them if they exist.
      //            if (err) return console.error('Error Creating Calender Event:', err)
      //            // Else log that the event was created.
      //            return console.log('Calendar event successfully created.')
      //          }
      //        )
       
      //      // If event array is not empty log that we are busy.
      //      return console.log(`Sorry I'm busy...`)
      //    }
      //  )
      } catch (error) {
         if (error instanceof Error) {
            res.status(403);
         } else {
            console.log('Unexpected Error', error);
         }
      }
}

async function getCalendar() {
   oAuth2Client.setCredentials({
      refresh_token: '1//0d2IN27EnqD-mCgYIARAAGA0SNwF-L9Ir4I2q0gz3yUATxT40Io6tH3jPiUWBo_zCFlT5-Kv48mdXVJFrwQ_R9FiDr0xX393v8k0'
   });

   const calendarClient = await google.calendar({ version: 'v3', auth: oAuth2Client });
 
   // const { data: calendars, status } = await calendarClient.calendarList.list();
 
   // if (status === 200) {
   //   console.log('calendars trtrtttr', calendars);
   // } else {
   //   console.log('there was an issue...', status);
   // }

   const service = google.calendar({ version: "v3", auth: oAuth2Client });  // Modified
   service.events.list(
   {
      calendarId: 'primary',
      singleEvents: true,
   },
   (err:any, res:any) => {  // Modified
      if (err) {
         console.log(err);
         return;
      }
      const genial = res.data;
      for (let i = 0; i < genial.items.length; i++) {
         if (i  >= (genial.items.length-5)) console.log(genial.items[i].summary)
      }
      console.log(genial.items.length)
   }
   );
 
 }
 
 getCalendar();

export {
   calendarToken,
   createEvent
}