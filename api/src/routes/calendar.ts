import { Router } from "express";
import {
  authorization,
  calendarToken,
  createEvent,
  getCalendarEvents,
} from "../controllers/calendarControllers";
import { TokenValidation } from "../libs/JsonWebToken";

const router = Router();

router.get("/authorization/:id", TokenValidation, authorization);
router.get("/:id", TokenValidation, getCalendarEvents);

router.post("/event", TokenValidation, createEvent);
router.post("/:id", TokenValidation, calendarToken);

export default router;
