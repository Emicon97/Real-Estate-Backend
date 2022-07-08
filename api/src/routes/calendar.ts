import { Router } from "express";
import {
  authorization,
  calendarToken,
  createEvent,
  getCalendarEvents,
} from "../controllers/calendarControllers";
import { TokenValidation } from "../libs/JsonWebToken";

const router = Router();

router.get("/authorization/:id", authorization);
router.get("/:id", TokenValidation, getCalendarEvents);

router.post("/:id", TokenValidation, calendarToken);
router.post("/:id/event", TokenValidation, createEvent);

export default router;
