import { Router } from 'express';
import { googleLogIn, standardLogIn, tokenManagement } from '../controllers/loginControlles';

const router = Router();

router.post('/', standardLogIn, googleLogIn, tokenManagement);

export default router;