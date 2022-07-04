import { Request, Response } from "express";
import { createRefreshToken, eventCreation, getCalendar } from "../helpers/calendarHelpers";

async function calendarToken (req:Request, res:Response) {
   try {
      const { id } = req.params;
      const { code } = req.body;

      await createRefreshToken(code, id);
      
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
      const { id } = req.params;
      const data = req.body;
      
      await eventCreation(id, data);

   } catch (error) {
      if (error instanceof Error) {
         res.status(403);
      } else {
         console.log('Unexpected Error', error);
      }
   }
}

async function getCalendarEvents (req:Request, res:Response) {
   try {
      const { id } = req.params;

      const calendar = await getCalendar(id);
      
      res.json(calendar);
   } catch (error) {
      if (error instanceof Error) {
         res.status(403);
      } else {
         console.log('Unexpected Error', error);
      }
   }
}

export {
   calendarToken,
   createEvent,
   getCalendarEvents
}