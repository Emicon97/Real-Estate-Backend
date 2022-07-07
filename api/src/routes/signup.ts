import { Router } from 'express';
import { googleSignUp } from '../controllers/signUpControllers';
import { tokenManagement } from '../controllers/loginControllers';

const router = Router();

router.post('/', googleSignUp, tokenManagement);

export default router;