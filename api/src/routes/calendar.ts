import { Router } from 'express';
import { calendarToken, createEvent } from '../controllers/calendarControllers';

const router = Router();

router.post('/', calendarToken);
router.post('/event', createEvent);

export default router;