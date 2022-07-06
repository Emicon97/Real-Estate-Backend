import { Router } from 'express';
import { logout } from '../controllers/logoutControllers';

const router = Router();

router.get('/:owner',  logout);

export default router;