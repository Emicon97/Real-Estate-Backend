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
router.get("/:id", getCalendarEvents);

router.post("/event", createEvent);
router.post("/:id", TokenValidation, calendarToken);

export default router;
