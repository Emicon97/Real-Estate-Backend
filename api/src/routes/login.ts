import { Router } from 'express';
import { googleLogIn, standardLogIn, tokenManagement } from '../controllers/loginControllers';

const router = Router();

router.post('/', standardLogIn, googleLogIn, tokenManagement);

export default router;