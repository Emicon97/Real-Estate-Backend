import { Router } from 'express';
import { calendarToken, createEvent, getCalendarEvents } from '../controllers/calendarControllers';

const router = Router();

router.get('/:id', getCalendarEvents);

router.post('/:id', calendarToken);
router.post('/event', createEvent);

export default router;