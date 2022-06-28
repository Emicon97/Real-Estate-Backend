import { Router } from 'express';
import { logInGoogle, logInManager } from '../controllers/loginControlles';

const router = Router();

router.post('/', logInManager);

router.post('/google', logInGoogle);

export default router;