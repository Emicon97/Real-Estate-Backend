import { Request, Response } from "express";
import {
  checkIfAuthorized,
  createRefreshToken,
  eventCreation,
  getCalendar,
} from "../helpers/calendarHelpers";

async function authorization(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const authorized = await checkIfAuthorized(id);
    res.json(authorized);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json(error);
    } else {
      console.log("Unexpected Error", error);
    }
  }
}

async function calendarToken(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { code } = req.body;

    const authorized = await createRefreshToken(code, id);
    res.json(authorized);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json(false);
    } else {
      console.log("Unexpected Error", error);
    }
  }
}

async function createEvent(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;

    const event = await eventCreation(id, data);
    res.json(event);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json(error);
    } else {
      console.log("Unexpected Error", error);
    }
  }
}

async function getCalendarEvents(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const calendar = await getCalendar(id);

    res.json(calendar);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json(error);
    } else {
      console.log("Unexpected Error", error);
    }
  }
}

export { authorization, calendarToken, createEvent, getCalendarEvents };
